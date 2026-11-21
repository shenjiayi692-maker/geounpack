# GIS Stack Exchange 和论坛：10 个真实问题 + 回答草稿（2026-11-21 核实）

## 中文摘要：这是什么、你要做什么
- 这里有 **10 个真实存在、还开放的问题**：8 个在 GIS Stack Exchange（下称 GIS SE），2 个在 Esri Community。所有链接、浏览量、回答数都是我在 2026-11-21 通过 Stack Exchange 官方 API 和 Esri 网页直接读到的，没有编造。
- 每条都有：链接、状态、为什么适合、**英文回答草稿**。每个回答都先用免费工具（7-Zip + QGIS / ogr2ogr）把问题完整解决，有的末尾再加一段带“I built this”的 GeoUnpack 介绍。
- **Reddit（r/gis、r/QGIS）我这边访问不了**（reddit.com 屏蔽了我的网络和搜索工具），所以没有列 Reddit 帖子，以免编造链接。文末给了你自己搜索的方法和可以套用的回答模板。
- **你要做的事：**
  1. 每周最多发 **2 条**。先发标“提工具：否”的，再发“提工具：是”的。同一周不要在两个回答里都放链接。
  2. 发之前用自己的话改一改，并**亲手试一遍步骤**（尤其是 7-Zip、QGIS 那几步）。
  3. **GIS SE 要求：用 AI 辅助写的内容必须注明。** 所以每条 GIS SE 回答末尾保留这句（已写在草稿里）：`I drafted this with help from an AI assistant and tested the steps myself.` 如果你完全用自己的话重写了，可以删掉。
  4. **Esri Community 禁止推广自己的网站**（规则原文见下），所以那 2 条**只发技术内容，绝对不要放 GeoUnpack 链接**，个人资料里也不要放。
  5. 发出后把链接记下来，2 周后回去看有没有人追问。
- ⚠️ 收费提醒：HANDOFF 里计划以后做免费额度（1 个图层、≤1,000 个要素）+ 付费。草稿写的是“free, no sign-up”。**一旦开始收费，要回去把已发帖子里的 “free” 改成 “free for small files” 之类的准确说法**，否则会被当成误导。

---

## 各网站的自我推广规则（附来源）

### GIS Stack Exchange
来源：https://gis.stackexchange.com/help/promotion 和 https://gis.stackexchange.com/help/gen-ai-policy
- 可以提自己的产品，但**必须在帖子里写明你和它的关系**（如 “I built this”）。
- 不能只回答“能推销自己产品”的问题；只有一部分（不是全部）回答和自己的产品有关是可以的。
- “Don't tell – show!”：先把方法演示出来，不能只说“用我的工具”。
- 链接只能用来支持正文内容，不能代替回答本身。
- 回答必须能解决提问者的问题，并且“answer for the ages”（照顾以后搜到这个问题的人）。
- **AI 生成的内容必须注明出处**，否则会被删除，重复违规可能被暂停账号。
- 另外：在多个问题下发几乎一样的回答会被标记，所以下面每条回答都按问题单独写了。

### Esri Community
来源：https://community.esri.com/kb/articles/10-community-guidelines/ 和 https://community.esri.com/kb/articles/5-esri-community-terms-of-use/
- 原文：“Don't use the Esri Community to promote your business or advertise affiliated websites, domains, companies, or services in any of your discussions, and don't spam community members.”
- 使用条款还禁止 “Advertising, promotional materials, or other forms of solicitation … This includes advertising links in signatures.”
- 结论：**只给技术答案，不放链接，不放签名**。

### Reddit
我无法访问 reddit.com，没有读到 r/gis、r/QGIS 当前版规。发之前请你在每个版块右侧栏 / “About” → “Rules” 里看清楚自我推广规定（你之前的计划是 10 条内容最多 1 条和自己工具有关）。

---

## 推荐的发帖顺序

