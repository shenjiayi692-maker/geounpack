// Build file geodatabases with true curves (circular arcs), like real Esri road/parcel data, using gdal3.js in Node.
// Usage (from the repo root): node scripts/make-curve-sample.mjs samples/curves  -> samples/curves/roads.gdb, parcels.gdb; zip both folders into samples/curves_gdb.zip.
import fs from 'node:fs';
import path from 'node:path';
import initGdalJs from 'gdal3.js/node.js';

const outDir = process.argv[2];
const work = path.dirname(outDir);
const Gdal = await initGdalJs({ path: 'node_modules/gdal3.js/dist/package', useWorker: false });
const data = {
  roads: ['id,name,WKT', '1,arc road,"COMPOUNDCURVE((0 0,10 0),CIRCULARSTRING(10 0,15 5,20 0))"', '2,curve 2,"CIRCULARSTRING(0 10,5 15,10 10)"'],
  parcels: ['id,name,WKT', '1,round parcel,"CURVEPOLYGON(CIRCULARSTRING(0 0,10 0,10 10,0 10,0 0))"', '2,plain parcel,"POLYGON((20 20,30 20,30 30,20 20))"'],
};
const FS = Gdal.Module.FS;
for (const [name, rows] of Object.entries(data)) {
  const csvPath = path.join(work, `${name}.csv`);
  fs.writeFileSync(csvPath, rows.join('\n'));
  const ds = (await Gdal.open(csvPath)).datasets[0];
  const type = name === 'roads' ? 'MULTICURVE' : 'MULTISURFACE';
  const r = await Gdal.ogr2ogr(ds, ['-f', 'OpenFileGDB', '-a_srs', 'EPSG:26910', '-nln', name === 'roads' ? 'Roads' : 'Parcels', '-nlt', type,
    '-oo', 'GEOM_POSSIBLE_NAMES=WKT', '-oo', 'KEEP_GEOM_COLUMNS=NO'], name);
  const gdbDir = r.local || r.real; // e.g. /output/roads.gdb
  const dst = path.join(outDir, `${name}.gdb`);
  fs.mkdirSync(dst, { recursive: true });
  for (const n of FS.readdir(gdbDir)) if (n !== '.' && n !== '..') fs.writeFileSync(path.join(dst, n), FS.readFile(`${gdbDir}/${n}`));
  const info = await Gdal.ogrinfo((await Gdal.open(gdbDir)).datasets[0], ['-json', '-so']);
  for (const L of info.layers) console.log(name, '->', dst, '| layer', L.name, '| geometry', L.geometryFields?.[0]?.type, '| features', L.featureCount);
}
