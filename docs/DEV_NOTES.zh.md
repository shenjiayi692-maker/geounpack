# 开发注意事项清单（每次开发前必读）
_最后更新 2026-11-03_

## 已定事项
- 站点 A（创意软件降级）：**openolder.com**；站点 B（GIS 文件转换）：**geounpack.com**。先用 Cloudflare Pages 的免费子域名开发，正式推广前再注册域名。
- 收款：**Stripe**，在开始收费之前接入；需要先弄清楚税务问题（见第 6 节）。
- 代码：用户 GitHub 上的私有仓库（geounpack、openolder 各一个）。
- 投入：用户每周 5–10 小时；第一年预算 USD 200。
- 身份：个人名义；论坛使用个人账号。

## 1. 通用原则
- [ ] 文件**只在浏览器本地处理**，不上传服务器；页面上明确写出来。
- [ ] 每个页面都必须是能直接用的工具，不批量生成纯文章页。
- [ ] 域名、品牌名、Logo 里不出现 Adobe、Premiere、Ableton、Esri、ArcGIS；正文可以描述性地提及；页脚写“与 Adobe / Esri / Ableton 无关联，商标归各自所有者”。
- [ ] 每个工具都有“请先备份原文件，转换后请自行检查结果”的提示。
- [ ] 使用的开源库在“关于 / 许可”页注明：gdal3.js（LGPL-2.1，附源码链接）、7-Zip / 7z-wasm（LGPL）、prem-down（MIT，保留版权声明）。
- [ ] 统计只用不需要 Cookie 的方案（Cloudflare Web Analytics）。

## 2. Esri 转换器（geounpack）
### 读取
- [ ] 输入：.lpk、.lpkx、.mpk、.mpkx（都是 7z 压缩包），以及 gdb.zip（普通 zip）。
- [ ] 一个包里常有多个版本的同一个库（v10 和 v108、p12 和 p20）：**只取最新版本的文件夹**，避免图层重复。
- [ ] 包里可能有多个 .gdb，也可能有 .shp，要全部扫描。
- [ ] 同时列出“有几何的图层”和“纯属性表”（关系表、附件表 `__ATTACH`）。
- [ ] 读取每个图层的：名称、要素数、几何类型、坐标系。

### 导出
- [ ] 格式：GeoJSON、Shapefile（打包成 zip）、KML、CSV，**另加 GeoPackage**（推荐格式）。
- [ ] GeoJSON 和 KML 统一转成 WGS84（EPSG:4326）。
- [ ] 纯属性表只提供 CSV 导出。
- [ ] 带 Z 值的几何导出 Shapefile 前先去掉 Z（`-dim XY`），否则会失败。
- [ ] **Shapefile 的限制要提醒用户**：字段名最多 10 个字符、大整数会被截断、单个文件最大 2GB；数据要求精确时推荐 GeoPackage 或 GeoJSON。
- [ ] 复杂多边形打开 GDAL 的跳过重组选项（`OGR_ORGANIZE_POLYGONS=SKIP`），否则很慢。
- [ ] GeoJSON 坐标精度保留小数点后 6 位，减小文件体积。
- [ ] 日期时间字段在 Shapefile 里会降级成日期，需要提示。

### 性能和体验
- [ ] GDAL 引擎（压缩后约 11MB）在用户拖进文件后才加载，显示进度条；浏览器会缓存。
- [ ] 转换放在 **Web Worker** 里跑，避免页面卡死。
- [ ] 第一版文件上限 **150MB**；超过时给出友好提示。
- [x] 处理中显示已用秒数；超过 40MB 的文件提示“可能需要 1–2 分钟，请保持页面打开”（`bigFileMB`）。
- [ ] 只导出用户勾选的图层，不默认全部导出。
- [ ] 实测参考：0.7MB 的文件约 1.3 秒；98MB 的文件约 50 秒，内存约 1.2GB。
- [ ] 内存不足时捕获错误，提示用户“换用更小的文件，或者一次只导出一个图层”。