| 顺序 | 问题 | 网站 | 提工具 |
|---|---|---|---|
| 1 | #29501 Mac 上用 QGIS 打开 FGDB | GIS SE | 否 |
| 2 | Esri #1527024 打不开 mpkx | Esri Community | 否（禁止） |
| 3 | #64309 Mac 上用 QGIS 打开 .lpk（4.2 万浏览） | GIS SE | 是 |
| 4 | #470066 从 mpkx 提取栅格 | GIS SE | 否（工具不支持栅格） |
| 5 | #12974 lpk 转 shapefile（6.4 万浏览，已有草稿） | GIS SE | 是 |
| 6 | Esri #517637 .lpk 转 shp | Esri Community | 否（禁止） |
| 7 | #137689 没有 ArcGIS 打开 MPK（3.2 万浏览） | GIS SE | 是 |
| 8 | #28939 免费查看/编辑 mpk | GIS SE | 否 |
| 9 | #49324 没有 ArcGIS 把 GDB 转 shapefile | GIS SE | 是 |
| 10 | #430404 mpkx 是什么、怎么打开 | GIS SE | 可选（前面已有 4 条提了工具就别提） |

---

## GIS Stack Exchange

### 1. Free tool to convert ArcGIS layer package (*.lpk) to shapefile (*.shp)?
- URL: https://gis.stackexchange.com/questions/12974/free-tool-to-convert-arcgis-layer-package-lpk-to-shapefile-shp
- 状态（2026-11-21）：开放；63,628 次浏览；6 个回答；没有采纳答案；最后活动 2020-06-04。
- 为什么适合：这个主题浏览量最高；现有回答都是 2011 年的“改成 .zip”，对新包（7z 格式）已经不管用。
- 草稿：**已经写好**，在 `/home/user/geounpack/docs/answers/gis-se-12974-lpk-to-shapefile.md`（版本 A + 版本 B）。版本 B 可以加一句链接到新的报错页面：如果对方提到 Windows 报 “compressed (zipped) folder is invalid”，就附 https://geounpack.com/compressed-zipped-folder-is-invalid-lpk/ 。记得在末尾加 AI 注明那一句。

### 2. Opening ArcGIS Desktop layer package (.lpk) file using QGIS on Mac?
- URL: https://gis.stackexchange.com/questions/64309/opening-arcgis-desktop-layer-package-lpk-file-using-qgis-on-mac
- 状态：开放；41,845 次浏览；5 个回答；没有采纳答案；最后活动 2023-05-08。
- 为什么适合：浏览量第二高。提问者在 Mac 上把 .lpk 改成 .zip 后只看到 .lyr，“7-zip 在 Mac 上用不了”。现有回答没有 Mac 上的具体步骤。注意：这个提问者的包里是旧的 .sdc 数据（Esri Data & Maps），开源工具读不了，回答里要说清楚。
- 提工具：是。

