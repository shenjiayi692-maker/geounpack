# GeoUnpack — instructions for Claude Code

Read `docs/HANDOFF.md` first: it has the project background, decisions, status and the task list.
Owner: Jiayi (writes in Chinese — reply in Chinese, plain language, she is not a GIS or web developer).

## What this is
Static website that opens Esri `.lpk/.lpkx/.mpk/.mpkx` and zipped `.gdb` files **in the browser** and exports SHP/GPKG/GeoJSON/KML/CSV. Files are never uploaded.

## Rules (do not break)
- All file processing stays client-side (Web Worker + WebAssembly). No server uploads.
- Every SEO page must be a working tool page generated from `src/pages.json`; no bulk text-only articles.
- No "Esri", "ArcGIS" etc. in domain/brand/logo; keep the non-affiliation footer.
- Keep open-source attribution in `src/prose.json` (licenses page) in sync with dependencies.
- GDAL wasm (28 MB) is loaded from jsDelivr (`gdal3.js@2.8.1`) because Cloudflare Pages caps files at 25 MB. If you bump the version, update the URL in `src/worker.js` and the licenses page.
- `docs/DEV_NOTES.zh.md` is the dev checklist; tick/update it when you change behaviour.

## Commands
- `npm install` · `npm run build` (prod) · `LOCAL_GDAL=1 npm run build` (offline)
- `NOINDEX=1` → preview build (noindex meta + robots Disallow). Used until the real domain is live.
- E2E test: download samples (see `docs/TESTING.md`) into `samples/`, then `LOCAL_GDAL=1 npm run build && node scripts/smoke-browser.cjs`. Must end with `failures: 0`. Verify outputs with GDAL (pyogrio) when changing export logic.

## Git
Work on a branch, push to GitHub; Cloudflare Pages auto-deploys the production branch (currently `mvp-v0.1`).
