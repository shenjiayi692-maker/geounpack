/* GeoUnpack conversion worker.
 * Runs entirely in the browser: 7-Zip (WebAssembly) unpacks the Esri package,
 * GDAL (WebAssembly) reads the file geodatabases / shapefiles and writes exports.
 * Nothing is uploaded anywhere.
 */
/* global importScripts, SevenZip, initGdalJs */
// GDAL's WebAssembly file (~28 MB) is larger than Cloudflare Pages' 25 MB per-file limit, so the
// unmodified npm package files are served from our own Cloudflare R2 bucket (cdn.geounpack.com),
// with the jsDelivr CDN as a backup if that fails. '?gdal=local' uses /vendor (offline testing).
const GDAL_SOURCES = new URL(self.location.href).searchParams.get('gdal') === 'local'
  ? ['/vendor']
  : ['https://cdn.geounpack.com/gdal3.js@2.8.1', 'https://cdn.jsdelivr.net/npm/gdal3.js@2.8.1/dist/package'];
importScripts('/vendor/7zz.umd.js');
let GDAL_BASE = '';
for (const base of GDAL_SOURCES) {
  try { importScripts(`${base}/gdal3.js`); GDAL_BASE = base; break; } catch (_) { /* try the next source */ }
}
if (!GDAL_BASE) throw new Error('Failed to load the conversion engine (importScripts)');

let gdal = null;
let sources = []; // [{id, path (in GDAL FS), label, dataset}]
let fileCounter = 0;

const post = (type, payload = {}) => self.postMessage({ type, ...payload });
const progress = (msg) => post('progress', { msg });

async function getGdal() {
  if (!gdal) {
    progress('Loading the conversion engine (about 11 MB, cached after the first time)…');
    gdal = await initGdalJs({ path: GDAL_BASE, useWorker: false });
  }
  return gdal;
}

/* Pick the newest copy when a package contains several versioned folders (v10/v108, p12/p20). */
function versionScore(path) {
  const parts = path.split('/');
  let best = -1;
  for (const p of parts) {
    const m = /^[vp](\d+)$/i.exec(p);
    if (m) best = Math.max(best, parseInt(m[1], 10));
  }
  return best;
}

function walk(FS, dir, acc) {
  for (const name of FS.readdir(dir)) {
    if (name === '.' || name === '..') continue;
    const p = `${dir}/${name}`;
    const st = FS.stat(p);
    if (FS.isDir(st.mode)) {
      if (name.toLowerCase().endsWith('.gdb')) acc.gdbs.push(p);
      else walk(FS, p, acc);
    } else if (name.toLowerCase().endsWith('.shp')) {
      acc.shps.push(p);
    }
  }
  return acc;
}