```
The renamed-to-.zip trick only works for some old packages. Layer packages are 7-Zip archives, and macOS's built-in Archive Utility often shows only part of the contents or fails. On a Mac:

1. Extract the package with a 7z-capable tool:
   - Keka or The Unarchiver (free; right-click the .lpk > Open With), or
   - Terminal: `brew install sevenzip` then `7zz x yourfile.lpk -oyourfile`
2. Look inside the extracted folder. You'll usually see version folders such as `v10/`, `v105/`, `v108/` (ArcMap) or `p20/`, `p30/` (ArcGIS Pro .lpkx). Use the highest number. The data is normally a file geodatabase folder ending in `.gdb`; the `.lyr`/`.lyrx` file next to it is only the ArcGIS styling.
3. Open the `.gdb` in QGIS. Current QGIS builds for macOS read file geodatabases out of the box (GDAL's OpenFileGDB driver), no plugin needed: drag the `.gdb` folder into QGIS, or Layer > Add Layer > Add Vector Layer > Source type: Directory > OpenFileGDB, and pick the `.gdb` folder.
4. Right-click a layer > Export > Save Features As… to write a Shapefile or GeoPackage. Or from Terminal, if GDAL is installed: `ogr2ogr -f GPKG output.gpkg v108/yourdata.gdb`

Two caveats:
- Symbology in the `.lyr` isn't converted; you get geometry and attributes.
- If instead of a `.gdb` you find `.sdc` files (as in the Esri ZIP-code package mentioned in the question and in the 2013 answer), that is Esri's Smart Data Compression format. GDAL/QGIS can't read it, so you'd need ArcGIS or a different source for the data (e.g. Census ZCTA shapefiles, as another answer suggests).

If you can't install anything: I built a free browser tool, GeoUnpack (https://geounpack.com/open-lpk-in-qgis/), that does steps 1–4 for you: drop the .lpk/.lpkx, preview the layers and export Shapefile, GeoPackage, GeoJSON, KML or CSV. It runs GDAL and 7-Zip compiled to WebAssembly in your browser, so the file isn't uploaded. Disclosure: I'm the author. It handles vector layers only (not .sdc or rasters).

I drafted this with help from an AI assistant and tested the steps myself.
```

### 3. Opening MPK file without ArcGIS Desktop?
- URL: https://gis.stackexchange.com/questions/137689/opening-mpk-file-without-arcgis-desktop
- 状态：开放；31,937 次浏览；3 个回答；没有采纳答案；最后活动 2024-10-30。
- 为什么适合：问的是用 MapInfo 打开 .mpk。现有回答说“改成 .zip”，但没说怎么把 .gdb 变成 MapInfo 能用的格式。我们可以给一条把 gdb 转成 MapInfo TAB 的 ogr2ogr 命令。
- 提工具：是（链接用 “compressed folder is invalid” 报错页）。

```
To add to the existing answers with steps that work on current packages:

1. Don't rely on renaming to .zip. Map packages (.mpk, and ArcGIS Pro's .mpkx) are 7-Zip archives; Windows' built-in zip support often says "The Compressed (zipped) Folder is invalid". Right-click the .mpk > 7-Zip > Extract to "name\" with 7-Zip (https://www.7-zip.org/).
2. Inside, take the highest version folder (`v10`, `v105`, `v108` … for ArcMap packages; `p20`, `p30` for Pro). The data is usually in a `.gdb` folder (sometimes shapefiles or rasters). The `.mxd`/`.mapx` is the ArcGIS map document; MapInfo can't use it.
3. Convert the geodatabase to MapInfo TAB with GDAL (included in QGIS and OSGeo4W):
   `ogr2ogr -f "MapInfo File" out_tab v108\yourdata.gdb`
   This writes one .tab per feature class into `out_tab`. Use `ogrinfo v108\yourdata.gdb` first to list the layers.
   Without the command line: open the .gdb folder in QGIS (drag it in), then right-click each layer > Export > Save Features As… > format "MapInfo TAB".

Symbology, labels and layout from the .mxd are not converted; you get geometry and attributes.

Disclosure: I built a free browser tool, GeoUnpack, that unpacks .mpk/.mpkx and exports the layers to Shapefile or GeoPackage (both open in MapInfo Pro) without installing anything; files aren't uploaded: https://geounpack.com/compressed-zipped-folder-is-invalid-lpk/ (vector layers only).

I drafted this with help from an AI assistant and tested the steps myself.
```
（发之前请确认：你手上 QGIS 的 “Save Features As” 格式列表里有 “MapInfo TAB”——GDAL 的 MapInfo 驱动是标准自带的。）

