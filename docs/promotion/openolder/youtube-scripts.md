# OpenOlder: three YouTube screen-recording scripts

## 给 Jiayi 的中文说明

**这是什么：** 三个 45～60 秒的录屏视频脚本，不用露脸。每个都有：分镜和时间点、屏幕字幕、英文旁白、标题（≤70 字符）、视频描述（带链接）、标签、缩略图文字。最后是怎么免费录屏、怎么上传（Shorts 竖屏 vs 普通横屏）的中文步骤。

**你要做的：**
1. 准备好：电脑上装着 Premiere Pro 2026 和 2025（Creative Cloud 可以同时装旧版本：Premiere Pro 右边 "⋯" → "Other versions"），一个**你自己的、不含客户素材的**测试项目，一个测试用 Production。
2. 按"录制方法"录 3 段，每段先录横屏 1920×1080。
3. 旁白：可以自己读英文（慢一点没关系），或者不读，只放字幕 + 轻音乐（YouTube 音频库免费）。
4. 先发视频 1（搜索量最大），一周后发 2，再一周发 3。
5. **注意：** 标题和画面里可以写 "Premiere Pro"（说明用途），但**不要**用 Adobe / Premiere 的 logo 做缩略图；视频里**不要**说支持 Premiere 27.0（还不支持）；不要出现 Ableton。
6. 录屏前关掉通知、隐藏桌面上的私人文件，浏览器只开工具页面。

---

## Video 1: "Open a Premiere Pro 2026 project in 2025"

- **Title (65 chars):** Open a Premiere Pro 2026 Project in 2025 (Free, Nothing Uploaded)
- **Thumbnail text:** big "2026 → 2025", small "Premiere Pro project fix". Dark background, the project file icon from Finder/Explorer, no Adobe logo.
- **Length:** about 55 s

| Time | Shot | On-screen caption | Voice-over |
|---|---|---|---|
| 0:00–0:05 | Premiere Pro 2025, File > Open, pick the 2026 project; error dialog appears | "Premiere Pro 2025 won't open a 2026 project" | "Got a project from Premiere Pro 2026, but you're on 2025? This is what you get." |
| 0:05–0:13 | Zoom on the error text; then a quick cut of a hand-edited copy giving "may be damaged" | "Editing the version number no longer works" | "The old trick of changing the version number doesn't work with 2026 projects. 2026 leaves out fields that 2025 needs, so you get a damaged-project error." |
| 0:13–0:20 | Browser: openolder.com/premiere-2026-to-2025/ | "openolder.com – free, runs in your browser" | "This free tool fixes that. It runs in your browser, so your project is never uploaded." |
| 0:20–0:30 | Drag the .prproj onto the drop box; file appears with its detected version | "1. Drop the 2026 .prproj" | "Drop the 2026 project in. It reads the version and puts back the missing fields." |
| 0:30–0:37 | Target selector shows "Premiere Pro 2025"; click Convert & download | "2. Pick 2025 · 3. Convert & download" | "Keep 2025 selected and click Convert and download. You get a new copy; the original stays as it was." |
| 0:37–0:50 | Premiere Pro 2025 opens the new copy; play the timeline a few seconds | "Opens in 2025 ✓" | "Open the new copy in Premiere Pro 2025, and there's your edit." |
| 0:50–0:57 | Text card | "2026-only features (e.g. Object Mask) won't carry over · Keep your original · openolder.com" | "Features that only exist in 2026 won't come across, so check your timeline. Link in the description." |

**Description:**
```
Premiere Pro 2025 says your project "was saved in a newer version"? Here's how to open a Premiere Pro 2026 project in 2025 with a free browser tool. Nothing is uploaded, no install, no account.

Tool: https://openolder.com/premiere-2026-to-2025/

Why the old version-number edit fails: Premiere Pro 2026 leaves out fields that 2025 and older need, so a hand-edited project shows "The project could not be loaded, it may be damaged". The tool adds them back, then sets the version: https://openolder.com/project-could-not-be-loaded-damaged/

Notes:
- You get a new copy; your original project is not changed.
- Features that only exist in 2026 (e.g. Object Mask) won't appear in 2025.
- Media isn't converted; relink if Premiere asks.
- Premiere 27.0 projects are not supported yet.
- Also works for 2026 → 2024 and 2023: https://openolder.com/premiere-2026-to-2024/

I'm Jiayi, the independent developer who built OpenOlder. Not affiliated with Adobe. Premiere Pro is a trademark of Adobe.

0:00 The error
0:13 The tool
0:20 Convert
0:37 Open in 2025
```
**Tags:** premiere pro 2026 to 2025, open premiere project in older version, premiere pro downgrade project, saved in a newer version premiere, prproj converter, premiere pro project damaged, premiere pro backwards compatibility, video editing tips