### 免费与付费
- [ ] 免费：预览不限；导出 1 个图层，且不超过 1,000 个要素。
- [ ] 付费：一次性 USD 7 解锁当前文件（7 天有效）；或 USD 19/月。价格在第 4 个月按数据调整。
- [ ] 授权在浏览器本地保存，不需要注册账号。

### 待测
- [ ] .lpkx 栅格包（例如 Venice_Elevation_Data，> 160MB）。
- [ ] 直接上传 gdb.zip。
- [ ] Windows、Mac 和低内存设备上的实际表现。

## 3. Premiere 降级（openolder）
- [ ] 核心逻辑参考 prem-down（MIT）：2026 版省掉了一些字段，要补回去，再改项目版本号。动手前核对它的 LICENSE 文件和版本对照表。
- [ ] 文件处理流程：gzip 解压 → 修改 XML → 重新压缩。
- [ ] 必须在用户电脑上真机测试（Creative Cloud 7 天试用，**等 Demo 做好再开**，记得到期前取消）。
- [ ] 测试用例：空工程、多序列、特效和字幕、新遮罩功能、> 50MB。
- [ ] 通过标准：2026 → 2025 能打开的比例 ≥ 80%。
- [ ] 页面上列出降级后会丢失的 2026 新功能。

## 4. Ableton 降级（openolder 的子页面，第 6 周以后）
- [ ] 先核对 live_set 的许可证。
- [ ] .als 也是 gzip 压缩的 XML；需要改版本头。
- [ ] 识别 Live 12 独有的设备（以 Ableton 官方更新日志为准），提示用户先冻结并合并这些音轨。
- [ ] 测试需要 Live 11 和 12（试用版、朋友，或者在 r/ableton 招募）。

