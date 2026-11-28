"""Make the KML/KMZ/Shapefile test samples used by scripts/smoke-kml-shp.cjs.
Usage: python3 scripts/make-kml-shp-samples.py samples/kmlshp   (needs geopandas + pyogrio)"""
import os, sys, shutil, zipfile
import geopandas as gpd
from shapely.geometry import LineString, Point

out = sys.argv[1] if len(sys.argv) > 1 else 'samples/kmlshp'
os.makedirs(out, exist_ok=True)
here = os.path.dirname(os.path.abspath(__file__))
shutil.copy(os.path.join(here, 'fixtures', 'trails.kml'), os.path.join(out, 'trails.kml'))
with zipfile.ZipFile(os.path.join(out, 'trails.kmz'), 'w', zipfile.ZIP_DEFLATED) as z:  # KMZ = doc.kml + images
    z.write(os.path.join(out, 'trails.kml'), 'doc.kml')
    z.writestr('files/icon.png', b'\x89PNG\r\n\x1a\n' + b'\x00' * 20)
os.makedirs(os.path.join(out, 'shp'), exist_ok=True)  # projected (UTM 18N) shapefile with non-ASCII text
gpd.GeoDataFrame({'name': ['Rue Saint-Denis', 'Boul. René-Lévesque'], 'lanes': [2, 4]},
                 geometry=[LineString([(611000, 5040000), (611500, 5040800)]), LineString([(610000, 5039000), (612000, 5039200)])],
                 crs='EPSG:32618').to_file(os.path.join(out, 'shp', 'roads.shp'), engine='pyogrio', encoding='UTF-8')
with zipfile.ZipFile(os.path.join(out, 'roads_shp.zip'), 'w') as z:
    for f in os.listdir(os.path.join(out, 'shp')):
        z.write(os.path.join(out, 'shp', f), f)
os.makedirs(os.path.join(out, 'noprj'), exist_ok=True)  # lon/lat shapefile without a .prj
gpd.GeoDataFrame({'id': [1, 2, 3]}, geometry=[Point(-73.5, 45.5), Point(-73.6, 45.51), Point(-73.55, 45.49)]).to_file(
    os.path.join(out, 'noprj', 'stops.shp'), engine='pyogrio')
prj = os.path.join(out, 'noprj', 'stops.prj')
if os.path.exists(prj):
    os.remove(prj)
print('samples in', out)