---

## Video 2: "'This project was saved in a newer version' fix"

- **Title (63 chars):** Fix "This Project Was Saved in a Newer Version" in Premiere Pro
- **Thumbnail text:** the error message in a red box, below it "FIXED (free)". No Adobe logo.
- **Length:** about 55 s

| Time | Shot | On-screen caption | Voice-over |
|---|---|---|---|
| 0:00–0:06 | Error dialog full screen | "\"This project was saved in a newer version…\"" | "Seeing this message in Premiere Pro? Here are your three options, in under a minute." |
| 0:06–0:14 | Help > About Premiere Pro showing your version | "Check your version: Help > About" | "First, check your version under Help, About." |
| 0:14–0:22 | Creative Cloud app, Premiere Pro, "⋯" menu, "Other versions" / Update | "Option 1: update Premiere Pro (if you can)" | "Option one: update, if your computer and your client allow it." |
| 0:22–0:30 | Newer Premiere: File > Export > Final Cut Pro XML | "Option 2: ask the sender for an XML" | "Option two: ask whoever sent it to export a Final Cut Pro XML. Good for simple cuts, but many effects and settings are lost." |
| 0:30–0:46 | openolder.com/project-saved-in-newer-version/: drop file, pick installed version, Convert & download | "Option 3: convert the project (free, in your browser)" | "Option three: convert the project itself. Drop it here, pick the version you have, and download a new copy. It runs in your browser, so nothing is uploaded." |
| 0:46–0:55 | Older Premiere opens the copy; text card | "Keep the original · newer-only features won't carry over · openolder.com" | "Open the copy in your version. Keep the original, and check effects that only exist in the newer release. Link below." |

**Description:**
```
How to fix "This project was saved in a newer version of Adobe Premiere Pro and cannot be opened in this version". Three options: update, import a Final Cut Pro XML, or convert the project for your version with a free browser tool (nothing uploaded).

Tool and guide: https://openolder.com/project-saved-in-newer-version/
XML export vs converting the project: https://openolder.com/premiere-xml-vs-project-downgrade/
Got "may be damaged" after editing the version number? https://openolder.com/project-could-not-be-loaded-damaged/

Notes: you get a new copy and your original isn't changed. Features that only exist in the newer version won't appear in the older one. Premiere 27.0 projects are not supported yet.

Made by Jiayi, an independent developer. Not affiliated with Adobe. Premiere Pro is a trademark of Adobe.

0:00 The error
0:06 Check your version
0:14 Option 1: update
0:22 Option 2: XML
0:30 Option 3: convert the project
```
**Tags:** this project was saved in a newer version of premiere pro, premiere pro error fix, open premiere project in older version, premiere pro xml export, premiere pro downgrade, prproj, premiere pro 2025, premiere pro 2026

---

## Video 3: "Downgrade a Premiere Pro Production"

- **Title (62 chars):** Downgrade a Premiere Pro Production to an Older Version (Free)
- **Thumbnail text:** a folder icon with "Production" and "2026 → 2025", small "whole folder at once".
- **Length:** about 55 s

| Time | Shot | On-screen caption | Voice-over |
|---|---|---|---|
| 0:00–0:07 | Finder/Explorer: Production folder with .prodset and several .prproj | "A Production = one settings file + many projects" | "Need a whole Premiere Pro Production in an older version? Converting project by project is slow, and the settings file has to match too." |
| 0:07–0:15 | Older Premiere: Open Production, error | "Older Premiere won't open it" | "Here's the error in the older version." |
| 0:15–0:27 | openolder.com/premiere-production-downgrade/: drag the folder (or a .zip) onto the box; list of projects appears | "1. Drop the Production folder (or a .zip)" | "Drag the whole Production folder onto the page, or a zip of it. Everything stays on your computer." |
| 0:27–0:35 | Pick target version; Convert & download; zip downloads | "2. Pick the version (2020.1 or newer) · 3. Convert" | "Pick your version and convert. It updates every project and the settings file and gives you a zip." |
| 0:35–0:48 | Unzip; folder named with _downgraded; older Premiere opens the Production, projects visible | "Unzip → open the _downgraded Production" | "Unzip it and open the downgraded Production in your version." |
| 0:48–0:56 | Text card | "Media isn't converted – relink if asked · Keep the original · openolder.com" | "Media isn't included, so relink if Premiere asks, and keep the original. Link below." |

