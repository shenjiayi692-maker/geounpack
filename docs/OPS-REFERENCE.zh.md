# 运维参考：两个网站的实际配置（2026-11-23 从 Cloudflare 读取）

新网站照着这份配置。本仓库是公开的，所以这里不写任何个人信息、密码或密钥。

---

## 1. Google Search Console

- **账号**：Jiayi 本人的 Google 账号（具体是哪个邮箱，见她自己的记录，不写在公开仓库里）。两个网站都用 **网域资源**（Domain property）验证，验证方式是 DNS 里的 TXT 记录：
  - geounpack.com：`google-site-verification=TJ9WAVlSfmjgdPSMe1UBjcbXOewLvXUhFOKsUG7Z3aw`
  - openolder.com：`google-site-verification=ecERBljwnplvtvhGZZvWeOtef5GLF9s4C1UjuGtQSvU`
- **网域资源的注意点**：提交 sitemap 时要填完整网址（`https://geounpack.com/sitemap.xml`），只填 `sitemap.xml` 会显示无效。切换网站要用左上角的资源下拉框。
- **Claude 看不到 Search Console**：数据只能由 Jiayi（或 Chrome 插件在她已登录的浏览器里）导出，再贴给 Claude。
- **Bing**：不需要登录，Claude 通过 IndexNow 推送网址（见第 2 节的密钥文件）。

### 最近一次数据（过去 28 天，截至约 2026-11-19，由 Jiayi 导出）

**geounpack.com，按网页**（总计：点击 10，展示 239，点击率 4.2%，平均排名 7.8）

| 网页 | 点击 | 展示 | 点击率 | 平均排名 |
|---|---|---|---|---|
| /mpk-to-shapefile/ | 4 | 12 | 33.3% | 5.9 |
| /mpk-viewer/ | 1 | 40 | 2.5% | 9.5 |
| /lpk-viewer/ | 1 | 34 | 2.9% | 6.8 |
| /lpkx-to-shapefile/ | 1 | 22 | 4.5% | 8.9 |
| /lpk-to-shapefile/ | 1 | 14 | 7.1% | 9.5 |
| /lpk-to-kml/ | 1 | 7 | 14.3% | 6.9 |
| /lpk-to-geojson/ | 1 | 6 | 16.7% | 3.3 |
| /open-lpk-in-qgis/ | 0 | 49 | 0% | 6.7 |
| /open-lpk-without-arcgis/ | 0 | 28 | 0% | 9.2 |
| /gdb-to-kml/ | 0 | 16 | 0% | 8.0 |
| /gdb-to-csv/ | 0 | 10 | 0% | 8.2 |
| /gdb-to-geojson/ | 0 | 9 | 0% | 5.3 |
| /（首页） | 0 | 9 | 0% | 11.9 |
| /gdb-to-shapefile/ | 0 | 4 | 0% | 8.8 |
| /mygeodata-alternative/ | 0 | 1 | 0% | 7.0 |

**openolder.com，按网页**（点击合计 14）

| 网页 | 点击 | 展示 | 点击率 | 平均排名 |
|---|---|---|---|---|
| /（首页） | 6 | 33 | 18.2% | 10.8 |
| /premiere-2026-to-2023/ | 3 | 25 | 12% | 9.6 |
| /ableton-12-to-11/ | 2 | 34 | 5.9% | 8.0 |
| /premiere-2026-to-2025/ | 1 | 51 | 2% | 8.1 |
| /premiere-2026-to-2024/ | 1 | 27 | 3.7% | 9.4 |
| /about/ | 1 | 7 | 14.3% | 2.7 |
| /open-premiere-project-in-older-version/ | 0 | 34 | 0% | 22.3 |
| /premiere-production-downgrade/ | 0 | 31 | 0% | 27.0 |
| /premiere-xml-vs-project-downgrade/ | 0 | 21 | 0% | 37.6 |
| /project-saved-in-newer-version/ | 0 | 5 | 0% | 9.0 |
| /licenses/ | 0 | 1 | 0% | 4.0 |

基于这份数据，2026-11-21 改写了“展示多、点击 0”页面的标题（open-lpk-in-qgis、open-lpk-without-arcgis、mpk-viewer、lpk-viewer、premiere-2026-to-2025 等），并为有展示但没页面的词新建了 mpkx-viewer、lpkx-viewer、gdb-to-kmz、prproj-to-xml。**下次导出时对比这些页面的点击率**。查询词表见当时的对话记录；注意 Google 会隐藏低搜索量的查询词，所以“查询”表的合计总是小于“网页”表。

