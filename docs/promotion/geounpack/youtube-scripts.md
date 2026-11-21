# YouTube 录屏脚本：3 条 45–60 秒视频

## 中文摘要：这是什么、你要做什么
- 三条短视频的完整脚本：镜头表（带时间）、屏幕字幕、英文旁白、标题（≤70 个字符）、简介（带链接）、标签、缩略图文字。
- 视频 2（在 QGIS 里打开）**主要教免费的手动方法**（7-Zip + QGIS），最后才提 GeoUnpack。这样的视频更容易被推荐、也更可信。
- **你要做的事：**
  1. 录屏软件：OBS Studio（免费）或 Mac 自带的 Cmd+Shift+5。分辨率 1920×1080，浏览器缩放 125%，关掉书签栏和其他标签页。
  2. **只用公开的示例数据**（`docs/TESTING.md` 里从 ArcGIS Online 下载的公开样本），不要露出任何客户或私人文件。文件名最好简单，如 `parks.lpk`。
  3. 旁白可以自己读（英文慢一点没关系），也可以只放字幕 + 轻音乐。字幕必须有（很多人静音看）。
  4. 上传时把“简介”整段粘贴进去，链接要能点开。频道“关于”里写一句 “I'm Jiayi, an independent developer in Canada. I build GeoUnpack.”
  5. 每条视频另外导出一个竖屏版（9:16，裁掉两边）发 YouTube Shorts，标题相同。
  6. 发布后，把视频链接加到对应工具页面（可以让 Claude 帮你嵌入页面），也可以在 GIS SE 回答里**不要**放视频链接（那里只放文字步骤）。
- 录之前在 geounpack.com 上实际走一遍，确认按钮名字和下面写的一致（我是按 2026-11-21 的界面写的：“Choose file / or drop it here”、图层列表、“Output format”、“Convert & download”）。

---

## 视频 1：Open an LPK file without ArcGIS

**Title（57 字符）:** `How to Open an LPK File Without ArcGIS (Free, No Install)`

**长度：** 约 50 秒

| 时间 | 画面（镜头） | 屏幕字幕 | 旁白（英文） |
|---|---|---|---|
| 0:00–0:05 | 桌面上一个 `parks.lpk` 文件，双击后弹出“选择打开方式” / 无法打开 | `Got an .lpk file but no ArcGIS?` | "Someone sent you an LPK file, and you don't have ArcGIS. Here's how to open it in about 30 seconds." |
| 0:05–0:12 | 浏览器打开 geounpack.com/open-lpk-without-arcgis/ ，鼠标指向 “Files stay on your device” | `geounpack.com · free · no sign-up` | "Go to geounpack dot com. It runs in your browser, and the file is never uploaded." |
| 0:12–0:20 | 把 `parks.lpk` 拖到 “or drop it here” 区域，状态显示 “Opening parks.lpk…” 然后 “N layers found” | `Drag & drop the .lpk` | "Drag the LPK in. It unpacks the package and lists every layer inside." |
| 0:20–0:30 | 点一个图层，地图显示要素；点一个要素，弹出属性 | `Preview on the map · click for attributes` | "Click a layer to see it on the map, and click a feature to check its attributes." |
| 0:30–0:40 | 勾选图层 → “Output format” 选 “SHP (Shapefile)” → 点 “Convert & download”，浏览器下载 zip | `Export: Shapefile · GeoPackage · KML · CSV` | "To keep the data, pick a format, like Shapefile or GeoPackage, and click Convert and download." |
| 0:40–0:48 | 解压下载的 zip，显示 .shp/.dbf/.prj 文件 | `Works with .lpk .lpkx .mpk .mpkx` | "That's it. It also works with LPKX, MPK and MPKX files. Note: styling isn't kept, only the data." |
| 0:48–0:52 | 结尾卡：网址 + “I built this tool” | `geounpack.com · made by an independent developer` | "I built this tool. Link in the description." |

**Description:**
```
Open an ArcGIS layer package (.lpk / .lpkx) without ArcGIS, for free, in your browser: https://geounpack.com/open-lpk-without-arcgis/

Steps:
0:05 Open GeoUnpack (no sign-up, nothing to install)
0:12 Drop the .lpk file in
0:20 Preview the layers and attributes on a map
0:30 Export to Shapefile, GeoPackage, GeoJSON, KML/KMZ or CSV

Your file is not uploaded: it's processed on your computer with GDAL and 7-Zip compiled to WebAssembly.
Limits: vector layers and tables only (no rasters yet), files up to 150 MB. Symbology from the .lyr file isn't converted.

Prefer desktop software? Extract the .lpk with 7-Zip and open the .gdb folder in QGIS. See my other video: [link to video 2]

Disclosure: I'm Jiayi, an independent developer in Canada, and I built GeoUnpack. It isn't affiliated with Esri. ArcGIS is a trademark of Esri.
```

