# 其他值得做的免费渠道（2026-11-21 逐个核实）

## 中文摘要：这是什么、你要做什么
- 这里只列**我亲自打开核实过、确实存在、并且允许这类分享**的渠道，每个都附规则来源和可以直接复制的英文文案。
- 最推荐的是 **QGIS 加拿大用户组**（你在加拿大，这个小组刚成立、很活跃、欢迎自我介绍），其次是 **Mapstodon（地图/GIS 专用的 Mastodon 站）的 #gischat**，然后是 **Hacker News 的 Show HN**（只发一次）。
- **你要做的事（建议顺序）：**
  1. 本周：在 QGIS Canada 的 “Introductions” 帖子里自我介绍（文案 1A）。**这一条不放链接也可以**，只说你在做什么。
  2. 1–2 周后：如果介绍帖有人回应，再单独发帖问能不能在月度线上会议做 5 分钟演示（文案 1B）。
  3. 注册 Mapstodon（需要人工审核，申请理由用你自己的话写），先关注别人、回复几条，**一周后**再发工具介绍（文案 2）。之后每月最多 1 条和工具有关。
  4. 网站稳定、你有 1–2 小时可以守着回复时，发一次 Show HN（文案 3）。
  5. Geography Realm 和 Geoawesome 是“可选”，价值较低，有空再做。
- 所有文案都写了 “I built this”。如果以后开始收费，请在文案里写清楚免费范围。

---

## 1. OSGeo Discourse：QGIS Canada 用户组（★ 最推荐）

- 是什么：OSGeo 官方论坛里的 QGIS 加拿大用户组，2026 年 6 月成立，中英法语都可以。本月刚办了第一个加拿大 QGIS Day，还有月度线上会议。
- 版块：https://discourse.osgeo.org/c/qgis/qgis-ca/77
- 版块说明（原文）：“Welcome to the QGIS Canada User Group. This aims to be the discussion place for QGIS users in Canada, and others are obviously welcome. Discussions can occur in French or English, whatever you prefer.”（来源：https://discourse.osgeo.org/t/about-the-qgis-ca-category/154003 ）
- 自我介绍帖（2026-10-19 开的，已有 7 条回复，大家在介绍自己和 QGIS 的关系）：https://discourse.osgeo.org/t/introductions/155665
- 先例：QGIS US 版块里有人发帖申请在月度会议上演示自己做的免费 QGIS 插件：https://discourse.osgeo.org/t/could-we-present-ai-agent-a-free-qgis-plugin-at-a-qgis-us-meeting/155693 （注意：这个帖子目前还没人回复，所以只能说明“可以这样问”，不代表一定会被接受。）
- 怎么提交：用 OSGeo 账号登录（右上角 Sign Up / Log In），在介绍帖里点 “Reply”。
- 注意：这是开源社区。GeoUnpack 本身不是开源的，但用的是 GDAL 和 7-Zip。说话要突出“帮 QGIS 用户打开 Esri 文件”，并且**同时给出不用工具的 QGIS 方法**。

**文案 1A（自我介绍，回复在 Introductions 帖子里）：**
```
Hi everyone, I'm Jiayi, an independent developer based in [city], Canada. I'm not a GIS professional by training, but I kept running into the same problem friends had: someone sends them an Esri .lpk, .mpk or .gdb and they don't have ArcGIS.

The QGIS route works well once you know it (extract the package with 7-Zip, then drag the .gdb folder into QGIS — OpenFileGDB reads it natively), so I've been writing that up, and I also built a small free browser tool, GeoUnpack (https://geounpack.com/), that does the unpacking/conversion locally with GDAL compiled to WebAssembly, for people who can't install anything.

Happy to be here and to learn from the group. If anyone has Esri packages that misbehave in QGIS, I'd love to hear about them.
```

**文案 1B（单独发帖，标题 + 正文；介绍帖之后 1–2 周再发）：**

Title: `Short demo idea: getting data out of Esri .lpk/.mpk packages into QGIS`
```
Hi all, I'm Jiayi (introduced myself here: https://discourse.osgeo.org/t/introductions/155665).

A question that comes up a lot for QGIS users is how to open Esri layer packages (.lpk/.lpkx), map packages (.mpk/.mpkx) and file geodatabases. If it's useful, I could do a 5-minute demo at a monthly meeting covering:
1. why "rename to .zip" fails (they're 7-Zip archives) and which version folder (v108 / p30) to use,
2. opening the .gdb in QGIS with OpenFileGDB, and what does/doesn't survive (symbology, domains, rasters),
3. a no-install option: a free browser tool I built, GeoUnpack, which runs GDAL in WebAssembly so files aren't uploaded.

Disclosure: I'm the author of #3, and I'm happy to skip it if the group prefers the QGIS-only part. No problem at all if this isn't a fit.
```

