# Runbook: adding a new Premiere release (next up: Premiere 27.0 / "2027")

## 中文摘要（给 Jiayi）

- **现状（2026-11-21 查证）**：Adobe 已在 2026 年 11 月（Adobe MAX 2026）发布 **Premiere 27.0**（产品已改名为 "Adobe Premiere"，去掉了 "Pro"）。
- **但还不能加进网站**：我们需要 27.0 工程文件里的"版本号"（2026 是 45）。这个数字目前**没有任何可靠来源**：上游项目 prem-down 的 `releases.go` 最后一次更新是 2026-10-04，表里最新仍是 2026 = 45；网上也没有人公布 27.0 的数字。**不能猜**，猜错会让转换出来的工程打不开。
- **现在网站对 27.0 工程会怎样**：能读出来（显示为 "Premiere Pro version 4x"），并允许转成 2026 / 2025 等。如果 27.0 没有再改文件结构，结果大概率可用；如果改了，可能打不开。没有真机测试前，不要对外宣传"支持 2027"。
- **下一步（二选一即可）**：
  1. 等 prem-down 更新 `releases.go`（作者通常在 Adobe 新版发布后补上），然后让 Claude 按本文第 2 节操作；或
  2. 找一个装了 Premiere 27.0 的人：新建空工程保存，把 `.prproj` 发给 Claude，按第 1 节读出版本号，再按第 3 节真机测试。
- 本文最后有一份**现成的 2027→2026 页面草稿**（JSON），确认版本号并测试通过后再放进 `src/pages.json`。

---

## 0. Findings as of 2026-11-21

| Question | Answer | Source |
|---|---|---|
| Is there a release newer than Premiere 2026 (project version 45)? | Yes: **Premiere 27.0**, announced at Adobe MAX 2026 (Miami), "available now" as of mid-November 2026. Adobe has dropped "Pro" from the name. Press calls it "Premiere 27.0"; Adobe's own pages could not be fetched (HTTP 403 to automated clients). | https://nofilmschool.com/adobe-premiere-update-27-0 (16 Nov 2026), https://borncity.com/news/premiere-pro-27-0-adobe-bringt-ki-agenten-und-neue-schnittwerkzeuge/ , https://www.redsharknews.com/adobe-max-2026-premiere-color-mode-mcp , Adobe release notes (not fetchable): https://helpx.adobe.com/premiere/desktop/whats-new/release-notes.html |
| Its XML `<Project ObjectID="1" Version="...">` number? | **Unknown.** Not published anywhere found. | — |
| prem-down `internal/premdown/releases.go` | Newest entry `{45, "2026", nil}`; `lastDenseSerialisationProjectVersion = 43`. Last commit 961b6af, 2026-10-04 (before 27.0). No 27.0 entry. | https://github.com/lucuma13/prem-down/blob/main/internal/premdown/releases.go |
| Did 27.0 change serialisation again? | Unknown. | — |