### 4. How to extract layers from a mpkx file?
- URL: https://gis.stackexchange.com/questions/470066/how-to-extract-layers-from-a-mpkx-file
- 状态：开放；275 次浏览；**0 个回答**；最后活动 2023-11-10。
- 为什么适合：没人回答过，一个好回答很可能被采纳。提问者用 gdalinfo/ogrinfo 直接打开 USGS 的 .mpkx 失败，想要里面的全球栅格。
- 提工具：**否**（GeoUnpack 不支持栅格，硬塞链接会显得是推销）。

```
gdalinfo/ogrinfo fail because a .mpkx isn't a dataset itself: it's a 7-Zip archive that contains datasets. Two ways in:

1. Extract it, then open what's inside
   7z x USGSEsriTNCWorldTerrestrialEcosystems2020.mpkx -owte
   Look for a version folder (`p20/`, `p30/`) or `commondata/`. Rasters are usually either GeoTIFF/other image files or raster datasets stored inside a `.gdb` folder.
   - Plain .tif: `gdalinfo path/to/file.tif`
   - Raster inside a file geodatabase: GDAL 3.7+ can read these with the OpenFileGDB raster driver:
     gdalinfo wte/p30/something.gdb            (lists the raster layers as subdatasets)
     gdalinfo OpenFileGDB:"wte/p30/something.gdb":raster_name
     gdal_translate OpenFileGDB:"wte/p30/something.gdb":raster_name out.tif -co COMPRESS=DEFLATE
   (Supported raster compressions: none, LZ77, JPEG, JPEG2000.)

2. Read it in place with /vsi7z/ (GDAL 3.7+, only if your GDAL is built with libarchive)
   The /vsi7z/ handler recognises .mpkx/.lpkx/.mpk/.lpk by extension:
   gdalinfo /vsi7z/USGSEsriTNCWorldTerrestrialEcosystems2020.mpkx/p30/something.gdb
   Use `7z l file.mpkx` to see the internal paths. For a large global raster, extracting first (option 1) is usually faster.

Docs: https://gdal.org/en/stable/drivers/raster/openfilegdb.html and https://gdal.org/en/stable/user/virtual_file_systems.html (section /vsi7z/).

I drafted this with help from an AI assistant and tested the steps myself.
```
（这条我没能下载那个 USGS 文件验证内部路径，所以草稿里用了 `something.gdb` 占位。你如果有空，可以下载后用 `7z l` 看一下真实路径再替换；没空就保持占位的写法，内容依然正确。）

### 5. How to convert GDB data to shapefiles without ArcGIS?
- URL: https://gis.stackexchange.com/questions/49324/how-to-convert-gdb-data-to-shapefiles-without-arcgis
- 状态：开放；9,108 次浏览；2 个回答；没有采纳答案；最后活动 2019-03-27。
- 为什么适合：得票最高的回答（2013 年）说“可能需要 Esri 软件才能打开”，现在已经过时：GDAL 自带的 OpenFileGDB 驱动可以直接读。提问者遇到的正是 QGIS 报 “is not a valid or recognized data source”，正好对应新的报错页。
- 提工具：是（链接用 “not a valid data source” 报错页）。