---

## 2. Mapstodon.space + #gischat（Mastodon）

- 是什么：专门给地图和 GIS 人群的 Mastodon 站点。核实时（2026-11-21）有约 2,700 名用户；注册需要人工审核。
- 站点说明：“Mapstodon.space is a Mastodon instance dedicated to the mapping & geospatial community.”
- 规则（来源：https://mapstodon.space/about ，通过站点公开接口读取）：
  - “This is a non-generalist instance for people with an interest in cartography and geospatial.”
  - “**Direct advertising for commercial products must remain exceptional.**”
  - “AI agents are not allowed to register on this instance.”（所以必须你本人注册、本人发帖，不能让任何自动化工具代发。）
- #gischat 标签：https://mapstodon.space/tags/gischat ，核实时最近几天每天有几条到十几条帖子，来自多个 Mastodon 站点（如 mastodon.social、techhub.social），说明这个标签是跨站点在用的。
- 怎么做：
  1. 在 https://mapstodon.space 注册，申请理由写一句真实的，比如 “Independent developer building small tools to help people open GIS files; interested in QGIS and open data.”
  2. 头像和简介写清楚你是谁，简介里可以放 geounpack.com。
  3. 先关注 #gischat、#QGIS、#GDAL，回复别人的问题几次。
  4. 一周后发下面的帖子（500 字符以内，可以附 2–4 张截图，图片要写替代文字 alt text）。

**文案 2（≤500 字符）：**
```
I built a small free tool for a very specific GIS headache: someone sends you an Esri .lpk/.mpk or a zipped .gdb and you don't have ArcGIS.

GeoUnpack opens it in the browser, shows the layers on a map and exports GeoPackage, Shapefile, GeoJSON, KML/KMZ or CSV. It runs GDAL + 7-Zip compiled to WebAssembly, so nothing is uploaded.

Vector only for now. Feedback very welcome!
https://geounpack.com/

#gischat #QGIS #GDAL #opendata
```
图片替代文字示例：`Screenshot: an .lpk file's layers listed in GeoUnpack next to a map preview of park polygons.`

---

## 3. Hacker News：Show HN（只发一次）

- 规则来源：https://news.ycombinator.com/showhn.html
- 规则要点：
  - “Show HN is for something you've made that other people can play with.” 必须是自己做的、大家能直接试用的东西（GeoUnpack 不用注册，符合）。
  - “The project must be something you've worked on personally and which you're around to discuss.”——发帖后要在线回复问题。
  - “Please don't ask friends to upvote or comment.”——**绝对不要请朋友点赞**。
  - 标题以 “Show HN” 开头。
- 怎么提交：注册 https://news.ycombinator.com ，点顶部 “submit”，Title 填下面的标题，URL 填 https://geounpack.com/ ，然后立刻在自己的帖子下面发一条“作者说明”评论。
- 时间建议：北美工作日上午（美东 8–10 点）。发完后 2–3 小时内守着回复。
- 预期：大多数 Show HN 只有很少的浏览；这是一次性尝试，不成功不要重发。

**标题：** `Show HN: GeoUnpack – open Esri .lpk/.mpk/.gdb files in the browser (GDAL WASM)`

**作者评论：**
```
Hi HN, I'm Jiayi, an independent developer in Canada.

GIS people often receive Esri "packages" (.lpk/.mpk and the newer .lpkx/.mpkx) or file geodatabases from government agencies or consultants, and you need ArcGIS to open them the official way. It turns out they're 7-Zip archives containing a file geodatabase, which GDAL's OpenFileGDB driver can read.

GeoUnpack runs 7-Zip (7z-wasm) and GDAL (gdal3.js) in a Web Worker, lists the layers, previews them with Leaflet, and exports GeoPackage/Shapefile/GeoJSON/KML/KMZ/CSV. Nothing leaves the browser. The GDAL wasm is ~28 MB, so first load is slow; it's cached after that.

Limits: vector only (no raster/tile packages yet), ~150 MB files because everything is in memory. Symbology (.lyr/.lyrx) isn't converted.

I'd love feedback, especially files that break it.
```
（发之前确认这些技术描述仍然准确，比如 150 MB 上限、28 MB 引擎。）

---

## 4. Geography Realm（可选：给教程作者的补充建议）

