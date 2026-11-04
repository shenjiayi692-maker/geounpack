# 交接文档：GeoUnpack 项目（2026-11-03）

> 给 Jiayi，也给以后接手的 Claude Code 会话。新开一个会话时，把仓库 `shenjiayi692-maker/geounpack` 接进来，Claude 会先读 `CLAUDE.md` 和这份文档。

---

## 1. 一句话背景
Jiayi 想做“小工具 + 长尾 SEO”的独立产品。经过多轮调研（见 `docs/research/`），选定第一个产品 **GeoUnpack**：在浏览器里打开和转换 Esri 的 .lpk/.lpkx/.mpk/.mpkx/.gdb 文件，不用 ArcGIS，文件不上传。另有两个排队中的产品：**Premiere 工程降级**、**Ableton 12 → 11 降级**（站点 openolder.com，第 6 周以后再做）。

## 2. 已经确定的决定
| 事项 | 决定 |
|---|---|
| 站点名和域名 | GIS：**geounpack.com**；创意软件降级：**openolder.com**（都还没买，正式推广前在 Cloudflare 购买） |
| 托管 | Cloudflare Pages（免费）；GDAL 引擎从 jsDelivr 加载 |
| 收款 | Stripe，开始收费前接入；收费前先咨询会计税务问题（欧盟增值税等），或改用 Paddle |
| 定价（待验证） | 免费：预览 + 导出 1 个图层、≤ 1,000 个要素；付费：USD 7 解锁当前文件 / USD 19 每月 |
| 身份 | 个人名义（“Jiayi，加拿大的独立开发者”）；论坛用 Jiayi 的个人账号，推荐工具时必须声明作者身份 |
| 投入 | Jiayi 每周 5–10 小时；第一年预算 USD 200 |
| 不做 | 付费广告、批量 AI 文章、买外链、上传型服务器处理 |

## 3. 当前状态
- ✅ 技术验证：8 个真实 Esri 文件，服务器端、WebAssembly、真实浏览器三层测试都通过（`docs/research/07-…`）。
- ✅ MVP v0.1（分支 `mvp-v0.1`）：读取、地图预览、5 种格式导出；15 个落地页 + 关于/隐私/许可页；sitemap、robots、llms.txt、结构化数据；预览模式 `NOINDEX=1`。
- ✅ 自动化测试：8/8 个文件、40/40 次导出成功，并用 GDAL 核对要素数和坐标。
- ✅ 部署：https://geounpack.pages.dev（Cloudflare Pages 项目 `geounpack`，连接 GitHub，生产分支 `mvp-v0.1`，环境变量 NODE_VERSION=22、NOINDEX=1、SITE_URL=https://geounpack.pages.dev）。线上测试 6 个样本、30/30 次导出成功。注意：本环境的网络代理会改写授权头，wrangler 直接上传会失败，所以用 Git 集成自动构建。
- ⏳ 收款：未接（`paywall: false`）。
- ⏳ 养号：Jiayi 刚开始注册 GIS Stack Exchange、Reddit。
- ⛔ 不支持：栅格、瓦片、场景包；150MB 以上的文件。


## 3.5 OpenOlder（Premiere 降级）状态（2026-11-04）
- 仓库 `shenjiayi692-maker/openolder`，分支 `demo-v0.1`；Demo 网址 https://openolder.pages.dev（noindex 预览，Cloudflare Pages 项目 `openolder`，连 GitHub 自动部署）。
- 转换逻辑是 prem-down（MIT）的 JavaScript 移植；15 个移植自原项目的单元测试 + 浏览器端到端测试全部通过（含线上）。
- ⏳ 等 Jiayi 按 `openolder/docs/TEST-CHECKLIST.zh.md` 用 Creative Cloud 试用版真机测试；通过后再做完整版（06 计划第一部分 1B）。

## 4. 时间线和检查点
- 第 1–2 周：部署 pages.dev、自测、养号（只答不推广）。
- 第 3 周：买 geounpack.com，接自定义域名，去掉 NOINDEX，提交 Google Search Console 和 Bing 站长工具。
- 第 3–4 周：接 Stripe，开启付费墙。
- 第 4–16 周：每周 2–3 个论坛回答，每月新增 5 个页面。
- 第 6–8 周：openolder（Premiere / Ableton）。
- **第 16 周检查点**：Esri 自然流量 ≥ 300 次/月**并且** ≥ 1 笔付费 → 继续；≥ 1,000 次/月并且有付费 → 做第二阶段（DXF、坐标系转换、栅格）；否则停止投入。

