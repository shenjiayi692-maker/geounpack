# Testing

## Sample files (public, ArcGIS Online)
Download with `https://www.arcgis.com/sharing/rest/content/items/<ID>/data`:

| ID | File |
|---|---|
| 1a6cae723af14f9cae228b133aebc620 | USA_States.lpk (25 MB) |
| a00d6b6149b34ed3b833e10fb72ef47b | USA_Counties.lpk (98 MB) |
| f652b9e15ef9409ea5ef30a260a56bf8 | USCitiesStates.mpk |
| 74c0e896a0ce42ddb65b37fbab5c93be | Kelburn.mpk (NZTM, EPSG:2193) |
| d1e748c1315449ce802b4bdc041c7936 | HydrantInspectionData.mpk (EPSG:3443, related tables) |
| 92ca5cdb3ff1461384bf80dc008e297b | PointsofInterest.mpkx (Z values, attachments) |
| 85c34847bbe1402fa115a1b9b87561ce | RelationshipID.mpkx |
| 50b4195ee6b04a8bb2b3a78899ccd710 | Regression_Model_Map.mpkx (75 MB, 141k points) |

## Last result (2026-11-03, headless Chromium)
8/8 files opened; 40/40 exports (SHP, GPKG, GeoJSON, KML, CSV) succeeded. Feature counts and WGS84 bounds verified against GDAL 3.12 (pyogrio).
Timing: small files < 1 s to open; USA_Counties.lpk (98 MB) ~49 s to open and preview, 4–39 s per export.

## QA round 2026-11-03 (live site https://geounpack.pages.dev)
- 8/8 sample files, 40/40 exports on the live site, including USA_Counties.lpk (98 MB, ~53 s to open) and Regression_Model_Map.mpkx (75 MB).
- Edge cases: renamed text file (.lpk) → fixed: was showing "[object Object]", now a readable error; zip without GIS data → clear message; zipped .gdb → works (5 layers); 168 MB file → blocked with size message.
- All 18 pages return 200; no horizontal scroll on a 390 px phone screen.
- Run against a live URL: `BASE_URL=https://geounpack.pages.dev node scripts/smoke-browser.cjs`; use `PORT=xxxx` if 8799 is busy.

## Samples added 2026-11-23 (all-layers export check)
The smoke test now also ticks **all layers** and exports every format (users of map packages do this), and fails on any partial export.
| Source | File |
|---|---|
| ArcGIS Online d1e748c1315449ce802b4bdc041c7936 | HydrantInspectionData.mpk (points + related tables) |
| ArcGIS Online 85c34847bbe1402fa115a1b9b87561ce | RelationshipID.mpkx (two layers named "States" in different geodatabases) |
| generated: `node scripts/make-curve-sample.mjs samples/curves`, then zip `roads.gdb` + `parcels.gdb` as `samples/curves_gdb.zip` | true curves (circular arcs), like real road/parcel data |

Result 2026-11-23: 6 samples, single-layer and all-layer exports in 6 formats, failures: 0.
Note: Chromium silently drops a download started immediately after another one, so the test pauses 1.5 s between all-layer exports.

## Two-layer survey example

The LPK-to-Shapefile page links to `public/examples/survey.lpk`. It contains an original CC0 survey geodatabase in a synthetic ZIP container. This exercises embedded vector extraction. ArcMap layer documents and symbology are outside the scope of the fixture.

Install Python packages Fiona (with OpenFileGDB) and Playwright to regenerate or check it. From the repository root run `python scripts/make-lpk-example.py` to regenerate it. Serve a local build with `LOCAL_GDAL=1 npm run serve`, then run `python scripts/check-lpk-example.py http://localhost:8080` in a second terminal. Pass a Chrome executable path as the final argument if Playwright Chromium is unavailable.

The check downloads the example from the page, selects each layer individually, opens its map popup and reads the resulting Shapefile ZIP. The stations layer has Alpha and Beta. The routes layer has Connector. The popup shows inspection_label and inspection_status. The DBF stores inspection and inspecti_1, with demo in the latter field on all three records.
