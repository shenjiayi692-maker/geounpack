# Premiere 27 推广草稿（2026-11-22）

## 给 Jiayi 的中文说明

这份文件有两部分：

1. **给 prem-down 作者的 GitHub issue（已过时，作者已自行支持 27，不要发）**：告诉他 Premiere 27 的版本号是 46、文件结构和 2026 一样，我们已经实测通过。OpenOlder 的转换逻辑来自他的开源项目，这样做既是回馈，也可能让他在项目说明里提到 OpenOlder。用你自己的 GitHub 账号发。
2. **YouTube 视频脚本**：“在 Premiere 2026 中打开 Premiere 27 的项目”，约 55 秒，只需录屏和配音，不用露脸。

注意：
- 发 issue 前先看看 prem-down 里是否已经有人提过 27，有的话改成在那个 issue 下留言补充，不要重复开新 issue。
- 录视频需要一个 Premiere 27 保存的项目和装了 2026 的电脑。可以请上次帮你测试的人录屏，或者用他发给你的项目文件自己录。

---

## 1. GitHub issue for prem-down（已过时，不要发）

> **2026-11-22：不需要再发。** 作者已于 2026-11-21 自己加入了 Premiere 27 支持（`{46, "2027", nil}`，并附带真实的 27 测试项目），本节草稿的核心内容他都做完了。以后遇到真正的转换失败或 bug，再附上测试文件去提 issue。我们的测试已经用上他新加的真实 27 项目。

Repository: https://github.com/lucuma13/prem-down

**Title:**

```
Premiere 27.0: project version 46, same layout as 2026 (tested 27 -> 2026)
```

**Body:**

```
Hi, and thanks for prem-down!

Adobe released Premiere 27.0 (now called just "Adobe Premiere") in November 2026. In case it helps with updating releases.go:

- Projects saved by Premiere 27.0 have `<Project ObjectID="1" ... Version="46">`.
- The serialisation looks the same as 2026 (version 45, the sparse format): converting a 27.0 project only needed the version number changed to 45. No other changes were required.
- Tested on 2026-11-22: a project saved in Premiere 27.0 (a clip on a timeline, a transition and a title), converted to version 45, opened in Premiere Pro 2026 with the clip, transition and title intact.

Suggested entry for `internal/premdown/releases.go`:

    {46, "27", nil},

with `lastDenseSerialisationProjectVersion` unchanged (43).

I can share the small test project if that is useful (it contains no media, only the edit).

Disclosure: I maintain OpenOlder (https://openolder.com), a browser version of prem-down's project conversion, and a JavaScript port (https://github.com/shenjiayi692-maker/prproj-downgrade). Both credit prem-down and keep its MIT notice. Happy to help with anything else.
```

---

## 2. YouTube script: "Open a Premiere 27 Project in Premiere Pro 2026"

**Title (≤70 chars):**

```
Open a Premiere 27 Project in Premiere Pro 2026 (Free, No Install)
```

**Format:** normal landscape video (1920×1080) plus a vertical Short cut from it. Screen recording, no face. Voice-over can be your own voice or captions only.

| Time | On screen | Caption | Voice-over |
|---|---|---|---|
| 0:00–0:06 | Premiere Pro 2026 shows the error dialog when opening the 27 project | "This project was saved in a newer version…" | "Got a project from Premiere 27, but you're still on 2026? Here's the free fix." |
| 0:06–0:14 | Browser: openolder.com/premiere-27-to-2026/ | "openolder.com" | "Go to openolder dot com. It runs in your browser, and your project is never uploaded." |
| 0:14–0:24 | Drag the .prproj into the box; the table shows "Premiere Pro 27" | "Drop the .prproj" | "Drop the project file in. It detects Premiere 27 and picks 2026 for you." |
| 0:24–0:32 | Click "Convert & download"; the downloaded file name ends with _Premiere2026 | "Convert & download" | "Click convert. You get a new copy; your original stays untouched." |
| 0:32–0:46 | Premiere Pro 2026: File > Open Project, open the new copy; timeline with clip, transition and title | "Opens in 2026" | "Open the new copy in Premiere Pro 2026. Clips, transitions and titles are all there." |
| 0:46–0:55 | Back to the site; show the version dropdown with 2025, 2024… | "Works for older versions too" | "It also goes back to 2025 and older. Features that only exist in 27 won't carry over, so keep the original." |

