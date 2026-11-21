# GEO 监测表：AI 回答里有没有引用我们（geounpack.com + openolder.com）

## 中文摘要：这是什么、你要做什么
- “GEO”指的是：当人们在 ChatGPT、Perplexity、Google AI 概览等 AI 工具里提问时，AI 的回答有没有提到、链接到我们的网站。越来越多人不再点 Google 的蓝色链接，而是直接看 AI 的回答，所以要定期检查。
- 这里有两个网站各 **10 个固定问题**（英文，模仿真实用户的问法），一张记录表，以及“怎么看结果”“没被引用怎么办”。
- **你要做的事（每月 1 次，约 60–90 分钟）：**
  1. 每月第一个周一，按下面的顺序把 20 个问题分别问 4 个 AI 工具（共 80 次）。时间不够时，至少做 **Perplexity + Google**（这两个最常显示来源链接）。
  2. **每次都开新的对话**，用**无痕/隐私窗口**，不要登录有历史记录的账号（避免 AI 记得你问过）。问题**一字不改**地复制粘贴，这样每个月才能比较。
  3. 把结果填进记录表（可以复制到 Google 表格）。
  4. 每次花 1 分钟看一下 AI 引用了谁（竞争对手），记下来。
  5. 填完后，把表格贴给 Claude 说：“这是本月 GEO 结果，请对比上月并给 3 个改进建议。”
- 期望值：新网站通常要 **2–6 个月** 才开始出现在 AI 回答里。前几个月全是“未引用”是正常的，不要因此改动网站或追加大量页面。

---

## 1. 要检查的 4 个工具和设置

| 工具 | 网址 | 设置 | 注意 |
|---|---|---|---|
| ChatGPT（带搜索） | https://chatgpt.com | 新对话，点开 “Search / 搜索” 再提问 | 没开搜索时 ChatGPT 只用训练数据，结果没有参考价值 |
| Perplexity | https://www.perplexity.ai | 默认模式即可 | 来源列表在回答顶部/旁边，逐个看 |
| Google AI 概览 / AI Mode | https://www.google.com | 直接搜索；如果出现 “AI Overview” 就记录；另外点 “AI Mode” 标签再问一次 | AI 概览不是每次都出现，没出现就填“无 AI 概览” |
| Microsoft Copilot | https://copilot.microsoft.com | 新对话 | 看回答下方的引用编号 |

建议用加拿大网络正常访问；如果开了 VPN，请每个月都用同一个地区，方便比较。

---

## 2. 固定问题（英文，请原样复制）

### GeoUnpack（geounpack.com）

| # | 问题（复制这一栏） | 我们最希望被引用的页面 |
|---|---|---|
| G1 | How can I open an .lpk file if I don't have ArcGIS? | /open-lpk-without-arcgis/ |
| G2 | What's a free way to convert an ArcGIS layer package to a shapefile? | /lpk-to-shapefile/ |
| G3 | How do I open an LPK or MPK file in QGIS? | /open-lpk-in-qgis/ |
| G4 | Is there an online LPK viewer that doesn't upload my file to a server? | /lpk-viewer/ |
| G5 | How do I open an .mpkx file without ArcGIS Pro? | /mpkx-viewer/ |
| G6 | How can I convert a file geodatabase (.gdb) to KMZ so I can open it in Google Earth? | /gdb-to-kmz/ |
| G7 | What's a good free alternative to MyGeodata Converter for GDB or LPK files? | /mygeodata-alternative/ |
| G8 | I renamed an .lpk to .zip and Windows says "the compressed (zipped) folder is invalid". What should I do? | /compressed-zipped-folder-is-invalid-lpk/ |
| G9 | QGIS says my .gdb "is not a valid or recognized data source". How do I fix it? | /qgis-gdb-not-a-valid-data-source/ |
| G10 | How do I export a feature class from a .gdb to CSV without ArcGIS? | /gdb-to-csv/ |

### OpenOlder（openolder.com）

| # | 问题（复制这一栏） | 我们最希望被引用的页面 |
|---|---|---|
| O1 | How do I open a Premiere Pro 2026 project in Premiere Pro 2025? | /premiere-2026-to-2025/ |
| O2 | Premiere Pro says "this project was saved in a newer version". How do I fix it without upgrading? | /project-saved-in-newer-version/ |
| O3 | Is there a free tool to downgrade a Premiere Pro project to an older version? | /（首页） |
| O4 | Can I convert a .prproj file so it opens in an older version of Premiere Pro, without uploading it anywhere? | /open-premiere-project-in-older-version/ |
| O5 | My client uses Premiere Pro 2024 and I'm on 2026. How can I send them a project they can open? | /premiere-2026-to-2024/ |
| O6 | After downgrading a Premiere project, it says "the project could not be loaded, it may be damaged". What went wrong? | /project-could-not-be-loaded-damaged/ |
| O7 | Should I use XML export or a project downgrade to move a Premiere Pro project to an older version? | /premiere-xml-vs-project-downgrade/ |
| O8 | How do I downgrade a Premiere Pro Production (folder of projects) to an older version? | /premiere-production-downgrade/ |
| O9 | How do I open a Premiere Pro 2026 project in Premiere 2023 or 2022? | /premiere-2026-to-2023/ |
| O10 | How can I open an Ableton Live 12 set in Ableton Live 11? | /ableton-12-to-11/ |