```
Update for current software: you no longer need Esri's FileGDB SDK. GDAL's built-in OpenFileGDB driver (shipped with every current QGIS) reads file geodatabases from ArcGIS 10 and later, and has read-only support for 9.x ones.

In QGIS:
1. Layer > Add Layer > Add Vector Layer.
2. Source type: **Directory** (not File), format **OpenFileGDB**, and select the **`.gdb` folder itself**. Choosing a file inside it (e.g. a00000001.gdbtable) or the parent folder is the most common cause of "Xyz.gdb is not a valid or recognized data source".
3. Pick the layers you need, then right-click > Export > Save Features As… > ESRI Shapefile.

Command line (GDAL/OSGeo4W):
   ogrinfo yourdata.gdb                       (list the feature classes)
   ogr2ogr -f "ESRI Shapefile" out_shp yourdata.gdb
   ogr2ogr -f "ESRI Shapefile" points.shp yourdata.gdb PointsLayerName   (one layer)

If it still says "not a valid data source", check:
- The .gdb folder arrived intact (it should contain many a0000000X.gdbtable/.gdbtablx files). Zipping just some of the files, or e-mail clients stripping them, breaks it. A zipped .gdb can be opened directly if the zip contains the .gdb folder at its top level (GDAL reads `.gdb.zip`).
- The geodatabase isn't compressed with ArcGIS's "Compress File Geodatabase Data" tool (CDF) — OpenFileGDB can't read that; ask the sender to uncompress it.

Shapefile limits to keep in mind: field names are cut to 10 characters, text to 254 characters, and each .dbf is limited to ~2 GB, so GeoPackage (`-f GPKG out.gpkg`) is often a safer target if your tools accept it.

Disclosure: I built a free browser tool, GeoUnpack, which opens a zipped .gdb and exports Shapefile/GeoPackage/KML/CSV without installing anything; files aren't uploaded. Its page on this error: https://geounpack.com/qgis-gdb-not-a-valid-data-source/

I drafted this with help from an AI assistant and tested the steps myself.
```

### 6. Are there any free tools that can view and edit ArcGIS Map Packages?
- URL: https://gis.stackexchange.com/questions/28939/are-there-any-free-tools-that-can-view-and-edit-arcgis-map-packages
- 状态：开放；3,243 次浏览；2 个回答；没有采纳答案；最后活动 2015-01-29。
- 为什么适合：现有回答是 2013–2015 年的，那时 QGIS 还不能写 FGDB。现在 QGIS 3.28+（GDAL 3.6+）可以直接编辑 .gdb，这是新信息。
- 提工具：**否**（GeoUnpack 不能编辑；不提工具也能积累信誉）。

```
An update, since this changed a lot after the existing answers were written:

- Viewing: extract the .mpk/.mpkx with 7-Zip (it's a 7z archive) and open the `.gdb` folder from the highest version folder (`v10`/`v108`, or `p20`/`p30` for Pro packages) in QGIS — drag it in, or Add Vector Layer > Directory > OpenFileGDB.
- Editing the data: since GDAL 3.6 (QGIS 3.28 and later) the OpenFileGDB driver can also write to file geodatabases, so a third party can add points or lines directly to a feature class in QGIS (toggle editing on the layer). Domains, subtypes, relationship classes, topology and annotation aren't fully supported, so test on a copy. Alternatively, export to GeoPackage, edit there, and send that back.
- What you still can't do without ArcGIS: edit the map document itself (.mxd/.mapx: symbology, layout, labels) or re-create the .mpk. The usual workflow is that the third party edits/returns the data and the ArcGIS user re-packages it.

I drafted this with help from an AI assistant and tested the steps myself.
```
（发之前请你在 QGIS 里试一次：打开一个 .gdb 图层 → 切换编辑 → 加一个点 → 保存，确认可以。）

### 7. Working with File Geodatabase in QGIS for MAC OSX?
- URL: https://gis.stackexchange.com/questions/29501/working-with-file-geodatabase-in-qgis-for-mac-osx
- 状态：开放；10,049 次浏览；6 个回答；没有采纳答案；最后活动 2022-05-30。
- 为什么适合：所有回答都在教 2012 年的做法（编译 FileGDB 驱动、KyngChaos），现在已经完全不需要。一个简短的“现状更新”对后来的人很有用。
- 提工具：**否**。建议第一个发，用来积累信誉。

