# GeoUnpack：部署说明 + 上线前准备 + 30 个待回答的问题（2026-11-03）

## 一、Cloudflare Pages 部署说明（约 15 分钟）

> Cloudflare 的界面经常调整。如果按钮名字和下面不完全一样，找意思相近的选项即可。

1. 登录 https://dash.cloudflare.com
2. 左侧菜单点 **Compute (Workers)** → **Workers & Pages**（有的账号直接显示 “Workers & Pages”）。
3. 点 **Create**（创建）→ 选 **Pages** 标签 → **Import an existing Git repository**（导入已有的 Git 仓库）。
   - 如果只看到创建 Worker 的选项，找页面上 “Looking to deploy Pages? Get started” 一类的链接。
4. 点 **Connect GitHub**，授权 Cloudflare 访问 GitHub。授权范围选 **Only select repositories** → 勾选 `geounpack`。
5. 选中仓库 `geounpack` → **Begin setup**。
6. 填写设置：
   | 项目 | 填写 |
   |---|---|
   | Project name | `geounpack`（会得到网址 `geounpack.pages.dev`；如果被占用，会自动变成别的名字，记下最终网址） |
   | Production branch | `mvp-v0.1`（等你把它合并到 `main` 以后再改成 `main`） |
   | Framework preset | `None` |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
7. 展开 **Environment variables**（环境变量），添加 3 个：
   | 变量名 | 值 | 作用 |
   |---|---|---|
   | `NODE_VERSION` | `22` | 指定 Node 版本 |
   | `NOINDEX` | `1` | **正式域名上线前**不让搜索引擎收录测试网址 |
   | `SITE_URL` | `https://geounpack.pages.dev`（换成第 6 步的实际网址） | 页面里的规范链接 |
8. 点 **Save and Deploy**，等 1–3 分钟，出现绿色的 “Success” 就完成了。
9. 打开 `https://geounpack.pages.dev`，拖一个文件进去试试。如果打不开，把 Cloudflare 构建日志的最后 30 行截图发给我。

**以后每次我往 `mvp-v0.1` 分支推送代码，Cloudflare 都会自动重新部署，你什么都不用做。**

### 买了域名以后（第 3 周左右）
1. Cloudflare 左侧 **Domain Registration** → **Register Domains**，搜 `geounpack.com` 买下（按成本价，约 USD 10–11/年）。
2. 回到 Pages 项目 → **Custom domains** → **Set up a custom domain** → 输入 `geounpack.com`，按提示确认。
3. 改环境变量：**删除** `NOINDEX`；`SITE_URL` 改成 `https://geounpack.com`；然后在 **Deployments** 里点 **Retry deployment**（重新部署）。
4. 然后再去 Google Search Console 和 Bing 站长工具添加网站（见第二节）。
5. 可选：Cloudflare **Email Routing**（免费）设置 `hello@geounpack.com` 转发到你的 Gmail，作为对外联系邮箱。

---

## 二、问题答复

**1. Bing 站长工具是不是要等有域名再弄？**
对。Bing 站长工具和 Google Search Console 都要“验证网站是你的”，验证的是正式域名。等域名接好、删掉 `NOINDEX` 以后再加，加的时候选用 Cloudflare 自动验证或者 DNS 验证最省事。现在先注册好账号就行。

**2. GIS 问答站网址**
https://gis.stackexchange.com （GIS Stack Exchange）。用 Google 账号就能登录。

**3. 部署说明** 见第一节。

---

## 三、网站上线前你要做的事（按优先级）

| # | 事项 | 时间 | 说明 |
|---|---|---|---|
| 1 | **按第一节部署到 pages.dev** | 15 分钟 | 部署完把网址发给我 |
| 2 | **亲自试用** | 30 分钟 | 用 Windows 或 Mac 的 Chrome、Edge、Safari 各试一下；可以下载第五节的样本文件来测。记下哪里看不懂、哪里卡住 |
| 3 | **GIS 问答站养号** | 每周 1–2 小时 | 见下面的“养号方法” |
| 4 | **Reddit 养号** | 每周 30 分钟 | 加入 r/gis、r/QGIS、r/civilengineering，先评论、点赞，不发链接 |
| 5 | 想好对外联系邮箱 | 5 分钟 | 推荐买域名后用 `hello@geounpack.com` 转发到 Gmail |
| 6 | 找 2–3 个朋友试用 | 可选 | 最好是做工程、规划或测绘的朋友 |

