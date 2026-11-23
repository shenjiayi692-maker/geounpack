// End-to-end test in headless Chromium: open each sample, export every format, save outputs.
// Usage: LOCAL_GDAL=1 npm run build && node scripts/smoke-browser.cjs [samples-dir] [out-dir]
const { chromium } = require('playwright');
const http = require('http'); const fs = require('fs'); const path = require('path');
const dist = path.resolve(__dirname, '../dist');
const samples = path.resolve(process.argv[2] || path.join(__dirname, '../samples'));
const BASE = process.env.BASE_URL || `http://localhost:${process.env.PORT || 8799}`;
const outDir = path.resolve(process.argv[3] || path.join(__dirname, '../samples/_out'));
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.wasm': 'application/wasm', '.svg': 'image/svg+xml', '.png': 'image/png' };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html';
  const f = path.join(dist, p);
  if (!f.startsWith(dist) || !fs.existsSync(f)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': types[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(res);
}).listen(+(process.env.PORT || 8799));
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const proxy = process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY, bypass: 'localhost,127.0.0.1' } : undefined;
  const browser = await chromium.launch(proxy ? { proxy } : {});
  const files = fs.readdirSync(samples).filter((f) => /\.(lpkx?|mpkx?|zip)$/i.test(f));
  let failures = 0;
  for (const f of files) {
    const ctx = await browser.newContext({ acceptDownloads: true, ignoreHTTPSErrors: true });
    const page = await ctx.newPage();
    page.on('pageerror', (e) => console.log('  pageerror', e.message));
    await page.goto(BASE + '/');
    const t = Date.now();
    await page.setInputFiles('#file', path.join(samples, f));
    await page.waitForFunction(() => document.querySelectorAll('#layers input').length > 0 || document.querySelector('#status').className.includes('error'), null, { timeout: 240000 });
    await page.waitForFunction(() => !/busy/.test(document.querySelector('#status').className), null, { timeout: 240000 });
    const status = await page.textContent('#status');
    const n = await page.$$eval('#layers input', (els) => els.length);
    console.log(`\n## ${f}: ${n} layers in ${Date.now() - t}ms — ${status.slice(0, 90)}`);
    if (!n) { failures++; await ctx.close(); continue; }
    for (const fmt of ['shp', 'gpkg', 'geojson', 'kml', 'kmz', 'csv']) {
      await page.selectOption('#format', fmt);
      const t2 = Date.now();
      try {
        const [dl] = await Promise.all([page.waitForEvent('download', { timeout: 240000 }), page.click('#export')]);
        const dest = path.join(outDir, `${f}__${fmt}__${dl.suggestedFilename()}`);
        await dl.saveAs(dest);
        console.log(`   ${fmt}: ${dl.suggestedFilename()} ${fs.statSync(dest).size} bytes ${Date.now() - t2}ms`);
      } catch (e) { failures++; console.log(`   ${fmt}: FAIL ${(await page.textContent('#status')).slice(0, 120)}`); }
      await page.waitForFunction(() => !document.querySelector('#export').disabled);
    }
    // all layers at once (the path real users take with map packages): every format must give a zip with no failed layer
    if (n > 1) {
      await page.$$eval('#layers input', (els) => els.forEach((e) => { e.checked = true; }));
      for (const fmt of ['shp', 'gpkg', 'geojson', 'kml', 'kmz', 'csv']) {
        // pause like a person would: Chromium silently drops a download started right after another one
        await page.waitForTimeout(1500);
        await page.selectOption('#format', fmt);
        try {
          const [dl] = await Promise.all([page.waitForEvent('download', { timeout: 240000 }), page.click('#export')]);
          await page.waitForFunction(() => !document.querySelector('#export').disabled);
          const st = await page.textContent('#status');
          if (/could not be converted/.test(st)) { failures++; console.log(`   all-layers ${fmt}: PARTIAL ${st.slice(st.indexOf('could not') - 30, st.indexOf('could not') + 160)}`); }
          else console.log(`   all-layers ${fmt}: ${dl.suggestedFilename()}`);
        } catch (e) { failures++; console.log(`   all-layers ${fmt}: FAIL ${(await page.textContent('#status')).slice(0, 160)}`); }
      }
    }
    await ctx.close();
  }
  await browser.close(); server.close();
  console.log(`\nfailures: ${failures}`); process.exit(failures ? 1 : 0);
})();
