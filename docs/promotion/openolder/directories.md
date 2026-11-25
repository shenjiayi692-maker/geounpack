> **2026-11-25 状态：** AlternativeTo 已于 11-15 提交，在审核队列里（Gmail 有提醒邮件），不要重复提交。VideoHelp 表单已在 Chrome 填好（软件名、链接、描述，已写明支持 27 → 2026 和更新记录页），等 Jiayi 点 Submit。SaaSHub 提交页写明“AI 代理请让人自己提交”，而且要先注册，所以由 Jiayi 自己填：用下面的 one-liner 和 short description，但要改掉“Premiere 27.0 not supported yet”（现在已支持），竞品至少填一个，否则排到队尾。下面 Shared copy 里关于 27 的限制说法已过时。

> **2026-11-22 更新 / Update：** Premiere 27 支持已上线并经真机验证（27 → 2026 能正常打开）。下文里“不要宣传支持 27”的提醒已失效：现在可以在回复中说支持 27，链接 https://openolder.com/premiere-27-to-2026/ 。Premiere 27 support is live and verified in real Premiere (27 → 2026); the "never claim 27 support" warnings below no longer apply.

# OpenOlder: directory and launch-site submissions

## 给 Jiayi 的中文说明

**这是什么：** 可以免费提交 OpenOlder 的目录网站和发布平台：VideoHelp 软件库、AlternativeTo、SaaSHub、Product Hunt、Hacker News 的 "Show HN"。每个都写了：怎么提交（中文步骤）、要填什么、可以直接复制的英文文字、以及被拒的风险。

**你要做的（建议顺序）：**
1. **VideoHelp**（视频圈最对口）→ 2. **AlternativeTo** → 3. **SaaSHub** → 4. **Show HN**（选一个工作日美国东部时间上午发）→ 5. **Product Hunt**（最后做，可选）。
2. 所有地方都用你自己的个人账号，写明你是作者。
3. 名称、品牌里**不要**出现 "Adobe" 或 "Premiere" 当作产品名：产品名就是 **OpenOlder**，描述里可以说"用于 Premiere Pro 项目"（这是说明用途，没问题）。不要上传 Adobe 的 logo 当截图里的图标。
4. **不要**在这些地方提 Ableton 页面（它是非商业许可，最好不出现在推广里）。
5. **不要**说支持 Premiere 27.0 / 2027（还不支持）。
6. 提交前先准备好：一张 1270×760 左右的截图（工具页面，拖入文件后的样子）、一个正方形图标（240×240，用你网站的 favicon 放大版）。

**关于事实核对：** 每一项都注明了我是"打开读过"(fetched) 还是"只在搜索结果里看到"(search only)。VideoHelp 的提交页对我的工具显示"人机验证"，所以那里的具体字段我没看到，下面是根据搜索结果写的，你打开表单时以实际为准。

---

## Shared copy (use everywhere)

- **Name:** OpenOlder
- **URL:** https://openolder.com/
- **One-liner (≤60 chars):** Open Premiere Pro 2026 projects in 2025, 2024 and older
- **Short description (≤260 chars):**
  Free browser tool that converts Premiere Pro projects (.prproj) and Productions so an older Premiere Pro can open them, including 2026 projects that the old "edit the version number" trick breaks. Nothing is uploaded; no install, no account.
- **Long description:**
  Premiere Pro can't open a project saved by a newer version and has no "save as older version". OpenOlder converts a copy of the project in your browser so the version you pick can open it.
  - Premiere Pro 2026 projects: 2026 leaves out fields that 2025 and older require, so just lowering the version number gives "The project could not be loaded, it may be damaged". OpenOlder puts those fields back, then sets the version.
  - Single projects, several at once, or a whole Production (folder or .zip).
  - Runs locally in the browser (Web Worker). Files are never uploaded. No account, free.
  - Writes a new copy; the original project is untouched.
  - Limits: features that only exist in the newer version (e.g. Object Mask) won't appear in the older one; media isn't converted; Premiere 27.0 projects are not supported yet.
  - Conversion logic is a JavaScript port of the open-source prem-down (MIT). Not affiliated with Adobe.
- **Tags:** premiere-pro, prproj, video-editing, project-converter, downgrade, backward-compatibility, privacy, browser-based, free
- **Pricing / license:** Free (no ads, no payments)
- **Platforms:** Web / Online (works in Chrome, Edge, Firefox, Safari on Windows and macOS)
- **Developer:** Jiayi (independent developer, Canada)

---

## 1. VideoHelp.com software directory

**Facts (search only; the form showed a human-check page to my tools):**
- Submission page: https://www.videohelp.com/softwareedit?newtool=1 (linked as "Submit a tool" from the VideoHelp homepage, per search results).
- Search-result summary of VideoHelp's criteria: the site focuses on free and open-source video tools; "only software with a free or trial download and some kind of changelog or version history" gets added; paid all-in-one converters and yt-dlp GUIs are excluded; staff verify submissions, which "can take a few weeks". The page asks for name, link and description, and a valid link is required.
- VideoHelp does list some tools that also run in a browser (e.g. FilmCraft has a WebAssembly web build; search only), but I could not confirm that a web-only tool is accepted.