## 5. SEO 与 GEO（被 AI 引用）
- [ ] 每个“格式 → 格式”一个页面；标题、URL、H1 用精确的搜索词。
- [ ] 每页包含：能用的工具 + 3–5 步的使用说明 + 常见问题（直接回答问题本身）。
- [ ] 结构化数据：SoftwareApplication、FAQPage、HowTo。
- [ ] robots.txt **允许** AI 爬虫（GPTBot、PerplexityBot、Google-Extended 等）；提供 llms.txt。
- [ ] 同时提交 Google Search Console 和 **Bing Webmaster Tools**（ChatGPT 的联网搜索依赖 Bing）。
- [x] 加对比表格（本工具 / MyGeodata / QGIS 手动办法），AI 摘要很喜欢引用表格。（mygeodata-alternative、open-lpk-in-qgis 两页）
- [x] “关于”页写清作者、原理、限制、联系邮箱 hello@geounpack.com（**需要在 Cloudflare Email Routing 设置转发**）；所有页面带 og 分享预览。
- [ ] 站点地图、页面加载速度、移动端适配。
- [x] 2026-11-23 多图层导出：一个图层失败不再让整批失败，其余图层照常打包下载，提示里写明失败图层、格式和 GDAL 报错原文，并建议换格式或发文件给我们。起因：11-23 有用户在 /mpk-viewer/ 打开 10–50 MB 的 .mpk 13 次，导出失败 35 次（原因只记了 other），成功 10 次。用 8 个真实样本（含同名图层、附件表、Z 值、真曲线、75 MB 文件）反复导出均无法复现。导出和预览失败的统计改为 `类别:格式:几何类型`（类别为 crs/geometry/field/exists/js/read/memory/other，不记录 GDAL 原文，因为其中可能含图层名）；部分成功记为 `export_ok` 的 `格式:multi:partial`。
- [x] 2026-11-27 文件超过 150 MB 上限时，统计从只记 `too_big` 改为 `too_big:扩展名:超出分段`（150-300mb / 300-500mb / 500mb-1gb / gt1gb），用来判断提高上限能不能留住这些用户。起因：11-24 有 3 次 too_big，不知道超出多少。不记文件名。
- [x] 2026-11-22 打开失败时，统计里多记扩展名、文件头类型（7z/zip/rar/gzip/pdf/xml/other）和大小区间，格式 `原因:扩展名:文件头:大小`；失败提示里请用户把文件发到 hello@geounpack.com。起因：上线首日解包失败 4 次、成功 3 次。
- [x] 2026-11-21 匿名使用统计：前端 `track()` 用 sendBeacon 发到 `/api/e`（`functions/api/e.js`，Cloudflare Pages Function），按“日期 + 网站 + 页面 + 事件 + 简短类别”累加到 D1 数据库 `site-events` 的 `counts` 表（两个网站共用，生产环境绑定名 `DB`）。只接受白名单事件，不存文件名、图层名、IP 或 Cookie；隐私页已写明。新增事件要同时改 `functions/api/e.js` 的白名单（两个仓库各一份）。
- [x] 2026-11-21 根据 Search Console 第一周数据：新增 KMZ 导出（浏览器里把 KML 压成 doc.kml）；新增 gdb-to-kmz、mpkx-viewer、lpkx-viewer 三页（“mpkx”“lpkx file”“gdb to kmz”有展示但没有对应页面）；改写 open-lpk-in-qgis、open-lpk-without-arcgis、mpk-viewer、lpk-viewer 的标题和描述（展示多、点击少）。改过的页面在 pages.json 里带 `updated` 字段。4 周后对比这几页的点击率。
- [x] 2026-11-21 新增 3 个“报错信息”落地页（用户会把报错原文复制到 Google）：error-reading-package-contents（ArcMap“Invalid package / Error reading package contents.”）、qgis-gdb-not-a-valid-data-source（QGIS“… is not a valid or recognized data source”）、compressed-zipped-folder-is-invalid-lpk（把 .lpk 改名 .zip 后 Windows 提示“压缩文件夹无效”）。每条报错原文都在 Esri 支持文章 / QGIS 问题跟踪 / 社区帖子里核对过；页面写明哪些情况救不了（只有栅格、只引用服务器数据、文件下载不完整）。open-lpk-in-qgis、open-lpk-without-arcgis 也补了报错原文。
- [x] 2026-11-13 审查后的改动：`404.html`（避免软 404）；每个落地页在 `src/pages.json` 的 `body` 字段里有 110–210 词的独有内容（新增页面时必须写 `body`，不能只写导语）；`layer-package-to-shapefile` 并入 `lpk-to-shapefile`（`public/_redirects` 做 301）；分享预览图 `public/og.png`；标题超过 60 字符时自动去掉品牌后缀；sitemap 的 lastmod 用内容更新日期（`scripts/build.mjs` 里的 `CONTENT_UPDATED`，或每页的 `updated` 字段），**改了页面内容要手动更新这个日期**。
- [x] 2026-11-13 修复：引擎崩溃后按钮恢复可用；同一个文件可以重新选择；同名图层导出不再互相覆盖；导出文件名保留中文等非英文字符；隐私页写明 jsDelivr；工具下方加了“文件打不开？告诉我们”的邮件链接。

## 6. 收款与税务（开始收费前完成）
- [ ] Stripe 账号、产品和价格、Checkout 结账页、成功后的授权发放。
- [ ] 退款政策页、条款页、隐私政策页。
- [ ] **税务提醒**：直接用 Stripe，各国的销售税和增值税要自己负责。欧盟对向个人消费者销售数字服务的非欧盟卖家，从第一笔起就有增值税义务；加拿大 GST/HST 有小商户门槛。开始收费前请咨询会计，或者改用替你处理税务的平台（Paddle、Lemon Squeezy）。

## 7. 上线前检查
- [ ] 正式域名、HTTPS、站点地图。
- [ ] Search Console + Bing Webmaster。
- [ ] 结账流程实测（含退款）。
- [ ] 移动端和桌面端检查；大文件和错误提示检查。
- [ ] 隐私、免责、许可、非关联声明。
