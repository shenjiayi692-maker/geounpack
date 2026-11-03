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