```
For anyone landing here now: none of the compiling/KyngChaos steps are needed any more. The official QGIS installer for macOS (https://qgis.org) includes GDAL's OpenFileGDB driver, which reads file geodatabases created by ArcGIS 10+ (read-only for 9.x) and, from QGIS 3.28 / GDAL 3.6, can also edit them.

- Open: drag the `.gdb` folder from Finder into the QGIS window, or Layer > Add Layer > Add Vector Layer > Source type: Directory > OpenFileGDB, then select the `.gdb` folder (not a file inside it).
- Command line: `ogrinfo yourdata.gdb` and `ogr2ogr -f GPKG out.gpkg yourdata.gdb`.
- Still not readable with open-source tools: geodatabases compressed with ArcGIS's "Compress File Geodatabase Data" tool (CDF), and personal geodatabases (.mdb) need the separate PGeo/MDB driver.

Note: if macOS blocks QGIS on first launch, right-click QGIS.app > Open once.

I drafted this with help from an AI assistant and tested the steps myself.
```

### 8. What type of file is an .mpkx and how can I open it?
- URL: https://gis.stackexchange.com/questions/430404/what-type-of-file-is-an-mpkx-and-how-can-i-open-it
- 状态：开放；6,585 次浏览；1 个回答（已采纳，很简短）；最后活动 2022-05-04。
- 为什么适合：问的正是 GeoUnpack 的 /mpkx-viewer/ 页面主题；已采纳的回答只有两句，没有步骤，补充一个详细回答有价值。
- 提工具：可选。若前面已有 3–4 条回答提了工具，这条就删掉最后的工具段落。

```
To expand on the accepted answer with the actual steps:

What it is: a .mpkx is an ArcGIS Pro map package — a 7-Zip archive containing a map definition (.mapx, a 2D map; 3D scenes are usually shared as other package types) plus copies of the data it uses, normally a file geodatabase. Version folders such as `p20`/`p30` hold copies for ArcGIS Pro 2.x/3.x.

Open it without ArcGIS Pro:
1. Extract with 7-Zip (Windows: right-click > 7-Zip > Extract to "name\"; macOS: Keka or The Unarchiver; Linux: `7z x file.mpkx`). Renaming to .zip often fails because it isn't a standard zip.
2. Find the `.gdb` folder in the highest `pNN` folder (or in `commondata/`).
3. In QGIS, drag the `.gdb` folder in, or Add Vector Layer > Directory > OpenFileGDB. Then Export > Save Features As… if you need Shapefile/GeoPackage/KML.
   Or: `ogr2ogr -f GPKG out.gpkg p30/yourdata.gdb`

QGIS can't read the .mapx itself, so symbology, labels and layouts are lost; you get the geometry and attributes. Rasters inside the package can be read with GDAL 3.7+ (OpenFileGDB raster driver) or opened directly if they are GeoTIFFs.

Disclosure: I built a free browser viewer for this, GeoUnpack (https://geounpack.com/mpkx-viewer/): drop the .mpkx in, see the layers on a map and export them; it runs locally in the browser so the file isn't uploaded (vector layers only).

I drafted this with help from an AI assistant and tested the steps myself.
```

---

## Esri Community（只发技术内容，禁止放链接）

### 9. Opening a Map Package File (mpkx)
- URL: https://community.esri.com/t5/arcgis-pro-questions/opening-a-map-package-file-mpkx/td-p/1527024
- 状态：未关闭（closed: false）；9,305 次浏览；11 条回复；标记有已采纳回答；发布于 2024-08-26。
- 为什么适合：提问者用 12 GB 的 mpkx 做备份，原硬盘坏了，需要把数据救出来。帖子里有人说“改成 .zip 后 Windows 说无效”，但没人说用 7-Zip。我们的信息能真正帮他。（12 GB 也超过 GeoUnpack 的 150 MB 上限，本来就不该提工具。）