**Risk:** OpenOlder has no download and no public changelog page, so it may be rejected. **Before submitting, add a simple "Version history" / changelog page** to the site (e.g. `/changelog/`: dates, version, what changed). That improves your chances here and is useful anyway.

**中文步骤：**
1. 打开 https://www.videohelp.com/softwareedit?newtool=1 ，通过人机验证（如果要求登录，先注册 VideoHelp 账号）。
2. 按表单填写，下面的英文内容对应常见字段（以实际表单为准）。
3. 在"备注 / comment"里说明这是网页工具、本地运行、作者是你。
4. 提交后等几周。上线后，每次有新版本，用该软件页面上的 "report new version" 报更新。

**Copy for the form (expected fields):**
- Software name: `OpenOlder`
- Version: `0.1.0` (or the version on your changelog page)
- Homepage / download link: `https://openolder.com/`
- Version history / changelog link: `https://openolder.com/changelog/` (create it first)
- License: `Freeware` (free, no ads)
- OS: `Any / Web browser (Windows, macOS, Linux)`
- Category: the closest editing-related section (e.g. "Video Editing" or "Tools"; choose what the form offers)
- Short description: use the ≤260-char description above.
- Comment to editors:
  > Hi, I'm the developer. OpenOlder is a free web tool that runs entirely in the browser (Web Worker, nothing uploaded) and converts Premiere Pro .prproj projects and Productions so older Premiere Pro versions can open them, including 2026 projects where editing the version number by hand fails. There is no installer because it runs locally in the page; the changelog is at the link above. Thanks for considering it.

---

## 2. AlternativeTo