---

## 2. Cloudflare 配置

账户：免费套餐。Account ID `e9fa03a033b742cfdd7f22770fed46d7`（不是密钥）。两个域名都在这个账户下，名称服务器为 `bristol.ns.cloudflare.com` / `craig.ns.cloudflare.com`。

### Pages 项目

| 设置 | geounpack | openolder |
|---|---|---|
| 连接的 GitHub 仓库 | shenjiayi692-maker/geounpack | shenjiayi692-maker/openolder |
| 生产分支 | `mvp-v0.1`（`main` 同步为相同内容） | `demo-v0.1`（`main` 同步为相同内容） |
| 预览部署 | 关闭（none） | 关闭（none） |
| 构建命令 / 输出目录 | `npm run build` / `dist` | `npm run build` / `dist` |
| 自定义域名 | geounpack.com、www.geounpack.com（www 301 到根域名） | openolder.com、www.openolder.com |
| 生产环境变量 | `NODE_VERSION=22`、`SITE_URL=https://geounpack.com` | `NODE_VERSION=22`、`NOINDEX=0`、`SITE_URL=https://openolder.com` |
| 预览环境变量 | `NODE_VERSION=22`、`NOINDEX=1`、`SITE_URL=https://geounpack.pages.dev` | 无 |
| D1 绑定（仅生产） | `DB` → site-events | `DB` → site-events |
| 兼容日期 | 2026-11-03 | 2026-11-04 |

注意两个项目的 `NOINDEX` 默认值相反：geounpack 不设就是正常收录，openolder 必须显式设 `NOINDEX=0` 才会收录。新站统一成“不设 = 正常收录”，预览环境设 `NOINDEX=1`。

`*.pages.dev` 副本由仓库里的 `public/_headers` 加 `X-Robots-Tag: noindex`，避免和正式域名抢收录。

部署方式：只用 GitHub 自动部署。**不要用 `wrangler pages deploy`**：这个云端环境的代理会改写授权头，wrangler 直接上传会失败。推送后用 API 查看部署状态，曾经出现过卡在 clone_repo 一个多小时、最后失败的情况。

### R2（存放超过 25 MB 的文件）

- 存储桶 `geounpack-engine`（Standard，免费额度内）。
- 自定义域名 `cdn.geounpack.com`（SSL 和归属都已生效）。
- CORS：允许任何来源 GET/HEAD，缓存 86400 秒。
- 内容：`gdal3.js@2.8.1/` 下的 `gdal3.js`、`gdal3WebAssembly.wasm`（28 MB）、`gdal3WebAssembly.data`。上传时设置 `cache-control: public, max-age=31536000, immutable` 和正确的 content-type。
- 网页代码先从 `cdn.geounpack.com` 加载，失败时自动改用 jsDelivr。
- 原因：Cloudflare Pages 单个文件上限 25 MB。

### D1（匿名使用统计）

- 数据库 `site-events`，ID `4bb2559f-4c6d-4aff-aa0e-cdb1bcd32273`，两个网站共用。
- 表结构：

```sql
CREATE TABLE counts (day TEXT NOT NULL, site TEXT NOT NULL, page TEXT NOT NULL,
  event TEXT NOT NULL, detail TEXT NOT NULL, n INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (day, site, page, event, detail));
```

- 写入：网页用 `navigator.sendBeacon('/api/e', …)` 发到 Pages Function `functions/api/e.js`，按“日期 + 网站 + 页面 + 事件 + 简短类别”累加次数。只接受白名单事件、只接受来自本站页面的请求；不存 IP、文件名、文件内容或 Cookie。新增事件要同时改两个仓库里的白名单。
- 绑定方法（新站）：Pages 项目 → 设置 → 绑定 → D1 → 变量名 `DB`，只绑生产环境。也可以用 API `PATCH /accounts/{id}/pages/projects/{name}`，body 为 `{"deployment_configs":{"production":{"d1_databases":{"DB":{"id":"…"}}}}}`。改完要核对环境变量没被清掉。

### 邮件和其他