**Description:**
```
How to downgrade a whole Premiere Pro Production (the folder with a .prodset file and many projects) so an older Premiere Pro can open it. Free browser tool, nothing uploaded: every project inside and the settings file are converted, and you get the whole Production back as a .zip.

Tool: https://openolder.com/premiere-production-downgrade/

Notes:
- Target versions: Premiere Pro 2020.1 or newer (Productions don't exist before that).
- Your original Production is not changed.
- Features that only exist in the newer version won't appear in the older one; media isn't converted.
- Premiere 27.0 projects are not supported yet.

Made by Jiayi, an independent developer. Not affiliated with Adobe. Premiere Pro is a trademark of Adobe.
```
**Tags:** premiere pro productions, downgrade premiere production, premiere pro production older version, prodset, premiere pro 2026 to 2025, team editing premiere, prproj converter

---

## How to record and upload (中文步骤)

### 录屏（免费工具）
- **Mac：** 按 `Cmd + Shift + 5` → 选"录制整个屏幕"或"录制所选部分" → "选项"里麦克风选内建麦克风（如果要念旁白）→ 点"录制"。停止：菜单栏的停止按钮。文件存在桌面（.mov）。
- **Windows 11：** 打开"截图工具 Snipping Tool" → 切到"录制"（摄像机图标）→ 新建 → 框选区域 → 开始。或按 `Win + Alt + R`（Xbox Game Bar，只能录一个应用窗口，不能录桌面/文件管理器）。
- **OBS Studio（免费，两个系统都有，obsproject.com）：** 来源里加"显示器采集"，设置 → 视频 → 输出分辨率 1920×1080、30 fps → 点"开始录制"。适合想同时录麦克风、做更干净画面时用。
- 技巧：屏幕缩放调到 125%～150%，让文字大一点；鼠标慢慢移动；每个步骤停 1 秒；先不念旁白，后期剪辑时再配音会轻松很多。

### 剪辑
- 用你熟悉的任何剪辑软件（甚至 Premiere 本身）剪到 45～60 秒，加上表格里的字幕（字号大，放画面下方三分之一）。
- 旁白：照着 "Voice-over" 念。也可以只用字幕，不念。
- 背景音乐：YouTube Studio → 音频库（免费、可商用），音量调低。

### 两种上传方式
| | Shorts（竖屏） | 普通视频（横屏） |
|---|---|---|
| 画面 | 竖屏 9:16（1080×1920）或方形；时长不超过 3 分钟 | 横屏 16:9（1920×1080） |
| 怎么做 | 把横屏录像放进竖屏时间线，放大工具区域，上下放字幕 | 直接用录像 |
| 链接 | Shorts 的描述和评论里的链接**不能点击**，所以画面里要写 "openolder.com"；可以在 Shorts 上"关联视频"指向对应的普通视频 | 描述里的链接可以点击 |
| 缩略图 | 只能从视频里选一帧（手机 App 里选） | 可以上传自定义缩略图（需要先在 YouTube 完成手机号验证） |
| 好处 | 曝光快 | 能被 Google / YouTube 搜索长期找到（这类"报错怎么办"的视频主要靠搜索） |

**建议：** 每个视频都做**普通横屏版**（主力，靠搜索），再剪一个竖屏 Shorts 版，用"关联视频"指向横屏版。

### 上传步骤
1. 打开 studio.youtube.com → 右上角"创建" → "上传视频"。
2. 填标题、描述（直接复制上面的）、缩略图（普通视频）。
3. "观众"选"否，不是面向儿童的内容"。
4. "显示更多" → 标签：粘贴上面的 Tags；语言选英语；如果你加了字幕文件，上传 .srt（或用自动字幕后手动改错）。
5. 可见性先选"不公开"，自己检查一遍，再改"公开"。
6. 发布后，把视频链接加到 OpenOlder 对应页面（可选）和你的论坛回复里（只在别人确实问到时）。