**Facts (FAQ fetched: https://alternativeto.net/faq):**
- Add via the user icon (top right) > **"Suggest new application"**; email must be verified first; fields include **Platforms, License, Descriptions, Tags**; submissions are reviewed.
- Apps must support English. Not accepted: unreleased/invite-only apps, hardware, single-country apps. **"Simple single-purpose online tools ... may also be declined."** (risk for OpenOlder)
- Developers can request developer access to their app's page.
- "Using user profiles to advertise products or software is not allowed." Incentivised or fake upvotes are penalised.
- To list as an alternative to an existing app: open that app's page > "Contribute to this page" > "Suggest Alternatives".

**中文步骤：**
1. 注册 alternativeto.net 并验证邮箱。
2. 右上角头像 → "Suggest new application"，填下面内容。
3. 先在站内搜 "Premiere project downgrader" / "prproj"。如果已经有类似工具的条目，到它页面 "Contribute to this page" → "Suggest Alternatives" 把 OpenOlder 加为替代品（这样更容易被看到）。
4. 审核通过后申请 developer access，以后自己改描述。
5. 不要在个人资料里打广告，不要找人刷赞。

**Copy:**
- Name: `OpenOlder`
- Website: `https://openolder.com/`
- Platforms: `Online` (Web)
- License: `Free`
- Short description: the ≤260-char description above.
- Long description: the long description above (drop the bullet about prem-down if the field is short).
- Tags: `video-editing`, `premiere-pro`, `project-converter`, `privacy-focused`, `no-registration-required`, `browser-based`
- Features to tick if offered: "Works Offline" (no: it needs the page to load first, so don't tick), "No registration required" (yes), "Privacy focused" (yes), "Ad-free" (yes).

---

## 3. SaaSHub

**Facts (search only):** free submission at https://www.saashub.com/services/submit (enter URL, pick categories, add competitors, manual approval, no fixed timeline). Free verification by email on your domain or a meta tag lets you edit the listing. Paid "featured" exists; you don't need it. Outbound links may be nofollow, so value is mostly discovery, not SEO.

**中文步骤：** 打开提交页 → 填网址 → 分类选 "Video Editing" 一类 → 竞品可以填已有的 Premiere 降级工具 → 提交 → 收到邮件后验证你是网站主人（用 openolder.com 域名邮箱或加 meta 标签）。**不要付费。**

**Copy:** use the shared one-liner and short description.

---

## 4. Product Hunt

**Is it suitable?** Partly. Product Hunt's audience is mostly tech/startup people, not editors, and OpenOlder is a niche utility, so expect modest traffic. It's free and gives a lasting page, so it's worth doing **after** the forums/VideoHelp, on a quiet day. Don't spend energy chasing a ranking.

**Facts:**
- Fetched (https://help.producthunt.com/en/articles/479557-how-to-post-a-product): you need a personal account ("Company accounts can't post products"); new accounts may need access before posting; posting your own product is recommended; you can save a draft.
- Search only (third-party guides, not official): tagline limit 60 characters, description 260 characters, the "maker comment" is the first comment at launch. Launch days start at 12:01 a.m. Pacific (common knowledge among makers; check the form). Product Hunt discourages asking people directly for upvotes; ask for feedback instead.

**中文步骤：**
1. 用个人账号登录 producthunt.com → 右上角 "Submit"。
2. 填名称、网址、标语、描述、截图（至少 2～3 张：首页、拖入项目、转换完成）、图标。
3. 定在某个工作日的太平洋时间 00:01 发布（加拿大西部时间同一时间；东部是凌晨 3:01，可以提前预约 schedule）。
4. 发布后立刻贴下面的 "first comment"。当天回答所有评论。
5. 告诉朋友"去看看并给意见"，**不要说"帮我点赞"**。

**Copy:**
- Name: `OpenOlder`
- Tagline (55 chars): `Open Premiere Pro 2026 projects in 2025, 2024 and older`
- Description (≤260): the shared short description.
- Topics: Video, Productivity, Privacy (pick what's offered)
- Pricing: Free
- First (maker) comment:
  > Hi Product Hunt, I'm Jiayi, an independent developer in Canada, and I built OpenOlder.
  >
  > The problem: Premiere Pro can't open a project saved by a newer version, and there's no "save as older version". Editors hit this all the time: a client on 2025, a studio locked to one release, a laptop that can't run the new version. The old workaround was to unzip the .prproj (it's gzipped XML) and lower the version number. With Premiere Pro 2026 that stopped working: 2026 writes a more compact file and leaves out fields older versions require, so the hand-edited project "may be damaged".
  >
  > OpenOlder puts those fields back and sets the version, in your browser. Nothing is uploaded, there's no account, and you get a new copy while the original stays untouched. It handles batches and whole Productions. I tested 2026 to 2025 in real Premiere. The conversion logic is a JavaScript port of the open-source prem-down tool (MIT).
  >
  > Honest limits: features that only exist in the newer version (like Object Mask) won't appear in the older one, media isn't converted, and Premiere 27.0 projects aren't supported yet.
  >
  > If a project fails to convert or open, I'd really like to hear about it. What else do you get stuck on when moving projects between versions?

---

## 5. Show HN (Hacker News)

**Rules (fetched: https://news.ycombinator.com/showhn.html):** Show HN is for "something you've made that other people can play with"; you must have built it and be around to discuss it; title must start with "Show HN"; make it easy to try without signups; "Don't ask friends to upvote or comment"; blog posts and landing pages don't qualify. OpenOlder fits (try it with no signup). HN titles are capped at 80 characters.

**中文步骤：**
1. 用你自己的 HN 账号（新账号最好先正常评论几天）。
2. 打开 https://news.ycombinator.com/submit ，Title 填下面标题，URL 填 `https://openolder.com/`，把下面的正文贴进 text 框。发出后看一下帖子页：如果正文没有显示在顶部，就马上把同样的文字作为你自己的第一条评论发出去。
3. 选美国工作日东部时间上午 8～10 点发。
4. 发完盯两三个小时，认真回答技术问题。不要叫朋友去点赞（会被处罚）。
5. 如果没起来，不要删了重发；过几周有大更新（比如支持 27.0）可以再发一次。

**Title (70 chars):** `Show HN: OpenOlder – open Premiere Pro 2026 projects in older versions`

**Text (or first comment):**
> I built this after seeing how many editors get stuck with "This project was saved in a newer version of Premiere Pro". Premiere has no "save as older version", and for years the workaround was: a .prproj is gzipped XML, so unzip it, lower the Version attribute on the <Project> element, gzip it back.
>
> Premiere Pro 2026 (project version 45) broke that. It switched to a sparser serialisation and omits fields that 2025 (version 43) and older require, e.g. LowerBound/UpperBound on VideoComponentParam elements. A file with only the version changed fails with "The project could not be loaded, it may be damaged or contain outdated elements".
>
> OpenOlder reconstructs those fields with their defaults, rewrites the version, then re-checks the result (version matches, a second reconstruction pass finds nothing missing, and the rewritten regions render byte-for-byte except for the inserted fields). It also does Productions: a folder with a .prodset file and many projects, which it converts as a whole and returns as a zip.
>
> Everything runs client-side in a Web Worker (fflate for gzip/zip); files are never uploaded. The conversion logic is a JavaScript port of prem-down (MIT, https://github.com/lucuma13/prem-down), with its tests ported too. Source: https://github.com/shenjiayi692-maker/openolder
>
> Limits: features that only exist in the newer release (Object Mask etc.) won't show up in the older one, and Premiere 27.0 (version 46, released this month) isn't supported yet. I've verified 2026 to 2025 in real Premiere; other pairs are less tested, so bug reports are welcome.

> Note for Jiayi: the GitHub repo link returned HTTP 200 (public) when I checked. If you'd rather not show the source, delete that sentence. Make sure the repo README credits prem-down before posting.

---

## 6. Other ideas (verified exist, lower priority)

- **University media-lab help pages.** Emerson's IT support article "Premiere Pro: Opening a Project Created in a Different Version" (https://support.emerson.edu/hc/en-us/articles/48214856551067-Premiere-Pro-Opening-a-Project-Created-in-a-Different-Version, search only) recommends the XML route. University help desks get this question every semester. A short, polite email to such help desks ("free, browser-only, nothing uploaded, in case it helps your students") can earn a link. Send at most a few, personally written.
- **Not recommended:** Adobe Exchange (it's for plugins and would tie the brand to Adobe), paid "launch directory" bundles, and AI-tool directories (wrong audience).