**Description:**

```
Premiere Pro 2026 says "This project was saved in a newer version of Adobe Premiere Pro and cannot be opened"? Convert the Premiere 27 project for free in your browser: https://openolder.com/premiere-27-to-2026/

- Nothing is uploaded: the conversion runs on your computer.
- Your original project is not changed; you download a new copy.
- Also converts to 2025, 2024 and older, and whole Productions.
- Features that only exist in Premiere 27 won't appear in 2026.

I built OpenOlder. It is based on the open-source tool prem-down (MIT). Not affiliated with Adobe.

0:00 The error
0:06 Open the converter
0:14 Drop the project
0:24 Convert
0:32 Open in Premiere Pro 2026
```

**Tags:**

```
premiere pro, premiere 27, premiere pro 2026, open newer premiere project, saved in a newer version, downgrade premiere project, prproj, video editing
```

**Thumbnail text:** `PREMIERE 27 → 2026` (large) and `FREE FIX` (smaller).

**Short (vertical, ≤60 s):** crop the same recording to 1080×1920, keep the captions, and use the title `Premiere 27 project won't open in 2026? Free fix #shorts`. Put the link in the description and in a pinned comment (links in Shorts captions are not clickable).

### 中文录制要点

- 录屏工具：Mac 按 Cmd+Shift+5，Windows 用“截图工具”的录屏功能，或者免费的 OBS。
- 先录 2026 打开 27 项目时的报错，再录网站操作，最后录 2026 成功打开的画面。三段分开录也可以，用剪映或 Premiere 拼起来。
- 字幕用英文。配音不想自己说，可以只加字幕和背景音乐。
- 上传后在视频描述里放链接；Shorts 的链接放在置顶评论里。

---

## 3. Adobe Community: replies for Premiere 27 threads

### 中文说明

Premiere 27 刚发布，Adobe 社区会不断出现“27 的项目在 2026 打不开”的新帖。这些帖子还没被我们收进 `forum-answers.md`，需要用 Chrome 插件现找。下面是一份通用回复模板，**每次都要按帖子内容改第一句**，不要整段复制到多个帖子：论坛会把一模一样的内容当成垃圾广告。

回帖前先看：
- 帖子里 Adobe 员工是否已经给了官方办法（比如 Adobe 自己的降级工具）。如果有，不要放链接。
- 帖子是否已锁定或已解决。
- 每天最多回 1–2 个帖子，签名档里不要放网址。

### Template

```
[One sentence that answers their exact situation, e.g. "Since your client is on 2026 and can't update yet, …"]

Premiere 2026 refuses the file because Premiere 27 writes a newer project version number. Premiere 27 keeps the same file layout as 2026, so the project only needs its version lowered, which Premiere itself can't do (there's no Save As Older Version).

I built a free tool that does this in the browser (disclosure: it's mine): https://openolder.com/premiere-27-to-2026/ . The project isn't uploaded anywhere, and it writes a new copy so your original stays as it was. I tested a project saved in 27 and converted this way: it opened in 2026 with its clips, transitions and titles. It can also go further back to 2025 or older, and it handles several projects at once or a whole Production.

Things that only exist in 27 won't appear in 2026, and media isn't converted, so relink if asked. Keep the original and check the timeline before you rely on it. The official alternative is File > Export > Final Cut Pro XML from 27 and importing that in 2026, which works for simple cuts but loses many effects.
```
