"""Build the original CC0 GeoUnpack data-extraction example. Requires Fiona with OpenFileGDB."""
from pathlib import Path
from tempfile import TemporaryDirectory
from zipfile import ZipFile, ZIP_DEFLATED

import fiona

target = Path(__file__).resolve().parents[1] / "public/examples/survey.lpk"
with TemporaryDirectory(dir=target.parent) as tmp:
    gdb = Path(tmp) / "survey.gdb"
    for layer, kind, shapes, names in [
        ("stations", "Point", [(10, 40), (10.1, 40.1)], ["Alpha", "Beta"]),
        ("routes", "LineString", [[(10, 40), (10.1, 40.1)]], ["Connector"]),
    ]:
        fields = {"inspection_label": "str", "inspection_status": "str"}
        with fiona.open(gdb, "w", driver="OpenFileGDB", layer=layer,
                        schema={"geometry": kind, "properties": fields}, crs="EPSG:4326") as dst:
            for shape, name in zip(shapes, names):
                dst.write({"geometry": {"type": kind, "coordinates": shape},
                           "properties": {"inspection_label": name, "inspection_status": "demo"}})
    with ZipFile(target, "w", ZIP_DEFLATED) as archive:
        for file in sorted(gdb.iterdir()):
            archive.write(file, "v10/survey.gdb/" + file.name)
        archive.writestr("README.txt", "Original fictional survey data dedicated to the public domain under CC0 1.0 Universal (https://creativecommons.org/publicdomain/zero/1.0/). Synthetic extraction fixture for GeoUnpack. Contains no ArcMap layer document.")
