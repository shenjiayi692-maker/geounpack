# 小工具选题：第 1 轮（2026-11-03）

## 方法
- 数据来源：Google 搜索联想词（89 个专业软件或文件格式 × 5 种问法，共 450 次查询）+ 对重点候选的搜索结果和论坛人工核查。
- 结论：联想词几乎每个都能联想满 10 条，区分不了需求大小。所以改用 **“技术上做得出来 + 现有结果很烂 + 痛点新鲜”** 来筛。
- Reddit 在当前环境里无法访问。TrustMRR 的完整列表需要用户自己申请免费 API key（每分钟 10 次请求），它的使用政策禁止“克隆业务”，只能用来做研究。

## 候选与判断

| # | 候选 | 痛点证据 | 现有竞品 | 技术可行性 | 结论 |
|---|---|---|---|---|---|
| 1 | **Premiere Pro 2026 工程降级到 2025 / 2024** | 2026 版改了工程文件的内部结构，旧的“改版本号”办法失效；Adobe 社区有多页抱怨帖；Adobe 官方 2026 年 1 月表示“在考虑向后兼容，暂无计划” | downgrader.elements.tv 有用户反馈对 2026 版失败；prem-down 是命令行工具（winget 上有，自称支持 2026），普通剪辑师不会用命令行；搜索结果被大量垃圾 PDF 占据 | 中高风险：要逆向新的工程结构；可以研究 prem-down 的做法（需先确认许可证） | ⭐ 第一优先验证 |
| 2 | **Ableton Live 12 工程降级到 11** | 联想词里有“downgrade ableton project 12 to 11”；Ableton 论坛里有求助帖 | DAW Converter（Product Hunt 上有，网页版）、live_set（Ruby 命令行）、手动改 XML | 中：.als 是压缩过的 XML | 次选；先看 DAW Converter 做得怎么样 |
| 3 | DaVinci Resolve 20 工程降级到 19 | 官方论坛很多求助帖 | 无 | ❌ Blackmagic 官方说不可能，文件格式是私有的 | 放弃 |
| 4 | Goodnotes 6 降级到 5 | — | 官方 App 内就能切换 | — | 放弃 |
| 5 | QuickBooks 文件降级 | 需求大 | 搜索结果全是垃圾电话页 | ❌ Intuit 说不可逆 | 放弃 |
| 6 | SketchUp 降级 | — | DOWNCONVERT 已经在做 | — | 不碰 |
| 7 | 图片和视频格式（HEIC、WebP、MKV 等） | 搜索量巨大 | 大站占满 | 容易 | 放弃，太拥挤 |

## 第 1 名的验证步骤（1 周，先不写产品）
1. 读 Adobe 社区里关于 2026 版降级的帖子，统计近 3 个月的回帖数和“有没有解决”。
2. 查 prem-down 的仓库：许可证、近期更新、Issue 里的失败案例。
3. 用 Premiere 2026 和 2025（试用版）各做一个测试工程，比较内部结构，判断能不能在浏览器里转换。
4. 以上都过关，再做一个“上传 .prproj，下载降级版”的单页工具，收 $5–15 一次。

## 第 2 轮要扫的软件（每年改版、旧版用户多）
After Effects、Lightroom 目录、Cubase、Studio One、FL Studio、Logic、Clip Studio、Procreate、Vectorworks、ArchiCAD、Rhino、Altium/KiCad、Fusion 360 导出、Cricut/Silhouette 等。

---

# 第 2 轮（2026-11-03）

## Premiere 2026 降级：验证结果，下调
- **prem-down**（github.com/lucuma13/prem-down，MIT 许可证，2026-10 仍在更新，只有 6 颗星）：免费、离线，Mac 和 Windows 都有安装包，装好后右键就能用，**明确支持 2026 版**。原理是 2026 版的工程文件省掉了一些旧版必需的字段，它把这些字段补回去，再改版本号。
- GitHub 上另有 6 个以上的同类项目，多数已经停更；其中 wss7per-hash/ae-pr-downgrader（中文，2026-09）同时支持 After Effects。
- 结论：**技术难题已经被免费工具解决了，剩下的只有“没人知道”。** 做网页版收费仍然可行（MIT 允许复用，但必须保留署名），但护城河只剩 SEO 和方便程度。评级从 ⭐ 降到“可做，但优势弱”。
- After Effects 降级：AE 自带“另存为”往前两个大版本的功能，另有开源的 AEP-Downgrader，需求更弱。**放弃。**

## Stack Exchange 扫描（11 个站 × 5 个关键词，641 个高票问题）
大多数高浏览量问题已经有现成工具（导出 iMessage、OneNote 转 Markdown、Slack 导出等），或者已经过时。

**新的最佳候选：ArcGIS 打包文件（.lpk / .lpkx / .mpk / .mpkx）转 Shapefile、GeoJSON、KML，不用装 ArcGIS**
- 证据：GIS Stack Exchange 上“免费把 .lpk 转成 shapefile 的工具？”这个问题有 6.3 万次浏览，一直没有被采纳的答案；搜索结果里**没有任何在线转换器**，Convert.Guru 只能提取文本，Sasa 的转换器要付费、而且是桌面软件。
- 用户：手上没有 ArcGIS（年费几百到上千美元）的城市规划、环境顾问、学生、QGIS 用户，经常收到政府或甲方发来的 .lpk 文件。
- 技术：打包文件本质是 7z 压缩包，里面是 shapefile 或 File Geodatabase。浏览器里可以用 gdal3.js（GDAL 编译成的 WebAssembly）读取并转换，**不用把文件上传到服务器**，这对处理甲方数据是一个卖点。
- 可以扩展成一组：“不装 ArcGIS 打开 Esri 文件”（.gdb 压缩包、.lpk、.mpk、.sd、.aprx 里的数据）。
- 风险：搜索量偏小，是专业小众，天花板估计在每月几百到几千美元；Esri 的新格式（.lpkx/.mpkx）要逐个测试。
- 定价设想：免费预览图层和属性表，导出按次收 $5–9，或者 $15/月不限次。

## 当前排序
1. **ArcGIS 打包文件在线转换**：需求有证据、没有在线竞品、技术可行。⭐
2. Premiere 2026 降级网页版：需求强，但有免费工具。
3. Ableton 12 降到 11：已有 DAW Converter，待查。