---

## 5. 可以交给 Claude Code 做的事（直接复制“给 Claude 的指令”）

### A. 开发类（Claude 独立完成，你只需审阅和合并）
| # | 任务 | 什么时候 | 给 Claude 的指令（可直接复制） |
|---|---|---|---|
| A1 | 修部署问题 | 部署失败时 | “GeoUnpack 在 Cloudflare Pages 部署失败，这是构建日志：（粘贴）。请修复并推送到 mvp-v0.1。” |
| A2 | 根据试用反馈改界面 | 你试用之后 | “我试用了 GeoUnpack，问题如下：（列出）。请修改、跑一遍浏览器测试、推送。” |
| A3 | 接入 Stripe 收款和付费墙 | 第 3–4 周，你注册好 Stripe 之后 | “请为 GeoUnpack 接入 Stripe：USD 7 解锁单个文件、USD 19/月订阅，按 docs/DEV_NOTES.zh.md 第 6 节执行。我会提供 Stripe 的 Payment Link 或测试密钥。” |
| A4 | 切换到正式域名 | 买好域名后 | “geounpack.com 已经接到 Cloudflare Pages，请检查 SITE_URL、canonical、sitemap，并列出我需要在 Cloudflare 里改的环境变量。” |
| A5 | 新增落地页 | 每月一次 | “这是 Search Console 里最近 28 天有展示的搜索词：（粘贴）。请挑出值得新建页面的 5 个，写进 src/pages.json，构建并推送。” |
| A6 | 第二阶段功能 | 第 16 周后、数据达标时 | “请给 GeoUnpack 加 DXF 导出 / 坐标系转换 / .lpkx 栅格支持（选一个），先在 samples 上测试，测试通过再推送。” |
| A7 | 依赖升级和回归测试 | 每季度 | “请检查 gdal3.js、7z-wasm、leaflet、fflate 有没有新版本，升级后跑完整的浏览器测试，并更新许可页。” |
| A8 | openolder：Premiere 降级 Demo | 第 6 周 | “按 docs/research/06-demo-vs-full-plans.md 第一部分，新建 openolder 仓库，做 Premiere 降级 Demo。仓库地址：（你新建的私有仓库）。” |
| A9 | openolder：Ableton 降级 Demo | 第 7–8 周 | “按 06 计划第三部分做 Ableton 12 → 11 降级 Demo。” |

### B. 推广类（Claude 起草，你审阅后用自己的账号发）
| # | 任务 | 频率 | 给 Claude 的指令 |
|---|---|---|---|
| B1 | 每周挑题并起草回答 | 每周一次 | “请到 GIS Stack Exchange 找本周新的、和 gdb/lpk/mpk/QGIS 打开文件相关的 5 个问题，挑 3 个适合我答的，起草答案（养号期不提工具 / 上线后附带作者声明），并在环境里验证答案中的命令。” |
| B2 | Reddit 回复草稿 | 每周 | “请起草在 r/gis 或 r/QGIS 回复以下帖子的内容：（贴链接或内容）。” |
| B3 | 上线分享帖 | 域名上线时 | “请为 r/gis 写一篇‘我做了一个免费的浏览器工具’的分享帖，先检查该版块关于自我推广的规定。” |
| B4 | 提交工具目录 | 域名上线后一次 | “请准备提交到 awesome-gis、AlternativeTo、OSGeo 资源页所需的文案和截图，并告诉我每个网站的提交步骤。” |
| B5 | 视频脚本 | 上线后一次 | “请写一个 60 秒的 YouTube Shorts 脚本：没有 ArcGIS 怎么打开 .lpk 文件。” |
| B6 | 联系 GIS 课程老师 | 第 2–4 个月 | “请找 20 门在线公开的 GIS 入门课程或大学课程页面，列出联系人，并起草一封简短的英文邮件。” |