**Tags:** `lpk file, open lpk file, lpk without arcgis, arcgis layer package, lpk to shapefile, lpkx, esri layer package, gis file converter, shapefile, qgis`

**Thumbnail text:** 大字 `OPEN .LPK` + 小字 `No ArcGIS needed`（左边放一个灰色 .lpk 文件图标，右边是地图截图）

---

## 视频 2：Open an LPK/MPK file in QGIS

**Title（56 字符）:** `Open LPK and MPK Files in QGIS (7-Zip Method, 2 Minutes)`

> 字幕说 “2 Minutes” 指的是操作时间，视频本身约 58 秒。若想更准确，可用 `Open LPK and MPK Files in QGIS: Free 7-Zip Method`（49 字符）。

**长度：** 约 58 秒

| 时间 | 画面（镜头） | 屏幕字幕 | 旁白（英文） |
|---|---|---|---|
| 0:00–0:05 | QGIS 打开；把 `parks.lpk` 直接拖进去，报错 “is not a valid or recognized data source” | `QGIS can't open .lpk directly` | "QGIS can't open an LPK or MPK file directly. But the data inside is easy to get." |
| 0:05–0:15 | Windows：右键 `parks.lpk` → 7-Zip → Extract to "parks\"（Mac：右键 → Open With → Keka） | `Step 1: extract with 7-Zip (Mac: Keka)` | "These packages are 7-Zip archives. Right-click and extract with 7-Zip. Renaming to dot zip often fails." |
| 0:15–0:25 | 打开解压后的文件夹，看到 `v10`、`v108`（或 `p20`、`p30`）文件夹，点进数字最大的 | `Step 2: open the highest version folder` | "Inside you'll see version folders, like v108 for ArcMap or p30 for ArcGIS Pro. Open the highest one." |
| 0:25–0:37 | 看到 `xxx.gdb` 文件夹，把**整个文件夹**拖进 QGIS 窗口 → 弹出选择图层窗口 → 全选 → 图层出现在地图上 | `Step 3: drag the whole .gdb folder into QGIS` | "Find the folder ending in dot gdb, and drag the whole folder into QGIS. Pick the layers, and they load." |
| 0:37–0:45 | 右键图层 → Export → Save Features As… → 格式选 GeoPackage | `Optional: Export → Save Features As` | "To convert, right-click the layer, Export, Save Features As, and choose GeoPackage or Shapefile." |
| 0:45–0:53 | 快速切到浏览器 geounpack.com/open-lpk-in-qgis/ ，拖入同一个 .lpk，导出 GPKG，再把 GPKG 拖进 QGIS | `No 7-Zip? Convert in the browser` | "Can't install 7-Zip? I built a free browser tool, GeoUnpack, that does the extraction for you, without uploading the file." |
| 0:53–0:58 | 结尾：QGIS 里显示数据 + 字幕 | `Styling (.lyr) isn't converted, only data` | "Either way, you get the data, not the ArcGIS styling. Links below." |

**Description:**
```
How to open an Esri layer package (.lpk/.lpkx) or map package (.mpk/.mpkx) in QGIS, for free.

0:05 Extract the package with 7-Zip (Windows) or Keka (Mac). It's a 7z archive, so renaming to .zip often fails.
0:15 Open the highest version folder (v108 for ArcMap packages, p30 for ArcGIS Pro)
0:25 Drag the whole .gdb folder into QGIS (or Layer > Add Vector Layer > Directory > OpenFileGDB)
0:37 Export: right-click the layer > Export > Save Features As (GeoPackage, Shapefile, KML…)
0:45 No-install alternative in the browser

Command line alternative (GDAL): ogr2ogr -f GPKG output.gpkg v108/yourdata.gdb

7-Zip: https://www.7-zip.org/
QGIS: https://qgis.org/
Browser alternative (I built it; files are not uploaded): https://geounpack.com/open-lpk-in-qgis/

Notes: symbology from .lyr/.lyrx files isn't converted. If QGIS says "not a valid or recognized data source", make sure you selected the .gdb folder itself: https://geounpack.com/qgis-gdb-not-a-valid-data-source/

Disclosure: I'm Jiayi, an independent developer in Canada, and I built GeoUnpack. Not affiliated with Esri or QGIS. ArcGIS is a trademark of Esri.
```