### 养号方法

**GIS Stack Exchange**
- 新账号有限制：信誉分不到 10 分时，一个回答里最多只能放 2 个链接；投票、评论也需要一定的信誉分。
- 怎么涨分：回答问题被点赞一次 +10，答案被采纳 +15。前 2–3 周的目标是 **拿到 50–100 分**。
- 我每周给你挑 3–5 个**你能答的新问题**（比如“怎么在 QGIS 里打开 gdb”这类），起草答案并在这里实际验证，你理解后改成自己的话发出去。
- **最重要的规矩：推荐自己做的工具时，必须在回答里写明“我是这个工具的作者”**（原文类似 “Disclosure: I built this tool”）。不写会被当成垃圾广告删帖甚至封号。每个回答都必须先把问题本身答好，工具只是附带一句。
- 不要在短时间内给很多老问题贴同一个链接。

**Reddit**
- 新账号在很多版块发帖会被自动过滤，需要先有一些评论积分（karma）。
- 前 2 周：在 r/gis、r/QGIS 里回答新手问题、点赞好内容。
- 上线后：可以在 r/gis 发一篇 “I built a free browser tool to open .lpk/.mpk files without ArcGIS” 的分享帖（发之前先看各版块对自我推广的规定）。
- 普遍的社区规矩是“9:1”：10 条内容里最多 1 条和自己的产品有关。

---

## 四、30 个待回答的问题（GIS Stack Exchange）

**使用规则**
- **A 级 = 上线后优先回答**：问题本身就是“不用 ArcGIS 打开或转换这些文件”，最适合介绍工具。
- **B 级 = 可以回答，工具只作为备选**：主要用 QGIS 或 GDAL 解决，最后补一句“不想装软件的话……”。
- **C 级 = 养号用**：直接答问题，**不提工具**，用来涨信誉分。
- 浏览量是截至 2026-11-03 的累计数。很多老问题已有采纳答案，只有你的回答**确实补充了新内容**（比如 2026 年最新的做法），才值得回答。

