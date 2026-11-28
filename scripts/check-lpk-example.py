"""Check the built landing page. Pass its base URL and optionally a Chrome executable."""
import sys
from pathlib import Path
from tempfile import TemporaryDirectory
from zipfile import ZipFile

import fiona
from playwright.sync_api import sync_playwright, expect

base = sys.argv[1].rstrip("/")
with sync_playwright() as pw, TemporaryDirectory(dir=Path.cwd()) as tmp:
    browser = pw.chromium.launch(executable_path=sys.argv[2] if len(sys.argv) > 2 else None)
    page = browser.new_page()
    page.goto(base + "/lpk-to-shapefile/")
    with page.expect_download() as sample:
        page.get_by_text("Download the two-layer survey example").click()
    pkg = Path(tmp) / "survey.lpk"
    sample.value.save_as(pkg)
    page.evaluate("() => { L.Map.addInitHook(function () { window.surveyMap = this }) }")
    page.locator("#file").set_input_files(pkg)
    rows = page.locator("#layers tr")
    expect(rows).to_have_count(2, timeout=90000)
    expect(page.locator("#status")).to_contain_text("Showing", timeout=30000)
    for layer, values in [("stations", ["Alpha", "Beta"]), ("routes", ["Connector"])]:
        row = rows.filter(has_text=layer)
        for checkbox in rows.get_by_role("checkbox").all():
            checkbox.uncheck()
        row.get_by_role("checkbox").check()
        row.get_by_text("Preview").click()
        expect(page.locator("#status")).to_contain_text("Showing " + layer)
        latlng = [40, 10] if layer == "stations" else [40.05, 10.05]
        point = page.evaluate("(ll) => surveyMap.latLngToContainerPoint(ll)", latlng)
        page.locator("#map").click(position={"x": point["x"], "y": point["y"]})
        popup = page.locator(".leaflet-popup").filter(has_text=values[0])
        for field in ["inspection_label", "inspection_status", values[0]]:
            expect(popup).to_contain_text(field)
        with page.expect_download() as result:
            page.locator("#export").click()
        zip_path = Path(tmp) / result.value.suggested_filename
        result.value.save_as(zip_path)
        with ZipFile(zip_path) as archive:
            parts = archive.namelist()
            assert {".shp", ".shx", ".dbf", ".prj"} <= {Path(p).suffix for p in parts}
            assert [Path(p).stem for p in parts if p.endswith(".shp")] == [layer]
            shp = next(p for p in parts if p.endswith(".shp"))
        with fiona.open("zip://" + str(zip_path) + "!" + shp) as data:
            names = list(data.schema["properties"])
            records = [dict(r.properties) for r in data]
            print(layer, names, records, flush=True)
            assert names == ["inspection", "inspecti_1"]
            assert [r["inspection"] for r in records] == values
            assert all(r["inspecti_1"] == "demo" for r in records)
    browser.close()