```
In case it helps anyone recovering data from a .mpkx: the reason renaming to .zip fails is that Pro packages are 7-Zip archives, not standard zip files, so Windows' built-in extractor reports them as invalid.

1. Make a copy of the .mpkx and extract it with 7-Zip (free, 7-zip.org): right-click > 7-Zip > Extract to "name\". For a 12 GB package make sure you have at least that much free space again.
2. Inside, look in the version folders (p20/p30) and in commondata/ for .gdb folders (and any rasters or other files that were packaged).
3. In ArcGIS Pro, connect to that folder in the Catalog pane (Add Folder Connection) and add the feature classes to a new map, or copy the .gdb to your new project location.

If 7-Zip reports CRC/data errors, the package itself was damaged (e.g. written to the failing drive) and only the intact parts can be recovered.
Symbology will need to be redone unless the .mapx inside opens (Insert > Import Map in Pro, pointing at the extracted .mapx).
```
（最后一句“Import Map 指向解压出来的 .mapx”请你如果有 Pro 试用版就验证一下；没法验证就删掉最后一行。）

### 10. .lpk file to .shp or a feature class
- URL: https://community.esri.com/t5/arcgis-enterprise-portal-questions/lpk-file-to-shp-or-a-feature-class/td-p/517637
- 状态：未关闭；9,400 次浏览；1 条回复（已采纳：双击 .lpk 解压到 Documents\ArcGIS\Packages）。
- 为什么适合：浏览量高，唯一的回答只适用于装了 ArcMap 的人；可以补充 ArcGIS Pro 的做法和没有 ArcGIS 时的做法。

```
Adding a couple of options for people who find this later:

- ArcGIS Pro: run the Extract Package tool (Data Management) on the .lpk/.lpkx and choose an output folder; the data lands in a file geodatabase under that folder (p20/p30 for Pro, v10x for ArcMap packages). Then use Feature Class To Shapefile, or Export Features, to get a shapefile.
- Without ArcGIS: the package is a 7-Zip archive. Extract it with 7-Zip, open the .gdb from the highest version folder in QGIS (Add Vector Layer > Directory > OpenFileGDB), and use Export > Save Features As… > ESRI Shapefile. Or with GDAL: ogr2ogr -f "ESRI Shapefile" out_folder v108\yourdata.gdb

Note that shapefiles truncate field names to 10 characters, so check your attribute names after export.
```

### 不建议回复的
- “Please explain Layer Packages (.lpkx)” https://community.esri.com/t5/arcgis-pro-questions/please-explain-layer-packages-lpkx/td-p/90783 （21,985 次浏览）——已有人（Alex_at_Exprodat）完整解释过 p20/p30 结构，再答没有新信息。
- “Map package of ArcGIS to use in QGIS” https://gis.stackexchange.com/questions/312904 （GIS SE，26,208 次浏览）——**已关闭**，不能回答。
- “Opening .lpk in QGIS?” https://gis.stackexchange.com/questions/271467 ——**已关闭**。

---

## Reddit（r/gis、r/QGIS）：自己找帖子的方法

我访问不了 Reddit，所以没有列帖子。你可以：
1. 打开 Reddit，在 r/gis 和 r/QGIS 里分别搜：`lpk`、`mpk`、`mpkx`、`gdb without arcgis`、`geodatabase qgis`、`layer package`。按 “New” 排序，只回 **30 天内**、还没有好答案的帖子（Reddit 老帖子基本没人看，和 Stack Exchange 不一样）。
2. 把帖子链接和内容复制给 Claude，让它按下面的模板改写。
3. 也可以用 Google 搜 `site:reddit.com/r/gis lpk` 找老帖子，但老帖子通常已归档、不能回复。

Reddit 回答模板（养号期删掉最后一段）：
```
Those are 7-Zip archives, so renaming to .zip usually fails. Extract with 7-Zip (Windows) or Keka (Mac), open the highest version folder (v108 / p30), and drag the .gdb folder into QGIS — it reads file geodatabases natively. Right-click > Export > Save Features As for Shapefile/GeoPackage/KML. Styling from the .lyr won't come across, just the data.

If you can't install anything: I built a free browser tool for exactly this, geounpack.com — the file stays on your computer (runs GDAL in WebAssembly). Vector layers only for now. Happy to hear if it breaks on your file.
```
