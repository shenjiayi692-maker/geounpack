# GeoUnpack 待办清单

这是 geounpack 唯一的待修、待办清单。任何会话开工前先读这里；做完一项，就把状态和日期写回来。
策略、扫词规则和候选词不放在这里，放在 Jiayi 的《新词工具站执行手册》（Claude 文档）里。

每条写清楚：问题、证据、状态、下一步、日期。完成的项移到“最近完成”，只保留最近一个月的。

## 待办

定时提醒（都发回 GeoUnpack 对话）：12-2 周检（PR + D1，之后每周二续）、12-6 图书馆跟进草稿、12-19 4 周标题对比。

### 1. /mpk-viewer/ 导出和预览失败
- 证据：D1 统计，2026-11-23 当天 export_fail（other）35 次、preview_fail（other）4 次，同一天打开 .mpk 13 次。
- 状态：11-23 已加容错和细分统计（a775048），一个图层失败不再中断整个导出。用 8 个真实样本测试，没能复现问题。
- 11-27 查 D1（11-22 到 11-26）：11-23 之后 /mpk-viewer/ 和 /mpk-to-shapefile/ 再没有任何记录（没人再打开 .mpk），所以还没有分类后的失败数据，无从修。11-23 的 35 次失败集中在同一天、13 次打开，很可能是同一个人反复重试。
- 同期其他打开失败（少量，供参考）：首页 too_big（超过 150 MB）3 次；/lpk-viewer/ 50–150 MB 的 .lpk 里没有矢量图层 2 次；gdb、kmz、空 zip 解包失败各 1 次。too_big 从 11-27 起按 `too_big:扩展名:超出分段` 记录（见下方最近完成）。
- 下一步：不变，继续等 .mpk 的分类失败记录；有用户发来的文件就先用它复现。下次查 D1 时顺便看这一项。
- 日期：2026-11-27 更新

### 2. 有展示、点击很少的页面：12-19 前后做 4 周对比
- 证据：Search Console 3 个月数据（截至 11-21）：mpkx 有 25 次展示、0 次点击；gdb to kml 约 5 次、gdb to csv 2 次、gdb to shp 2 次展示，都没有点击。
- 状态：这些词都已经有对应页面（mpkx-viewer、gdb-to-kml、gdb-to-csv、gdb-to-shapefile）。mpkx-viewer 是 11-21 才建的，大部分展示发生在建页之前，现在下结论太早。
- 下一步：12-19 前后按 DEV_NOTES 11-21 那条做 4 周对比，展示多、点击少的页面再改标题和描述。
- 日期：2026-11-24 记录

### 4. 大学图书馆外联：12-6 跟进
- 状态：11-22 已给 GWU、UNT、Manitoba、UBC、McMaster 发出 5 封（`docs/promotion/geounpack/libguides-outreach.md` 第 1–5 行，表格已记日期）。
- 下一步：12-6 查 Gmail，只给没回复的几家用文件里的跟进模板在原线程起草回复，**不发送**，交 Jiayi 检查；每家只跟进这一次。回复“no thanks”的不再联系。之后把结果（已收录 / 拒绝 / 无回复）写回表格。
- 注意：12-6 有一个提醒会发到原来那个混合对话（现在是 OpenOlder 对话）里，以这里的记录为准。GeoUnpack 对话另有 12-6 11:00 的提醒，会先查草稿箱避免重复起草。
- 日期：2026-11-27 记录

### 5. Awesome 列表 PR 和其他外链
- 状态：11-25 Jiayi 已提交两个 PR：sacridini/Awesome-Geospatial（Tools 节）和 sshuair/awesome-gis（SaaS 节），分支都是她 fork 里的 `add-geounpack`。
- 下一步：每周看一次 PR 有没有评论或被合并；维护者要求改动就在同一分支上改。合并后记在这里。
- 日期：2026-11-27 记录

### 6. 外链渠道（每周做一项，PLAYBOOK 6.2）
- 背景：`docs/promotion/geounpack/other-channels.md`（11-21 核实）准备好了文案：① QGIS Canada 用户组自我介绍（1A）→ 1–2 周后问能否做 5 分钟演示（1B）；② Mapstodon 注册、养一周再发工具介绍；③ Show HN（只发一次，要有 1–2 小时守着回复）；④ HANDOFF B4 的 AlternativeTo 收录。Geography Realm、Geoawesome 可选。
- 状态（11-28 核查）：④ AlternativeTo 已提交（11-13 注册，11-15 进普通审核队列，11-22 最后一封提醒：队列几千个、可能很久不审，可付一次性费用插队，1–2 个工作日审，审前可全额退款）。① QGIS Canada、② Mapstodon、③ Show HN 都没找到记录（OSGeo Discourse、Mapstodon、HN 搜不到 geounpack，Gmail 里也没有这几个网站的注册邮件），按没做处理。
- 11-28 Jiayi 决定：AlternativeTo 不付费插队，留在普通队列。其余按 ①→③ 每周一项，Claude 每次先核实文案和规则还适用，发帖由 Jiayi 点发送。
- 11-28：① 的文案 1A 已复核（帖子开放、规则没变），城市已填，另加了法语版，在 other-channels.md。等 Jiayi 用自己的 OSGeo 账号发；发了告诉 Claude，1–2 周后再看要不要发 1B。
- 日期：2026-11-28 记录

