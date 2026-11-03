/* GeoUnpack conversion worker.
 * Runs entirely in the browser: 7-Zip (WebAssembly) unpacks the Esri package,
 * GDAL (WebAssembly) reads the file geodatabases / shapefiles and writes exports.
 * Nothing is uploaded anywhere.
 */
/* global importScripts, SevenZip, initGdalJs */
// GDAL's WebAssembly file (~28 MB) is larger than Cloudflare Pages' 25 MB per-file limit,
// so it is loaded from the jsDelivr CDN (same unmodified npm package). '?gdal=local' uses /vendor.
const GDAL_BASE = new URL(self.location.href).searchParams.get('gdal') === 'local'
  ? '/vendor'
  : 'https://cdn.jsdelivr.net/npm/gdal3.js@2.8.1/dist/package';
importScripts('/vendor/7zz.umd.js', `${GDAL_BASE}/gdal3.js`);

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

async function openFile(file) {
  const G = await getGdal();
  // close anything previously opened
  for (const s of sources) { try { G.close(s.dataset); } catch (_) { /* ignore */ } }
  sources = [];
  fileCounter += 1;

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
  let i = 0;
  const register = async (srcPath, gdalPath, label) => {
    const opened = await G.open(gdalPath);
    const ds = opened.datasets[0];
    const info = await G.ogrinfo(ds, ['-json', '-so']);
    const id = `s${i++}`;
    sources.push({ id, path: gdalPath, label, dataset: ds });
    for (const L of info.layers || []) {
      const gf = (L.geometryFields || [])[0];
      const crsId = gf?.coordinateSystem?.projjson?.id;
      result.push({
        source: id,
        sourceLabel: label,
        name: L.name,
        featureCount: L.featureCount ?? null,
        geometryType: gf ? gf.type : null,
        crs: crsId ? `${crsId.authority}:${crsId.code}` : (gf?.coordinateSystem?.projjson?.name || (gf ? 'unknown' : null)),
        fields: (L.fields || []).map((f) => ({ name: f.name, type: f.type })),
      });
    }
  };

  for (const g of gdbs) {
    const name = g.split('/').pop();
    const dst = `${base}/${i}/${name}`;
    copyTree(sz.FS, g, G.Module.FS, dst);
    await register(g, dst, name);
  }
  for (const s of shps) {
    const dir = s.slice(0, s.lastIndexOf('/'));
    const stem = s.split('/').pop().replace(/\.shp$/i, '');
    const dstDir = `${base}/${i}`;
    G.Module.FS.mkdirTree(dstDir);
    for (const n of sz.FS.readdir(dir)) {
      if (n.toLowerCase().startsWith(stem.toLowerCase() + '.')) {
        G.Module.FS.writeFile(`${dstDir}/${n}`, sz.FS.readFile(`${dir}/${n}`));
      }
    }
    await register(s, `${dstDir}/${stem}.shp`, `${stem}.shp`);
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

async function exportLayer({ source, layer, format, limit, hasGeometry }) {
  const G = await getGdal();
  const src = sources.find((s) => s.id === source);
  if (!src) throw new Error('Source not found. Please open the file again.');
  const fmt = FORMATS[format];
  if (!fmt) throw new Error(`Unknown format ${format}`);
  let args = ['-f', fmt.driver, ...fmt.args];
  if (!hasGeometry && format === 'csv') args = ['-f', 'CSV'];
  if (limit) args.push('-limit', String(limit));
  args.push('--config', 'OGR_ORGANIZE_POLYGONS', 'SKIP', layer);
  const outName = safeName(layer);
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

async function preview({ source, layer, maxFeatures }) {
  const r = await exportLayer({ source, layer, format: 'geojson', limit: maxFeatures, hasGeometry: true });
  const text = new TextDecoder().decode(r.files[0].bytes);
  return JSON.parse(text);
}

self.onmessage = async (e) => {
  const { id, type, payload } = e.data;
  try {
    let result;
    if (type === 'open') result = await openFile(payload.file);
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