| # | 级别 | 浏览量 | 年份 | 已采纳？ | 问题 | 回答方向 |
|---|---|---|---|---|---|---|
| 1 | A | 63,580 | 2011 | 否 | [Free tool to convert ArcGIS layer package (*.lpk) to shapefile?](https://gis.stackexchange.com/questions/12974/free-tool-to-convert-arcgis-layer-package-lpk-to-shapefile-shp) | 讲清 .lpk = 7z 压缩包 → 7-Zip 解压 → QGIS/ogr2ogr；最后介绍网页工具（声明作者身份） |
| 2 | A | 46,107 | 2014 | 否 | [Converting data from .gdb into shapefile without ArcMap](https://gis.stackexchange.com/questions/108006/converting-data-from-gdb-into-shapefile-without-arcmap) | QGIS 导出 / ogr2ogr 命令；网页工具作为不用安装软件的选项 |
| 3 | A | 31,894 | 2015 | 否 | [Opening MPK file without ArcGIS Desktop?](https://gis.stackexchange.com/questions/137689/opening-mpk-file-without-arcgis-desktop) | .mpk 内部结构（v10/v101 文件夹 + .gdb），解压步骤，网页工具 |
| 4 | A | 9,106 | 2013 | 否 | [How to convert GDB data to shapefiles without ArcGIS?](https://gis.stackexchange.com/questions/49324/how-to-convert-gdb-data-to-shapefiles-without-arcgis) | 同 #2，并提醒 Shapefile 字段名 10 字符的限制 |
| 5 | A | 6,556 | 2022 | 是 | [What type of file is an .mpkx and how can I open it?](https://gis.stackexchange.com/questions/430404/what-type-of-file-is-an-mpkx-and-how-can-i-open-it) | 补充：.mpkx 同样是 7z 压缩包，p20 文件夹里是 .gdb；网页工具已测试 .mpkx |
| 6 | ✗ | 2,730 | 2018 | 已关闭 | [Opening .lpk in QGIS?](https://gis.stackexchange.com/questions/271467/opening-lpk-in-qgis) | **已因“重复问题”被关闭，不能回答**；改答 #1 |
| 7 | A | 1,631 | 2015 | 是 | [Converting file geodatabase feature class to KML without using Esri software?](https://gis.stackexchange.com/questions/152060/converting-file-geodatabase-feature-class-to-kml-without-using-esri-software) | ogr2ogr -f KML（注意转成 WGS84）；网页工具 |
| 8 | A | 9,910 | 2015 | 否 | [How to import gdb file data into an Excel sheet](https://gis.stackexchange.com/questions/129758/how-to-import-gdb-file-data-into-an-excel-sheet) | QGIS 导出 CSV/XLSX；ogr2ogr -f XLSX；网页工具导出 CSV |
| 9 | A | 2,363 | 2018 | 否 | [.gdb folder to map use for Garmin GPS](https://gis.stackexchange.com/questions/290669/gdb-folder-to-map-use-for-garmin-gps) | ogr2ogr -f GPX / 转 KML；说明 Garmin 需要的格式 |
| 10 | A | 6,850 | 2016 | 否 | [How to extract .mpk file package in ArcGIS](https://gis.stackexchange.com/questions/203933/how-to-extract-mpk-file-package-in-arcgis) | ArcGIS 里的“Extract Package”工具；没有 ArcGIS 时的办法 |
| 11 | A | 1,880 | 2014 | 否 | [Extract .mxd file + data from map package .mpk?](https://gis.stackexchange.com/questions/124187/extract-mxd-file-data-from-map-package-mpk) | 7-Zip 解压就能拿到 .mxd 和数据；网页工具只取数据 |
| 12 | A | 3,945 | 2017 | 是 | [Can't open .mpk file in ArcGIS](https://gis.stackexchange.com/questions/263405/cant-open-mpk-file-in-arcgis) | 补充：版本不兼容时，先解压取出数据 |
| 13 | B | 247,885 | 2012 | 是 | [Installing File Geodatabase (*.gdb) support in QGIS](https://gis.stackexchange.com/questions/26285/installing-file-geodatabase-gdb-support-in-qgis) | 更新 2026 年的情况：QGIS 3.x 自带 OpenFileGDB，直接拖 .gdb 文件夹即可。**这个问题浏览量最大，回答要高质量**，工具最多一句 |
| 14 | B | 36,894 | 2010 | 是 | [Open Source Tool capable of reading Esri File Geodatabase (.gdb)?](https://gis.stackexchange.com/questions/4076/open-source-tool-capable-of-reading-esri-file-geodatabase-gdb) | 更新：GDAL OpenFileGDB 现在已能读写；浏览器端的 gdal3.js 也能读 |
| 15 | B | 100,330 | 2013 | 是 | [Opening *.gdb folder in ArcMap?](https://gis.stackexchange.com/questions/64182/opening-gdb-folder-in-arcmap) | 主要讲 ArcMap 的方法；补充“没有 ArcMap 时” |
| 16 | B | 6,027 | 2015 | 否 | [Need File Geodatabase (*.gdb) read/write support in QGIS?](https://gis.stackexchange.com/questions/167939/need-file-geodatabase-gdb-read-write-support-in-qgis) | GDAL 3.6 起 OpenFileGDB 支持写入 |
| 17 | B | 5,586 | 2013 | 是 | [Opening File Geodatabase in QGIS for Ubuntu?](https://gis.stackexchange.com/questions/64054/opening-file-geodatabase-in-qgis-for-ubuntu) | 更新到当前版本的做法 |
| 18 | B | 3,242 | 2015 | 否 | [Opening file geodatabase using QGIS for Mac?](https://gis.stackexchange.com/questions/131001/opening-file-geodatabase-using-qgis-for-mac) | Mac 上的步骤（添加“目录”作为矢量数据源）；网页工具在 Mac 上直接可用 |
| 19 | B | 2,878 | 2012 | 否 | [How to open a file geodatabase with tables and relationships in QGIS?](https://gis.stackexchange.com/questions/30783/how-to-open-a-file-geodatabase-with-tables-and-relationships-in-qgis) | QGIS 能读属性表，关系需手动建立 |
| 20 | B | 3,328 | 2019 | 是 | [GeoDatabase (GDB) import not working (QGIS3)](https://gis.stackexchange.com/questions/326746/geodatabase-gdb-import-not-working-qgis3) | 常见原因：选了文件而不是文件夹 |
| 21 | B | 1,321 | 2020 | 否 | [Why am I getting this error when importing a GDB into QGIS?](https://gis.stackexchange.com/questions/359828/why-am-i-getting-this-error-when-importing-a-gdb-into-qgis) | 先看报错内容再答 |
| 22 | B | 2,452 | 2013 | 否 | [Issues Accessing ESRI File Geodatabase within Quantum GIS Desktop](https://gis.stackexchange.com/questions/45505/issues-accessing-esri-file-geodatabase-within-quantum-gis-desktop) | 同上 |
| 23 | B | 2,236 | 2022 | 否 | [Export table structure from ArcGIS GDB to Excel](https://gis.stackexchange.com/questions/423804/export-table-structure-from-arcgis-gdb-to-excel) | ogrinfo -json 导出字段结构；网页工具里也能看到字段 |
| 24 | B | 9,170 | 2014 | 否 | [Opening Raster stored in Esri Geodatabase using QGIS](https://gis.stackexchange.com/questions/110533/opening-raster-stored-in-esri-geodatabase-using-qgis) | GDAL 3.7+ OpenFileGDB 可读栅格。**网页工具还不支持栅格，不要推荐** |
| 25 | C | 39,284 | 2013 | 是 | [Choosing File Geodatabase, Personal Geodatabase or shapefile format?](https://gis.stackexchange.com/questions/60196/choosing-file-geodatabase-gdb-personal-geodatabase-mdb-or-shapefile-for) | 养号：补充 GeoPackage 作为现代选择 |
| 26 | C | 35,639 | 2013 | 否 | [Maximum length of text fields in shapefile and geodatabase formats?](https://gis.stackexchange.com/questions/75092/maximum-length-of-text-fields-in-shapefile-and-geodatabase-formats) | 养号：Shapefile 字段 254 字符、字段名 10 字符的限制 |
| 27 | C | 49,541 | 2015 | 否 | [Opening ESRI Personal GeoDatabase (*.mdb) in QGIS](https://gis.stackexchange.com/questions/129514/opening-esri-personal-geodatabase-mdb-in-qgis) | 养号（.mdb 网页工具不支持） |
| 28 | C | 16,454 | 2014 | 否 | [Converting personal geodatabase .mdb file to .gdb](https://gis.stackexchange.com/questions/123019/converting-personal-geodatabase-mdb-file-to-gdb) | 养号 |
| 29 | C | 2,294 | 2018 | 是 | [Difference between MPK and MMPK](https://gis.stackexchange.com/questions/277091/difference-between-mpk-and-mmpk) | 养号：解释两种包的区别 |
| 30 | C | 4,704 | 2013 | 否 | [Opening personal geodatabase in QGIS](https://gis.stackexchange.com/questions/73201/opening-personal-geodatabase-in-qgis) | 养号 |

**节奏建议**
- 第 1–2 周（网站没上线）：只答 C 级和 B 级，**不提工具**，目标 50–100 分。#6（还没有任何回答）可以先用纯 QGIS 的方法回答。
- 第 3–4 周（正式域名上线后）：每周答 2–3 个 A 级，写明作者身份。
- 之后：每周关注 GIS Stack Exchange 上带 `file-geodatabase`、`qgis`、`arcgis-desktop` 标签的新问题，新问题比老问题更容易被看到。

---

## 五、给你自己测试用的样本文件（都是 ArcGIS Online 上的公开数据）
直接在浏览器打开下面的链接就会下载：
- 小地图包（新西兰）：https://www.arcgis.com/sharing/rest/content/items/74c0e896a0ce42ddb65b37fbab5c93be/data
- 美国城市和州：https://www.arcgis.com/sharing/rest/content/items/f652b9e15ef9409ea5ef30a260a56bf8/data
- ArcGIS Pro 新格式（.mpkx）：https://www.arcgis.com/sharing/rest/content/items/92ca5cdb3ff1461384bf80dc008e297b/data
- 图层包（.lpk，25MB）：https://www.arcgis.com/sharing/rest/content/items/1a6cae723af14f9cae228b133aebc620/data

下载下来的文件名可能没有后缀；如果是这样，把它改成 `.mpk` 或 `.lpk` 再拖进网页。
