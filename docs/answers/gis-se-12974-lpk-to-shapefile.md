# 回答草稿：GIS Stack Exchange #12974
**问题**：[Free tool to convert ArcGIS layer package (*.lpk) to shapefile (*.shp)?](https://gis.stackexchange.com/questions/12974/free-tool-to-convert-arcgis-layer-package-lpk-to-shapefile-shp)
- 状态（2026-11-03）：开放，6.4 万次浏览，6 个回答，没有被采纳的答案。
- 已有回答的内容：改成 .zip 后解压（35 赞，2011 年）；用 7-Zip 解压；ArcMap 的方法。
- **我们补充的新信息**：① 用 7-Zip，而不是改成 .zip（新版的包是 7z 格式，改后缀解不开）；② 包里有多个版本文件夹，该选哪个；③ ArcGIS Pro 的 .lpkx/.mpkx 也一样；④ 用 QGIS 打开的具体步骤；⑤ 推荐导出 GeoPackage，避开 Shapefile 的限制；⑥ 一条现成的 ogr2ogr 命令。
- 已在本环境验证：8 个真实的 .lpk/.mpk/.mpkx 文件都是 7z 格式；`v10`/`v108`（ArcMap 包）、`p12`/`p20`（Pro 包）文件夹里都是 .gdb；GDAL（OpenFileGDB 驱动）可以直接读取并转换。

## 使用说明
- **现在（养号阶段）发版本 A**，不提工具。
- **正式域名上线后**，如果想补充工具，在回答末尾**编辑加入版本 B 那一段**（必须保留“我是作者”的声明）。
- 发之前请用你自己的话改一改语气，别整段照搬。Stack Exchange 不禁止 AI 辅助，但要求内容是你理解并核实过的；GIS Stack Exchange 对纯 AI 生成的内容可能有更严格的规定，发帖前请先看一下该站的帮助中心（Help Center）。

---

## 版本 A（现在发，纯技术回答）

An update for current versions, since the older answers here predate ArcGIS Pro:

**1. Extract it with 7-Zip (don't just rename it to .zip).**
Layer packages (`.lpk`, `.lpkx`) and map packages (`.mpk`, `.mpkx`) are 7-Zip archives — every package I checked from ArcGIS Online (ArcMap and Pro) was 7z, so renaming to `.zip` and using the built-in Windows/macOS extractor usually fails. With [7-Zip](https://www.7-zip.org/) (Windows) or `7z x layer.lpk` (Mac/Linux via p7zip/7-Zip), extract the whole package.

**2. Find the newest version folder.**
Inside you'll usually see the same data stored more than once for different ArcGIS versions, for example:

```
layer.lpk
├── v10/      ← ArcMap 10.0 copy
├── v108/     ← ArcMap 10.8 copy (use the highest number)
└── esriinfo/ (thumbnail, metadata)
```

ArcGIS Pro packages (`.lpkx`/`.mpkx`) use `p12/`, `p20/`, etc. instead. Pick the highest-numbered folder; it contains a file geodatabase (`something.gdb` folder) and the `.lyr`/`.lyrx` styling file.

**3. Open the .gdb in QGIS.**
QGIS 3.x reads file geodatabases out of the box (GDAL's OpenFileGDB driver), no extra plugin needed:
- *Layer › Add Layer › Add Vector Layer…*, set **Source type = Directory**, choose **OpenFileGDB**, and select the `.gdb` **folder** (not a file inside it); or
- simply drag the `.gdb` folder from your file browser into the QGIS window.

Then right-click the layer › *Export › Save Features As…* to write a Shapefile.

**4. Or convert in one command with GDAL:**

```
ogr2ogr -f GPKG output.gpkg v108/yourdata.gdb
```

(use `-f "ESRI Shapefile" output_folder` if you really need shapefiles).

Two caveats:
- **Symbology isn't converted** — the `.lyr`/`.lyrx` styling only works in ArcGIS; you get geometry and attributes.
- **Consider GeoPackage instead of Shapefile.** Shapefiles truncate field names to 10 characters and can't hold very large integers or long text, so values from a geodatabase can be silently altered. GeoPackage keeps them intact and opens in QGIS, ArcGIS and most other tools.

---

## 版本 B（正式域名上线后，加在版本 A 的末尾）

**If you can't install anything:** I built a free browser tool, [GeoUnpack](https://geounpack.com/lpk-to-shapefile/), that does steps 1–4 for you — drop the `.lpk`/`.lpkx`/`.mpk`/`.mpkx` in, preview the layers, and export to Shapefile, GeoPackage, GeoJSON, KML or CSV. It runs GDAL compiled to WebAssembly in your browser, so the file isn't uploaded. (Disclosure: I'm the author. Vector data only for now; raster packages aren't supported.)

---

## 中文对照（帮助你理解答案内容）
1. **用 7-Zip 解压，不要只改成 .zip。** 这些包是 7-Zip 格式，改成 .zip 只对部分老包有效。
2. **找版本号最大的文件夹。** 包里常有同一份数据的多个版本（ArcMap 是 v10、v108；ArcGIS Pro 是 p12、p20），选数字最大的那个，里面就是 .gdb 文件夹。
3. **在 QGIS 里打开 .gdb。** QGIS 3 自带读取能力：“添加矢量图层”→ 源类型选“目录”→ 选 OpenFileGDB → 选择 .gdb **文件夹**；或者直接把文件夹拖进 QGIS。然后右键图层 → 导出 → 另存为 Shapefile。
4. **或者用 GDAL 一条命令转换。**
5. 两点提醒：样式（颜色、符号）不会被转换；推荐导出 GeoPackage，因为 Shapefile 会截断字段名和大数字。

版本 B 的意思：“如果你没法安装软件，我做了一个免费的浏览器工具……文件不会上传。（声明：我是作者。目前只支持矢量数据。）”