**Tags:** `qgis, open lpk in qgis, mpk qgis, mpkx qgis, layer package qgis, file geodatabase qgis, 7-zip, openfilegdb, esri to qgis, gis tutorial`

**Thumbnail text:** 大字 `.LPK → QGIS` + 小字 `Free 7-Zip trick`（QGIS 标志不要放——商标；放 QGIS 界面截图即可）

---

## 视频 3：Convert a GDB to KMZ for Google Earth

**Title（56 字符）:** `Convert a GDB to KMZ for Google Earth (Free, In Browser)`

**长度：** 约 55 秒

| 时间 | 画面（镜头） | 屏幕字幕 | 旁白（英文） |
|---|---|---|---|
| 0:00–0:05 | 文件管理器里一个 `roads.gdb` 文件夹，里面一堆 a0000000X.gdbtable 文件 | `A .gdb folder… for Google Earth?` | "You have a file geodatabase, and you want to see it in Google Earth. Here's the quickest free way." |
| 0:05–0:13 | Windows：右键 `roads.gdb` → Send to → Compressed (zipped) folder（Mac：右键 → Compress） | `Step 1: zip the whole .gdb folder` | "First, zip the whole dot gdb folder. Right-click, Send to, Compressed folder. On a Mac, Compress." |
| 0:13–0:22 | 浏览器打开 geounpack.com/gdb-to-kmz/ ，把 `roads.gdb.zip` 拖进去，显示图层列表 | `Step 2: drop the .zip on geounpack.com` | "Go to geounpack dot com and drop the zip in. Every feature class shows up as a layer." |
| 0:22–0:32 | 勾选要的图层 → “Output format” 选 “KMZ (Google Earth, compressed)” → “Convert & download” | `Step 3: Output format → KMZ` | "Tick the layers you want, choose KMZ, and click Convert and download. Coordinates are converted to WGS84 for you." |
| 0:32–0:45 | 打开 Google Earth Pro：File → Open → 选 .kmz；或 earth.google.com → Projects → Import KML file | `Open in Google Earth (Pro or web)` | "Open the KMZ in Google Earth Pro, or import it in Google Earth on the web." |
| 0:45–0:52 | Google Earth 里点一个要素，弹出属性 | `Attributes come along` | "The attributes come with it. The file never left your computer." |
| 0:52–0:55 | 结尾卡 | `geounpack.com/gdb-to-kmz · I built this tool` | "I built this tool. Link below." |

**Description:**
```
Convert an Esri file geodatabase (.gdb) to KMZ for Google Earth, free and in your browser: https://geounpack.com/gdb-to-kmz/

0:05 Zip the whole .gdb folder (right-click > Send to > Compressed folder; Mac: Compress)
0:13 Drop the .zip on GeoUnpack
0:22 Pick layers, choose KMZ, Convert & download
0:32 Open in Google Earth Pro (File > Open) or Google Earth web (Projects > Import KML file)

Nothing is uploaded: conversion runs locally with GDAL compiled to WebAssembly.
Limits: vector layers only, files up to 150 MB. Very large layers make heavy KMZ files; Google Earth handles tens of thousands of features better than millions.

Prefer QGIS? Add the .gdb (Add Vector Layer > Directory > OpenFileGDB), then Export > Save Features As > KML.
Command line: ogr2ogr -f LIBKML output.kmz yourdata.gdb

Need KML instead? https://geounpack.com/gdb-to-kml/

Disclosure: I'm Jiayi, an independent developer in Canada, and I built GeoUnpack. Not affiliated with Esri or Google.
```

**Tags:** `gdb to kmz, gdb to kml, geodatabase to google earth, file geodatabase, kmz converter, google earth pro, esri gdb, arcgis to google earth, kml, gis converter`

**Thumbnail text:** 大字 `GDB → KMZ` + 小字 `Open in Google Earth`（右边放 Google Earth 里的地图截图，不放 Google 标志）

---

## 录制前核对清单（中文）
- [ ] 视频 1、3 用到的样本文件能在 geounpack.com 正常打开和导出。
- [ ] 视频 3 的 KMZ 在 Google Earth Pro 里能打开、点要素能看到属性（录之前试一次）。
- [ ] 视频 3 简介里 `ogr2ogr -f LIBKML` 这条命令需要 GDAL 带 LIBKML 驱动；QGIS 自带的 GDAL 一般有。不确定可以把这一行删掉，只留 QGIS 的方法。
- [ ] 画面里没有你的个人邮箱、桌面上其他文件、浏览器书签。
- [ ] 标题都 ≤70 个字符（已数过）。