function dedupe(paths) {
  // key = everything after the version folder (e.g. "usa.gdb"); keep the highest version
  const byKey = new Map();
  for (const p of paths) {
    const key = p.replace(/\/[vp]\d+\//i, '/').split('/').slice(-2).join('/');
    const prev = byKey.get(key);
    if (!prev || versionScore(p) > versionScore(prev)) byKey.set(key, p);
  }
  return [...byKey.values()].sort();
}

function copyTree(srcFS, src, dstFS, dst) {
  dstFS.mkdirTree(dst);
  for (const name of srcFS.readdir(src)) {
    if (name === '.' || name === '..') continue;
    const s = `${src}/${name}`;
    const d = `${dst}/${name}`;
    if (srcFS.isDir(srcFS.stat(s).mode)) copyTree(srcFS, s, dstFS, d);
    else dstFS.writeFile(d, srcFS.readFile(s));
  }
}

async function resetSources(G) {
  // close anything previously opened
  for (const s of sources) { try { G.close(s.dataset); } catch (_) { /* ignore */ } }
  sources = [];
  fileCounter += 1;
}

// Opens one dataset already written to GDAL's file system and lists its layers.
function makeRegister(G, result) {
  let i = 0;
  const fn = async (gdalPath, label) => {
    const opened = await G.open(gdalPath);
    const ds = opened.datasets[0];
    if (!ds) throw new Error(`${label} could not be read. It may be damaged or incomplete.`);
    const info = await G.ogrinfo(ds, ['-json', '-so']);
    const id = `s${sources.length}`;
    sources.push({ id, path: gdalPath, label, dataset: ds, wgs84: /\.geojson$/i.test(gdalPath) });
    for (const L of info.layers || []) {
      const gf = (L.geometryFields || [])[0];
      const crsId = gf?.coordinateSystem?.projjson?.id;
      result.push({
        source: id,
        sourceLabel: label,
        name: L.name,
        featureCount: L.featureCount ?? null,
        geometryType: gf ? gf.type : null,
        crs: crsId ? `${crsId.authority}:${crsId.code}` : (gf?.coordinateSystem?.projjson?.name || (gf ? null : null)),
        fields: (L.fields || []).map((f) => ({ name: f.name, type: f.type })),
      });
    }
  };
  fn.next = () => i++;
  return fn;
}

// Copy every part of each shapefile (.shp .shx .dbf .prj .cpg …) next to each other and open it.
async function registerShapefiles(G, srcFS, shps, base, register) {
  for (const s of shps) {
    const dir = s.slice(0, s.lastIndexOf('/'));
    const stem = s.split('/').pop().replace(/\.shp$/i, '');
    const dstDir = `${base}/${register.next()}`;
    G.Module.FS.mkdirTree(dstDir);
    const parts = srcFS.readdir(dir).filter((n) => n.toLowerCase().startsWith(stem.toLowerCase() + '.'));
    const has = (ext) => parts.some((n) => n.toLowerCase() === `${stem.toLowerCase()}.${ext}`);
    if (!has('dbf') || !has('shx')) {
      throw new Error(`${stem}.shp needs its companion files. Select the .shp together with the .shx and .dbf (and .prj) files that have the same name, or put them all in one .zip.`);
    }
    for (const n of parts) G.Module.FS.writeFile(`${dstDir}/${n}`, srcFS.readFile(`${dir}/${n}`));
    await register(`${dstDir}/${stem}.shp`, `${stem}.shp`);
  }
}

async function openFile(file) {
  const G = await getGdal();
  await resetSources(G);

  progress(`Unpacking ${file.name}…`);
  const sz = await SevenZip({ locateFile: (f) => `/vendor/${f}`, print: () => {}, printErr: () => {} });
  const buf = new Uint8Array(await file.arrayBuffer());
  sz.FS.writeFile('/in.pkg', buf);
  let rc = 0;
  try { rc = sz.callMain(['x', '/in.pkg', '-o/out', '-y']); } catch (e) { rc = e?.status ?? 2; }
  if (rc && rc !== 0 && !sz.FS.analyzePath('/out').exists) {
    throw new Error("This file couldn't be unpacked. It may be damaged, incomplete, or not an Esri package. Try downloading it again.");
  }
  if (!sz.FS.analyzePath('/out').exists) sz.FS.mkdir('/out');

  const found = walk(sz.FS, '/out', { gdbs: [], shps: [] });
  const gdbs = dedupe(found.gdbs);
  const shps = dedupe(found.shps);
  if (!gdbs.length && !shps.length) {
    throw new Error('No geodatabase or shapefile was found inside this file. If it is a raster or tile package, it is not supported yet.');
  }

  progress('Reading layers…');
  const result = [];
  const base = `/input/f${fileCounter}`;
  const register = makeRegister(G, result);
  for (const g of gdbs) {
    const name = g.split('/').pop();
    const dst = `${base}/${register.next()}/${name}`;
    copyTree(sz.FS, g, G.Module.FS, dst);
    await register(dst, name);
  }
  await registerShapefiles(G, sz.FS, shps, base, register);
  return result;
}

// Several loose files picked together, e.g. roads.shp + roads.shx + roads.dbf + roads.prj.
async function openFiles(files) {
  const G = await getGdal();
  await resetSources(G);
  progress('Reading the files…');
  const dir = `/loose/f${fileCounter}`;
  G.Module.FS.mkdirTree(dir);
  for (const f of files) G.Module.FS.writeFile(`${dir}/${f.name.replace(/[\\/]/g, '_')}`, new Uint8Array(await f.arrayBuffer()));
  const shps = G.Module.FS.readdir(dir).filter((n) => /\.shp$/i.test(n)).map((n) => `${dir}/${n}`);
  if (!shps.length) throw new Error('No .shp file was selected. Select the .shp file together with its .shx, .dbf and .prj files, or a .zip of them.');
  const result = [];
  const register = makeRegister(G, result);
  await registerShapefiles(G, G.Module.FS, shps, `/input/f${fileCounter}`, register);
  return result;
}

// KML/KMZ are converted to GeoJSON on the page (the KML reader in this GDAL build ignores
// ExtendedData attributes); each group of features becomes one layer.
async function openGeojsonLayers(layers) {
  const G = await getGdal();
  await resetSources(G);
  progress('Reading layers…');
  const result = [];
  const register = makeRegister(G, result);
  const base = `/input/f${fileCounter}`;
  for (const l of layers) {
    const dir = `${base}/${register.next()}`;
    G.Module.FS.mkdirTree(dir);
    const fname = `${safeName(l.name)}.geojson`;
    G.Module.FS.writeFile(`${dir}/${fname}`, new TextEncoder().encode(l.text));
    const before = result.length;
    await register(`${dir}/${fname}`, l.label || l.name);
    // GDAL names a GeoJSON layer after the file; show the readable name instead
    for (let k = before; k < result.length; k++) { result[k].displayName = l.name; result[k].crs = 'EPSG:4326'; }
  }
  return result;
}

const FORMATS = {
  geojson: { driver: 'GeoJSON', ext: 'geojson', args: ['-t_srs', 'EPSG:4326', '-lco', 'COORDINATE_PRECISION=6', '-nlt', 'PROMOTE_TO_MULTI'] },
  gpkg: { driver: 'GPKG', ext: 'gpkg', args: [] },
  shp: { driver: 'ESRI Shapefile', ext: 'shp', args: ['-dim', 'XY', '-nlt', 'PROMOTE_TO_MULTI', '-lco', 'ENCODING=UTF-8'] },
  kml: { driver: 'KML', ext: 'kml', args: ['-t_srs', 'EPSG:4326'] },
  csv: { driver: 'CSV', ext: 'csv', args: ['-lco', 'GEOMETRY=AS_WKT'] },
};

function safeName(s) { return String(s).replace(/[^\w.-]+/g, '_'); }

async function exportLayer({ source, layer, format, limit, hasGeometry, noCrs, where, outLayer }) {
  const G = await getGdal();
  const src = sources.find((s) => s.id === source);
  if (!src) throw new Error('Source not found. Please open the file again.');
  const fmt = FORMATS[format];
  if (!fmt) throw new Error(`Unknown format ${format}`);
  let args = ['-f', fmt.driver, ...fmt.args];
  // without a coordinate system GDAL cannot reproject: keep the coordinates as they are
  if (noCrs) args = args.filter((a, i, all) => a !== '-t_srs' && all[i - 1] !== '-t_srs');
  if (!hasGeometry && format === 'csv') args = ['-f', 'CSV'];
  if (limit) args.push('-limit', String(limit));
  if (where) args.push('-where', where);
  // KML-derived layers: label the output plainly as WGS 84 (otherwise a 3D variant ends up in the .prj)
  if (src.wgs84 && format !== 'kml' && format !== 'geojson') args.push('-a_srs', 'EPSG:4326');
  if (outLayer) args.push('-nln', outLayer);
  args.push('--config', 'OGR_ORGANIZE_POLYGONS', 'SKIP', layer);
  const outName = safeName(outLayer || layer);
  progress(`Converting ${layer} to ${format.toUpperCase()}…`);
  const out = await G.ogr2ogr(src.dataset, args, outName);
  const files = [];
  for (const f of out.all || [out]) {
    const bytes = G.Module.FS.readFile(f.real || f.local);
    files.push({ name: (f.local || f.real).split('/').pop(), bytes });
  }
  // clean up GDAL output to free memory
  try {
    for (const f of out.all || [out]) G.Module.FS.unlink(f.real || f.local);
    if (out.all && out.all.length > 1) G.Module.FS.rmdir(out.real || out.local);
  } catch (_) { /* ignore */ }
  return { files, ext: fmt.ext, layer: outName };
}

async function preview({ source, layer, maxFeatures, noCrs }) {
  const r = await exportLayer({ source, layer, format: 'geojson', limit: maxFeatures, hasGeometry: true, noCrs });
  const text = new TextDecoder().decode(r.files[0].bytes);
  return JSON.parse(text);
}

self.onmessage = async (e) => {
  const { id, type, payload } = e.data;
  try {
    let result;
    if (type === 'open') result = await openFile(payload.file);
    else if (type === 'openFiles') result = await openFiles(payload.files);
    else if (type === 'openGeojson') result = await openGeojsonLayers(payload.layers);
    else if (type === 'preview') result = await preview(payload);
    else if (type === 'export') result = await exportLayer(payload);
    else throw new Error(`Unknown message ${type}`);
    const transfer = result?.files ? result.files.map((f) => f.bytes.buffer) : [];
    self.postMessage({ id, type: 'result', result }, transfer);
  } catch (err) {
    let msg = err?.message || (typeof err === 'string' ? err : '');
    if (!msg || msg === '[object Object]') msg = "Something went wrong while reading this file. It may be damaged or in a format GeoUnpack doesn't support yet.";
    const oom = /memory|Aborted\(|out of bounds/i.test(msg);
    self.postMessage({
      id,
      type: 'error',
      error: oom
        ? 'Your browser ran out of memory for this file. Try exporting one layer at a time, or a smaller file.'
        : msg,
    });
  }
};