### 7. 相邻格式页面：第二批（等第一批收录后再做）
- 背景：11-28 按选词线的《页面路线图-geounpack-2026-11-28》（Jiayi 电脑 ~/Projects/哥飞知识库/）上线第一批 5 页：kml-to-shapefile、kmz-to-shapefile、kmz-to-kml、shapefile-to-kml、shapefile-to-kmz。这些词 CPC 多为 0，价值在于把站做成 GIS 文件一站式入口、带动已有页面。
- 第二批候选：kml-to-gpx / gpx-to-kml（kml to gpx 480/19、gpx to kml 320/12，需要加 GPX 输入和输出；togeojson 已能读 GPX）、kml-to-csv（320/7）、csv-to-shapefile（170/10，需要读带坐标列的 CSV）、how to open a kml file（880/10）、shapefile viewer（210/18）。“mpg to kml”是行车记录仪轨迹，不做。
- 下一步：按 PLAYBOOK 第 5 节“新站先放一批、收录有点击再放下一批”，12-19 对比时一并看这 5 页的收录和展示（site:geounpack.com/kml、Search Console）；收录正常再做第二批。
- 日期：2026-11-28 记录

## 最近完成
- 2026-11-28 IndexNow 推送了 5 个新页面和改过的 about、licenses、lpk-to-shapefile、lpkx-to-shapefile（浏览器 GET）。上线时发现浏览器缓存会让新页面配旧 app.js/worker，已改成所有脚本和样式带内容哈希，线上用 KMZ 实测打开正常（拦截了统计，没写入假数据）。
- 2026-11-28 KML / KMZ / Shapefile 输入上线，新增 5 个页面（见第 7 项和 DEV_NOTES 11-28）。
- 2026-11-28 Search Console 周查（PLAYBOOK 1.5），过去 28 天：26 次点击、595 次展示、平均排名 8。25 个查询词都已有对应页面（错拼如 gdp to kml、lplx、lpkz 落在现有页面上）；唯一没有专页的是“how to open mpk file (in qgis / arcgis pro)”，合计约 5 次展示，按 11-25 的决定等 12-19 对比后再看。本周不新建页面，也不改标题。点击主要来自 mpk-to-shapefile（6）、gdb-to-kmz（4）、mpk-viewer（3）。
- 2026-11-28 main 分支同步到 mvp-v0.1（用合并提交，没有强推；main 上有一条 11-28 直接提交的 survey.lpk 示例，mvp-v0.1 上已有同样内容）。以后提交都推到 mvp-v0.1，再同步 main。
- 2026-11-27 About 页加了一行“Other tools by the same developer: Find Shutter Count …”，链接 https://findshuttercount.com/（正常 follow 链接，带 title）。只此一处，单向（findshuttercount 不回链），不是站群互链。测试：LOCAL_GDAL=1 build + smoke（本次只有生成的 curves_gdb.zip 样本，ArcGIS Online 样本下载被网络拦截）failures: 0。
- 2026-11-27 GitHub 上每次提交都有一个“Workers Builds: geounpack”检查失败：来源是 11-3 误建的同名 Worker（不是网站用的 Pages 项目），没有域名和路由，部署命令 `npx wrangler preview` 缺配置所以每次都失败。按 Jiayi 的选择断开了它的 Git 连接（Worker 保留，不再构建）。网站一直由 Pages 项目 geounpack 部署，不受影响。同日在线上确认了 too_big 新统计生效（拦截 sendBeacon 测试，未写入真实数据）。
- 2026-11-27 超过 150 MB 的打开失败改为按扩展名和超出大小分段统计（150-300mb / 300-500mb / 500mb-1gb / gt1gb），以后据此判断要不要提高上限。
- 2026-11-27 Gmail 过滤器已建好（Jiayi）：主题含 GeoUnpack / OpenOlder feedback 的邮件不进垃圾邮件、加“用户反馈”标签、标为重要。
- 2026-11-27 OpenOlder 的推广文档搬到 openolder 仓库，这里只留指路说明。以后 OpenOlder 的事只在 openolder 仓库和 OpenOlder 对话里做。
- 2026-11-25 open-mpk-in-qgis 不另建页：已核对 open-lpk-in-qgis 的步骤对 .mpk 完全适用（同样是 7-Zip 压缩包，里面是 .gdb），页面的导语、对比表和手动步骤都已写明 .lpk / .mpk。为不干扰 12-19 的 4 周标题对比，本次不改这一页；对比后如果“mpk qgis”类展示明显增长，再考虑在标题或 FAQ 里点名 .mpk。
- 2026-11-25 用 IndexNow 把站点地图里全部 24 个网址推送给 Bing（经浏览器 GET 推送，抽查 gdb-to-kmz 返回 200）。
- 2026-11-25 推广：Awesome-Geospatial（Tools 节）和 awesome-gis（SaaS 节）各准备好一个加 GeoUnpack 的 PR，分支 add-geounpack 已推到 Jiayi 的 fork，PR 页面已填好，等 Jiayi 点 Create pull request。
- 2026-11-24 决定（Jiayi）：暂不加 Google Analytics / Clarity（会用 Cookie，要改隐私页并征得欧盟用户同意）。访问量继续看 Cloudflare Web Analytics，工具使用看 D1。以后要加，连同隐私页和同意提示一起改。
- 2026-11-24 失败提示后面加“Email us the file”链接，主题带 `[GeoUnpack feedback]`，正文自动填好页面和报错；工具下方的 Tell us 链接改用同样的主题（74c19c9）。
- 2026-11-24 查看了 hello@geounpack.com 转发的 10 封邮件：都是域名推销，没有用户发来的文件。
- 2026-11-23 多图层导出：一个图层失败不再中断整个导出，失败统计按类别细分（a775048）。