### C. 数据和决策类
| # | 任务 | 频率 | 给 Claude 的指令 |
|---|---|---|---|
| C1 | 每周复盘 | 每周日 | “这是本周的数据：Search Console 展示 X、点击 Y，Cloudflare 访问 Z，付费 N 笔。请按 docs/research/05-execution-plan.md 第 8 节的标准帮我复盘，并列出下周 3 件事。” |
| C2 | 第 16 周检查点 | 一次 | “到第 16 周了，数据如下：（粘贴）。请按决策关口给出继续 / 加码 / 停止的建议和理由。” |
| C3 | 竞品监测 | 每月 | “请检查有没有新的在线工具能打开 .lpk/.mpk，以及 MyGeodata 有没有新增支持，结果写进 docs/research。” |
| C4 | 新选题 | 第 16 周后 | “按 docs/research/02-tool-ideas-round1.md 的方法，用搜索联想词和 Stack Exchange 再跑一轮选题。” |

---

## 6. 只能你自己做的事（Claude 做不了）
| 事项 | 原因 |
|---|---|
| 注册和登录各种账号（Cloudflare、Stripe、Google、Bing、Reddit、Stack Exchange） | 需要你的身份和二次验证 |
| 购买域名、付款 | 需要你的银行卡 |
| 在 Cloudflare / Stripe 后台点按钮、填环境变量 | Claude 没有这些后台的权限（可以给你一步步的说明） |
| 用自己的账号在论坛发帖和回复 | 社区规则要求真人、真实身份；而且你要能看懂并对内容负责 |
| 在 Windows/Mac 的真实浏览器里试用 | Claude 只能测无头浏览器 |
| Premiere / Ableton 的真机测试 | 需要安装这些软件 |
| 税务和法律决定 | 需要会计或律师 |
| 最终决定（定价、继续还是停止） | 是你的生意 |

## 6.5 现在马上要做的事：谁来做（2026-11-03）
| # | 事项 | 谁来做 | 怎么交给 Claude |
|---|---|---|---|
| 1 | 部署到 Cloudflare Pages | **两种方式二选一**：① 你在后台按 `docs/research/09-…` 第一节点按钮（15 分钟）；② 交给 Claude：你在 Cloudflare 创建一个 API Token（权限：Account › Cloudflare Pages › Edit），把它和 Account ID 加进云端环境的 Secrets，名称为 `CLOUDFLARE_API_TOKEN`、`CLOUDFLARE_ACCOUNT_ID`；Claude 用 `npx wrangler pages deploy dist --project-name geounpack` 直接部署 | “环境里已经有 Cloudflare 的 API Token，请把 GeoUnpack 以 NOINDEX 预览模式部署到 Cloudflare Pages，并在真实浏览器里测一遍线上网址。” |
| 2 | 部署后的线上测试 | Claude 先在无头浏览器里测；你再在自己电脑的 Chrome / Edge / Safari 各试一次 | “请用 docs/TESTING.md 里的样本文件测试线上网址 https://xxx.pages.dev，报告问题并修复。” |
| 3 | 起草论坛回答 | Claude 起草并验证 → **你**用自己的账号发 | 用第 5 节的 B1 指令 |
| 4 | 注册账号、养号、发帖 | **只能你** | — |
| 5 | Bing / Google 站长工具 | 等买了域名以后，**你**来注册和验证；Claude 可以给步骤 | — |
| 6 | 买域名、接 Stripe | **你**付款和注册；接入代码 Claude 来写（A3、A4） | — |

> 说明：Claude 在云端环境里能访问网络并运行命令，但**没有你的账号密码**。凡是需要“登录你的后台”的事，要么你自己点，要么你创建一个权限受限的 API Token 交给环境（不要把密码或 Token 直接贴在对话里，用环境的 Secrets 功能）。

## 7. 文件地图
| 位置 | 内容 |
|---|---|
| `CLAUDE.md` | 给 Claude 的规则（每次会话自动读取） |
| `docs/HANDOFF.md` | 本文档 |
| `docs/DEV_NOTES.zh.md` | 开发注意事项清单 |
| `docs/TESTING.md` | 测试文件来源、上次测试结果 |
| `docs/research/01–09` | 全部调研、计划、验证报告、部署说明、30 个待回答问题 |
| `docs/answers/` | 论坛回答草稿 |
| `src/` | 网站源码（worker.js 转换、app.js 界面、pages.json 落地页） |
| `scripts/` | 构建脚本、浏览器端到端测试 |

## 8. 注意
- 这个云端环境是临时的。**所有重要文件都已经放进这个 GitHub 仓库**，换会话不会丢。之前放在 `/home/user/french-market-compliance/` 的文档已复制到 `docs/research/`。
- 第 6 题（Opening .lpk in QGIS?）已经因为重复被关闭，不能回答；改答第 1 题（#12974），草稿在 `docs/answers/`。
