// E2E for KML/KMZ/Shapefile inputs (and one Esri package as regression) in headless Chromium.
// Usage: python3 scripts/make-kml-shp-samples.py samples/kmlshp && LOCAL_GDAL=1 npm run build && node scripts/smoke-kml-shp.cjs dist samples/kmlshp samples/_out_kmlshp
const { chromium } = require('playwright');
const http = require('http'); const fs = require('fs'); const path = require('path');
const [dist, samples, outDir] = process.argv.slice(2).map((p) => path.resolve(p));
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.wasm': 'application/wasm', '.svg': 'image/svg+xml' };
const PORT = 8811;
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html';
  const f = path.join(dist, p);
  if (!f.startsWith(dist) || !fs.existsSync(f)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': types[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(res);
}).listen(PORT);
const cases = [
  { page: '/kml-to-shapefile/', files: ['trails.kml'], formats: ['shp', 'kmz', 'gpkg', 'csv'] },
  { page: '/kmz-to-shapefile/', files: ['trails.kmz'], formats: ['shp', 'kml'] },
  { page: '/kmz-to-kml/', files: ['trails.kmz'], formats: ['kml'], original: 'trails.kml' },
  { page: '/shapefile-to-kml/', files: ['shp/roads.shp', 'shp/roads.shx', 'shp/roads.dbf', 'shp/roads.prj', 'shp/roads.cpg'], formats: ['kml', 'kmz', 'geojson'] },
  { page: '/shapefile-to-kmz/', files: ['roads_shp.zip'], formats: ['kmz'] },
  { page: '/shapefile-to-kml/', files: ['noprj/stops.shp', 'noprj/stops.shx', 'noprj/stops.dbf'], formats: ['kml'] },
  { page: '/shapefile-to-kml/', files: ['shp/roads.shp'], expectError: /companion files/ },
  { page: '/', files: [path.join(__dirname, '../public/examples/survey.lpk')], formats: ['shp', 'kmz'] },
];
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch();
  let failures = 0;
  for (const [ci, c] of cases.entries()) {
    const ctx = await browser.newContext({ acceptDownloads: true });
    const page = await ctx.newPage();
    page.on('pageerror', (e) => { console.log('  pageerror', e.message); failures++; });
    await page.goto(`http://localhost:${PORT}${c.page}`);
    await page.setInputFiles('#file', c.files.map((f) => (path.isAbsolute(f) ? f : path.join(samples, f))));
    await page.waitForFunction(() => document.querySelectorAll('#layers input').length > 0 || document.querySelector('#status').className.includes('error'), null, { timeout: 120000 });
    await page.waitForFunction(() => !/busy/.test(document.querySelector('#status').className), null, { timeout: 120000 });
    const status = await page.textContent('#status');
    if (c.expectError) {
      const ok = c.expectError.test(status);
      console.log(`${ci} ${c.files[0]} expected error: ${ok ? 'OK' : 'FAIL'} — ${status.slice(0, 120)}`);
      if (!ok) failures++;
      await ctx.close(); continue;
    }
    const names = await page.$$eval('#layers tr', (trs) => trs.map((tr) => tr.innerText.replace(/\s+/g, ' ').trim()));
    console.log(`${ci} ${c.page} ${c.files[0]}: ${status.slice(0, 160)}\n   layers: ${names.join(' | ')}`);
    if (/error/.test(await page.getAttribute('#status', 'class'))) { failures++; await ctx.close(); continue; }
    if (c.original) {
      const [dl] = await Promise.all([page.waitForEvent('download'), page.click('.status.extra button.link')]);
      const dest = path.join(outDir, `${ci}_original_${dl.suggestedFilename()}`); await dl.saveAs(dest);
      const same = fs.readFileSync(dest).equals(fs.readFileSync(path.join(samples, c.original)));
      console.log(`   original KML: ${path.basename(dest)} identical=${same}`); if (!same) failures++;
      await page.waitForTimeout(1500);
    }
    // tick all layers
    await page.$$eval('#layers input[type=checkbox]', (cs) => cs.forEach((c) => { c.checked = true; }));
    for (const fmt of c.formats) {
      await page.selectOption('#format', fmt);
      const [dl] = await Promise.all([page.waitForEvent('download', { timeout: 120000 }), page.click('#export')]);
      const dest = path.join(outDir, `${ci}_${fmt}_${dl.suggestedFilename()}`);
      await dl.saveAs(dest);
      await page.waitForFunction(() => !/busy/.test(document.querySelector('#status').className));
      const st = await page.textContent('#status');
      const bad = /error/.test(await page.getAttribute('#status', 'class'));
      console.log(`   ${fmt}: ${path.basename(dest)} ${bad ? 'FAIL ' + st : ''}`);
      if (bad) failures++;
      await page.waitForTimeout(1500);
    }
    await ctx.close();
  }
  await browser.close(); server.close();
  console.log('failures:', failures);
})();