Note the numbering gap: 2026 is 45, not 44 (prem-down's comment: "there is no v31 or v44 entry"). So **do not assume 27.0 = 46.**

### What the site does today with a 27.0 project
`inspect()` / `downgrade()` in `src/lib/prproj.js` accept any version above the newest known one (`unrecognised: true`). The UI (`src/app.js`, `relName`) labels it "Premiere Pro version N" and offers every known older release, default 2026. Going to 2025 or older still re-inserts the 2026-era fields. Whether the output opens depends on whether 27.0 changed the format again: untested. The UI does not currently show a warning for `unrecognised` sources; consider adding one ("this project is from a Premiere release we have not tested yet").

## 1. Get the version number

Preferred: prem-down adds the entry to `releases.go`; copy it exactly.

Otherwise, from a real project saved by Premiere 27.0 (an empty new project is enough):

```sh
node -e 'const z=require("zlib"),fs=require("fs");const x=z.gunzipSync(fs.readFileSync(process.argv[1])).toString();console.log(/<Project ObjectID="1"[^>]*\bVersion="(\d+)"/.exec(x)[1])' path/to/new.prproj
```

Also record whether `<VideoComponentParam ...>` blocks still lack `<LowerBound>/<UpperBound>` the way 2026 files do, and diff an empty 27.0 project against an empty 2026 project to spot new omitted fields. If 27.0 drops *more* fields, `RECONSTRUCT_FIELDS` in `src/lib/prproj.js` needs extending (mirror prem-down `reconstruct.go`), and `LAST_DENSE` stays 43 unless prem-down changes it.

Keep that project as a test fixture: `test/fixtures/fixture_ppro27.prproj` (empty project, no client media) and mention it in `test/fixtures/NOTICE.md`.

## 2. Code changes (keep both lists identical, mirroring releases.go)

Let `N` be the confirmed number.

- `src/lib/prproj.js`: append `[N, '2027']` to `RELEASES` (the name prem-down uses; if Adobe/prem-down call it `27`, use that and keep the display consistent).
- `src/app.js`: append `[N, '2027']` to `RELEASES` (the short list shown in the target dropdown).
- `LAST_DENSE`: change only if prem-down changes `lastDenseSerialisationProjectVersion`.
- `src/pages.json`: the `project-saved-in-newer-version` FAQ "Which version do I have?" lists 25.x/24.x/26.x; add "27.x is 2027". Check the home page, `premiere-2026-to-*` pages and `project-saved-in-newer-version` for wording such as "the newest version".
- If a Production (`.prodset`) from 27.0 has a different `mProjectVersion`, check `src/lib/prproj.js` Production code paths too.

## 3. Tests

- `test/prproj.test.mjs`: add cases mirroring the 2026 ones: `releaseName(N) === '2027'`, `newestKnownVersion() === N`, `previousRelease(N).version === 45`, and with the 27.0 fixture: 2027 -> 2026 (version reads back 45; no field re-insertion if both are sparse) and 2027 -> 2025 (version 43, every `VideoComponentParam` carries both bounds).
- `scripts/smoke-browser.cjs`: add a run on `/premiere-2027-to-2026/` with the fixture, expecting the default target "Premiere Pro 2026", and add the slug to the "all pages load" list.
- `npm test`, `npm run build && node scripts/smoke-browser.cjs && node scripts/smoke-ableton.cjs` must pass.
- **Real-app check before publishing the page** (same method as `docs/TEST-CHECKLIST.zh.md`): make T1–T4 in Premiere 27.0, convert to 2026 and to 2025, open each in the real older Premiere.

## 4. Publish the page

Add the draft below to `src/pages.json` (after `premiere-2026-to-2023`), set `defaultTarget` to `45`, set `"updated"` to the publish date, build, smoke-test, push to a branch.

### Draft page JSON (NOT in pages.json yet)

Replace nothing except `updated`; `defaultTarget: 45` is 2026's version, which is already known.

```json
{
  "slug": "premiere-2027-to-2026",
  "title": "Open Premiere 2027 Projects in Premiere Pro 2026: Free Converter | OpenOlder",
  "description": "Premiere 2026 says your project was saved in a newer version? Convert the Premiere 2027 (27.x) .prproj in your browser and open it in 2026. Free, nothing uploaded.",
  "h1": "Open a Premiere 2027 Project in Premiere Pro 2026",
  "subtitle": "Convert a 27.x project so Premiere Pro 2026 (or older) can open it.",
  "defaultTarget": 45,
  "lead": "Premiere 27.0, released in November 2026, saves projects with a newer version number, so Premiere Pro 2026 refuses them with \"This project was saved in a newer version of Adobe Premiere Pro and cannot be opened in this version.\" This tool rewrites the project for the version you have. Your original stays untouched.",
  "steps": [
    "Drop the 27.x .prproj file (or several, or a Production folder).",
    "Keep 'Premiere Pro 2026' selected, or pick an older version.",
    "Click Convert & download, then open the new copy."
  ],
  "faq": [
    ["Is Premiere 2027 the same as Premiere Pro?", "Yes. From version 27.0 Adobe calls the app just Premiere. Help > About shows 27.x."],
    ["Can I go straight to 2025 or older?", "Yes. Pick the version you have. For 2025 and older the tool also restores the fields that newer versions leave out."],
    ["What will I lose?", "Features that only exist in 27.x. Everything that also exists in your version should open normally."]
  ],
  "body": [
    {
      "h2": "Why Premiere Pro 2026 refuses a 27.x project",
      "p": [
        "A `.prproj` file is gzip-compressed XML with a version number near the top. Premiere checks that number when it opens a project and refuses anything newer than itself. There is no Save As Older Version command, so the project has to be converted outside Premiere."
      ]
    },
    {
      "h2": "What the converter changes",
      "p": [],
      "list": [
        "Sets the project version to the one Premiere Pro 2026 (or the version you pick) expects.",
        "For 2025 and older, restores fields that 2026 and later no longer write.",
        "Leaves sequences, bins, clips, effects and keyframes as they are.",
        "Writes a new file; the original is never modified, and nothing is uploaded."
      ]
    },
    {
      "h2": "After converting",
      "p": [
        "Open the new copy in the older Premiere. Relink media if it has moved. Features introduced in 27.x may be missing; keep the original as a backup and keep working in the converted copy."
      ]
    }
  ],
  "updated": "YYYY-MM-DD"
}
```

Before publishing, re-check every factual sentence in the draft against what testing showed (for example, if 27.0 -> 2026 also needs field changes, say so in the lead).