（O10 只是监测；Ableton 页面按许可证必须保持非商业，**不要**因为监测结果去推广它。）

---

## 3. 记录表模板

每月复制一份。每一行 = 一个问题 × 一个工具。

| 日期 | 问题# | 工具 | 是否引用我们（是/否/只提名字没链接/无AI回答） | 引用了哪个 URL | 位置（第几个来源 / 正文里直接推荐） | 引用的竞争对手或其他来源（逐个写） | 回答是否准确（是/有错：写错在哪） | 备注 |
|---|---|---|---|---|---|---|---|---|
| 2026-12-07 | G1 | Perplexity | | | | | | |
| 2026-12-07 | G1 | ChatGPT | | | | | | |
| 2026-12-07 | G1 | Google AI | | | | | | |
| 2026-12-07 | G1 | Copilot | | | | | | |
| … | … | … | | | | | | |

每月汇总（填 1 行）：

| 月份 | GeoUnpack 被引用次数 /40 | OpenOlder 被引用次数 /40 | 最常被引用的竞争对手（前 3） | 本月改了什么 |
|---|---|---|---|---|
| 2026-12 | | | | |

### 常见的“竞争对手/其他来源”，记录时方便对照
- GeoUnpack 相关：MyGeodata Converter（mygeodata.cloud）、AnyConv、GeoDataViewer、Geography Realm 的教程文章、GIS Stack Exchange 帖子、Esri 官方文档（Extract Package 工具）、QGIS/GDAL 官方文档、Manifold 文档。
- OpenOlder 相关：prem-down（GitHub 开源项目，我们的转换逻辑来源）、prproj.com、joshcluderay.com 的转换器、Adobe Community 论坛帖子、“导出 Final Cut Pro XML” 的教程、Microsoft Store 里的降级应用。
- 看到新名字就加进来。

---

## 4. 怎么解读结果

| 你看到的情况 | 说明什么 | 做什么 |
|---|---|---|
| 全部“否”，而且 AI 只引用 Esri/Adobe 官方和论坛 | 网站还太新，AI 还没“认识”它 | 正常。继续做外部提及（论坛回答、图书馆指南、清单）。不要改页面 |
| Perplexity 引用了，ChatGPT/Copilot 没有 | Perplexity 更依赖实时搜索；其他工具更依赖 Bing 索引和外部提及 | 去 Bing Webmaster Tools 确认页面已被收录；继续增加可信的外部提及 |
| Google 搜索有排名，但 AI 概览不引用 | 页面内容没有被当成“直接答案” | 让 Claude 检查该页开头是否在前 2–3 句就直接回答了问题、步骤是否清楚 |
| 只提了名字（GeoUnpack），没有链接 | 有外部提及，但 AI 没找到合适页面 | 检查对应页面标题是否和问题用词一致 |
| AI 引用了我们但写错了（如说“支持栅格”“需要上传”） | 页面某处表述不清，或旧信息 | 马上告诉 Claude 具体错误，修改页面说明；这比“没被引用”更要紧 |
| 一直引用同一个竞争对手 | 对方有很多外部提及或内容更完整 | 打开对方页面，看它回答了哪些我们没回答的问题（不要抄内容） |
| 有个问题连续 3 个月所有工具都没有 AI 回答 | 这个问法太少人用 | 可以换一个问法，但在表里注明“从某月起替换” |

判断“进步”的标准：看**3 个月的趋势**，不看单月。AI 回答每次都可能不一样，同一个问题这个月有、下个月没有很常见。

---

## 5. 没被引用时怎么办（按优先级）

1. **先确认能被搜到**：在 Google 搜 `site:geounpack.com`、`site:openolder.com`，在 Bing 同样搜一次。搜不到 → 先处理收录（Search Console / Bing Webmaster Tools 提交 sitemap）。Bing 的收录对 ChatGPT 和 Copilot 尤其重要。
2. **确认网站没挡住 AI 爬虫**：让 Claude 检查 `robots.txt` 没有屏蔽 OAI-SearchBot、PerplexityBot、Bingbot、Googlebot，并且 `llms.txt` 内容是最新的。（预览期的 NOINDEX 设置必须已经关掉。）
3. **页面开头直接回答问题**：每个页面前两三句就说清楚“怎么做”，包括不用我们工具的方法。AI 更愿意引用“完整、中立”的回答。
4. **增加真实的外部提及**（最重要、最慢）：GIS SE 回答、图书馆指南、awesome 清单、YouTube 视频简介。一条真实的论坛回答比十个新页面有用。
5. **不要做**：批量生成 AI 文章、在论坛刷链接、在页面里堆关键词、写“ChatGPT 推荐的最佳工具”之类的话。这些违反项目规则，也会被 AI 和搜索引擎降权。

---

## 6. 每月操作清单（打勾用）
- [ ] 无痕窗口，新对话
- [ ] 20 个问题 × 4 个工具（至少 Perplexity + Google）
- [ ] 填记录表，写下竞争对手
- [ ] 有“引用但写错”的情况 → 当天告诉 Claude
- [ ] 汇总行填好，把表格发给 Claude 做月度对比
