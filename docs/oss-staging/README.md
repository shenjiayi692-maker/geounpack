# 开源库暂存

这两个文件是两个独立开源库的完整 git 历史（git bundle），等 GitHub 上建好空仓库后推送：

- `gis-package-unpack.bundle` → github.com/shenjiayi692-maker/gis-package-unpack（解包 .lpk/.lpkx/.mpk/.mpkx，MIT）
- `prproj-downgrade.bundle` → github.com/shenjiayi692-maker/prproj-downgrade（Premiere 项目降级，MIT，含 prem-down 的 MIT 声明；不含任何 Ableton 代码）

推送方法（Claude 来做）：`git clone X.bundle X && cd X && git remote set-url origin https://github.com/shenjiayi692-maker/X && git push -u origin main`
推送成功后删除本目录。