- 邮件：两个域名都开了 Cloudflare Email Routing（MX 指向 `route*.mx.cloudflare.net`，SPF 已设）。`hello@geounpack.com`、`hello@openolder.com` 转发到 Jiayi 的私人邮箱。
- IndexNow 密钥文件（推送网址给 Bing）：geounpack 是 `public/5587c03b748a9e37e8f97f3dddab1788.txt`，openolder 是 `public/2c9e46a1e3d28b37d291a0905bccea89.txt`。
- Cloudflare Web Analytics（不用 Cookie 的访问统计）：由 Pages 自动注入。Claude 当前的 Cloudflare 授权**读不到**它的数据（缺少分析权限），Jiayi 在后台 Analytics 页查看。
- 安全 → Bots：“AI Labyrinth” 和 “Bot fight mode” 保持关闭，不要屏蔽 AI 爬虫（2026-11-14 用 GPTBot、ClaudeBot、PerplexityBot、bingbot 实测均可访问）。
- 账户里还有一个名为 `geounpack` 的 Worker（2026-11-03 由后台模板创建），两个网站都没用到，待 Jiayi 确认后删除。另一个 Worker `storyme-gemini-proxy` 与这两个网站无关。

---

## 3. 怎么看 D1 里的统计

### 方法 A：直接问 Claude（推荐）

在对话里说“看一下两个网站的使用数据”。Claude 通过这个环境里已连接的 Cloudflare 授权调用 D1 查询接口（`POST /accounts/{account}/d1/database/{db}/query`，body `{"sql": "…"}`），不需要密钥。每周一的自动准备包也会这样查。

**权限要提前确认**：新环境里先跑一次 `SELECT count(*) FROM counts`。2026-11-21 确认过 D1 可读写；Web Analytics 和 DNS 记录读不了。

**测试产生的计数要扣掉**：上线前后用真实浏览器在线上测试，会写入真实计数。做法是测试前后各拍一次快照，按差值减回去，然后删掉 n ≤ 0 的行。

### 方法 B：Jiayi 在 Cloudflare 后台自己看

Cloudflare 后台 → 左侧 “存储和数据库”（Storage & Databases）→ D1 SQL Database → `site-events` → “控制台”（Console），粘贴下面的查询语句运行。

```sql
-- 最近 7 天，每个网站每种事件的总数
SELECT site, event, SUM(n) AS times FROM counts
WHERE day >= date('now', '-7 day') GROUP BY site, event ORDER BY site, times DESC;

-- 最近 7 天，转换成功最多的页面（哪个页面来的用户真的在用）
SELECT site, page, SUM(n) AS conversions FROM counts
WHERE event IN ('export_ok', 'convert_ok') AND day >= date('now', '-7 day')
GROUP BY site, page ORDER BY conversions DESC;

-- geounpack 打开失败的明细（原因:扩展名:文件实际格式:大小）
SELECT day, detail, SUM(n) AS times FROM counts
WHERE site = 'geounpack.com' AND event = 'open_fail'
GROUP BY day, detail ORDER BY day DESC, times DESC;

-- openolder 用户上传的 Premiere 版本、目标版本
SELECT event, detail, SUM(n) AS times FROM counts
WHERE site = 'openolder.com' AND event IN ('analyze_ok', 'convert_ok')
GROUP BY event, detail ORDER BY times DESC;
```

### 事件含义

| 网站 | 事件 | detail（类别）示例 |
|---|---|---|
| geounpack | `open_ok` 打开成功 | `mpk:lt1mb`（扩展名:大小区间） |
| geounpack | `open_fail` 打开失败 | `unpack:lpk:rar:lt1mb`（原因:扩展名:文件实际格式:大小）；`too_big` |
| geounpack | `export_ok` / `export_fail` | `gpkg:single`、`geojson:multi`；失败为原因 |
| geounpack | `preview_fail`、`engine_fail`、`crash` | 原因 |
| openolder | `analyze_ok` 识别成功 | `single:27`、`batch:2026`、`production:2025`（方式:源版本） |
| openolder | `analyze_fail` | `not_project`、`no_older`、`error` |
| openolder | `convert_ok` / `convert_fail` | `single:2026`（方式:目标版本）；`partial`、`error` |
| openolder | `versions_csv` 下载版本清单 | `n4`（文件数） |
| openolder | `als_*` | Ableton 页面 |

早期（2026-11-22 之前）的 openolder 记录里，Premiere 27 显示为 `version46`，因为当时还没把 46 标为 “27”。
