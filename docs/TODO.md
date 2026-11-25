# GeoUnpack 待办清单

这是 geounpack 唯一的待修、待办清单。任何会话开工前先读这里；做完一项，就把状态和日期写回来。
策略、扫词规则和候选词不放在这里，放在 Jiayi 的《新词工具站执行手册》（Claude 文档）里。

每条写清楚：问题、证据、状态、下一步、日期。完成的项移到“最近完成”，只保留最近一个月的。

## 待办

### 1. /mpk-viewer/ 导出和预览失败
- 证据：D1 统计，2026-11-23 当天 export_fail（other）35 次、preview_fail（other）4 次，同一天打开 .mpk 13 次。
- 状态：11-23 已加容错和细分统计（a775048），一个图层失败不再中断整个导出。用 8 个真实样本测试，没能复现问题。
- 下一步：等新的失败记录出现分类（crs、geometry、field 等）后，按最常见的类别修；有用户发来的文件就先用它复现。
- 日期：2026-11-24 记录

### 2. 有展示、点击很少的页面：12-19 前后做 4 周对比
- 证据：Search Console 3 个月数据（截至 11-21）：mpkx 有 25 次展示、0 次点击；gdb to kml 约 5 次、gdb to csv 2 次、gdb to shp 2 次展示，都没有点击。
- 状态：这些词都已经有对应页面（mpkx-viewer、gdb-to-kml、gdb-to-csv、gdb-to-shapefile）。mpkx-viewer 是 11-21 才建的，大部分展示发生在建页之前，现在下结论太早。
- 下一步：12-19 前后按 DEV_NOTES 11-21 那条做 4 周对比，展示多、点击少的页面再改标题和描述。
- 日期：2026-11-24 记录

### 3. Gmail 过滤器：让用户反馈不进垃圾邮件（只能 Jiayi 做）
- 背景：网站上的反馈邮件现在都带固定主题标签 `[GeoUnpack feedback]` / `[OpenOlder feedback]`（推销邮件不会用），方便和推销信区分。
- 下一步：Jiayi 在 Gmail 建过滤器：主题 `"GeoUnpack feedback" OR "OpenOlder feedback"` → 一律不发送到垃圾邮件、标签“用户反馈”、标记为重要；再用另一个邮箱点网站上的 Tell us 链接测一次（用同一个 Gmail 发会被合并到“已发送”，看不到）。
- 日期：2026-11-24 记录

## 最近完成
- 2026-11-25 open-mpk-in-qgis 不另建页：已核对 open-lpk-in-qgis 的步骤对 .mpk 完全适用（同样是 7-Zip 压缩包，里面是 .gdb），页面的导语、对比表和手动步骤都已写明 .lpk / .mpk。为不干扰 12-19 的 4 周标题对比，本次不改这一页；对比后如果“mpk qgis”类展示明显增长，再考虑在标题或 FAQ 里点名 .mpk。
- 2026-11-25 用 IndexNow 把站点地图里全部 24 个网址推送给 Bing（经浏览器 GET 推送，抽查 gdb-to-kmz 返回 200）。
- 2026-11-25 推广：Awesome-Geospatial（Tools 节）和 awesome-gis（SaaS 节）各准备好一个加 GeoUnpack 的 PR，分支 add-geounpack 已推到 Jiayi 的 fork，PR 页面已填好，等 Jiayi 点 Create pull request。
- 2026-11-24 决定（Jiayi）：暂不加 Google Analytics / Clarity（会用 Cookie，要改隐私页并征得欧盟用户同意）。访问量继续看 Cloudflare Web Analytics，工具使用看 D1。以后要加，连同隐私页和同意提示一起改。
- 2026-11-24 失败提示后面加“Email us the file”链接，主题带 `[GeoUnpack feedback]`，正文自动填好页面和报错；工具下方的 Tell us 链接改用同样的主题（74c19c9）。
- 2026-11-24 查看了 hello@geounpack.com 转发的 10 封邮件：都是域名推销，没有用户发来的文件。
- 2026-11-23 多图层导出：一个图层失败不再中断整个导出，失败统计按类别细分（a775048）。
