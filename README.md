# GeoUnpack

Open and convert Esri **layer packages (.lpk, .lpkx)**, **map packages (.mpk, .mpkx)** and **zipped file geodatabases (.gdb)** to Shapefile, GeoPackage, GeoJSON, KML and CSV — entirely in the browser. Files are never uploaded.

## How it works
- `src/worker.js` runs in a Web Worker: 7-Zip (WebAssembly, `7z-wasm`) unpacks the package, GDAL (WebAssembly, `gdal3.js`) reads the geodatabases and writes the exports.
- `src/app.js` is the UI: file drop, layer list, Leaflet map preview, export and zipping (`fflate`).
- `scripts/build.mjs` renders every SEO landing page from `src/pages.json` (+ `src/prose.json`) into `dist/`, with sitemap, robots.txt and llms.txt.
- GDAL's `.wasm` (~28 MB) exceeds Cloudflare Pages' 25 MB per-file limit, so in production it is loaded from jsDelivr (`gdal3.js@2.8.1`). `LOCAL_GDAL=1` bundles it locally for offline testing.

## Commands
```bash
npm install
npm run build                    # production build (GDAL from jsDelivr)
LOCAL_GDAL=1 npm run build       # bundle GDAL locally (testing)
node scripts/smoke-browser.cjs   # end-to-end test in headless Chromium on samples/
```
`samples/` is git-ignored. Public test files can be downloaded from ArcGIS Online (see `docs/TESTING.md`).

## Deploy (Cloudflare Pages)
Build command `npm run build`, output directory `dist`, environment variable `SITE_URL=https://geounpack.com` (or the pages.dev URL before the domain is bought).

## Status
- v0.1 MVP: vector layers and tables from .lpk/.lpkx/.mpk/.mpkx/gdb.zip; exports SHP, GPKG, GeoJSON, KML, CSV; 15 converter pages.
- Payments: not connected yet (`paywall: false`). See `docs/DEV_NOTES.zh.md`.
- Not supported yet: raster, tile and scene packages; files over 150 MB.

Not affiliated with Esri. ArcGIS is a trademark of Esri.