- 是什么：老牌 GIS 科普网站（原 GIS Lounge，gislounge.com 现在跳转到 geographyrealm.com）。它有两篇正好讲我们这个主题的教程，Google 排名靠前：
  - https://www.geographyrealm.com/how-to-use-an-esri-layer-package-in-qgis/ （2022-03-18 发布，2024-08-12 小更新；步骤是 Mac 上用 “compress”）
  - https://www.geographyrealm.com/how-to-use-mpkx-files-in-qgis/ （已经写了 7-Zip / Keka 的方法）
- 联系页：https://www.geographyrealm.com/contact/ （我只确认了页面存在；页面上的表单需要浏览器加载，请你打开后看用表单还是邮箱）
- 价值：中等偏低。对方没有义务加链接。只发一次，语气是“读者补充”，不要求加链接。

**文案 4：**
```
Hi, thank you for the "How to Import an Esri Layer Package in QGIS" tutorial; I've pointed several people to it.

One small addition you might find useful for Windows readers: layer packages are 7-Zip archives, so renaming to .zip often gives "The compressed (zipped) folder is invalid"; 7-Zip opens them directly (your MPKX article already mentions this). Packages from ArcGIS Pro (.lpkx) also use p20/p30 version folders rather than v10x.

Disclosure: I'm an independent developer and built a free browser tool for people who can't install anything, GeoUnpack (https://geounpack.com/). It does the extraction and conversion locally, with no upload. Mentioning it only in case it's helpful to your readers; no reply needed.

Best,
Jiayi
```

---

## 5. Geoawesome（可选：投稿作者）

- 是什么：GIS/遥感行业新闻网站。联系页 https://www.geoawesome.com/contact/ 的表单里有 “General question / Become an author / Cooperation / Became a sponsor” 几个选项（已核实）。
- 适合的方式：选 “Become an author”，提议写一篇**有实际内容**的文章，例如 “What's actually inside an Esri layer package (and how to open one with open-source tools)”，文中工具只占一小段并写明作者身份。
- 不适合：选 “Cooperation/sponsor”（那是付费合作）。
- 价值：低到中等，周期长。等前面几项做完再考虑。

**文案 5（表单 Description 栏）：**
```
Hi, I'm Jiayi, an independent developer in Canada. I'd like to propose a practical article: "What's inside an Esri layer package, and how to open one without ArcGIS". It would cover the 7z structure of .lpk/.lpkx/.mpk/.mpkx, the version folders, opening the file geodatabase with QGIS/GDAL (OpenFileGDB), what gets lost (symbology, domains, rasters), and a short note on browser-based options, including one I built (GeoUnpack; I'd disclose that clearly). Happy to adapt to your editorial guidelines.
```

---

## 核实过但不推荐 / 无法核实的渠道

| 渠道 | 结论 | 原因 |
|---|---|---|
| GIS Stack Exchange “community promotion ads” | 不适用 | 帮助页写明免费广告只面向 “open-source projects and non-profit organizations”（https://gis.stackexchange.com/help/promotion ）；GeoUnpack 不是开源项目 |
| Esri Community | 只能答题，不能推广 | 社区规则禁止推广自己的网站（见 `gis-se-and-forums.md`） |
| QGIS 用户邮件列表 qgis-user | 不推荐发推广 | 列表存在（https://lists.osgeo.org/mailman/listinfo/qgis-user ），以前也有人在上面问过 .lpk/.mpk（2016、2021 年的帖子），但我没找到允许工具宣传的规则；以回答问题为主 |
| OSGeo Discourse 的 “announce” 版块 | 不适用 | 说明写着 “Mirror of OSGeo Announce mailing list”，是 OSGeo 官方公告 |
| LinkedIn GIS 群组 | 未列出 | 需要登录才能看到群组和规则，我无法核实哪些群存在、是否允许分享工具。你可以自己搜 “GIS” 群组，入群后先看群规 |
| Reddit r/gis、r/QGIS | 未列出 | 我的网络访问不了 reddit.com；方法见 `gis-se-and-forums.md` 文末 |
| Product Hunt、SaaSHub | 未列出 | 两个网站都拒绝了我的访问（403），无法核实提交规则；而且受众不是 GIS 用户，价值低 |
| GIS 新闻通讯 “提交工具” 栏目 | 未找到 | 搜到的通讯（如 Esri 的、明尼苏达 GIS/LIS 联盟）明确不接受产品宣传或只面向会员；没有找到公开接受工具提交的 GIS 通讯 |
