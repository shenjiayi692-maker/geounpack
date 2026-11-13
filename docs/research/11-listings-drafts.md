# 外部提交：步骤和可直接复制的文字（2026-11-13）

> 英文部分照原样复制粘贴即可。每个地方只提交一次，被拒或没人理也不要重复提交。

---

## 一、GitHub 工具清单

### 1. Awesome-Geospatial（优先，最近一周还有人维护）
仓库：https://github.com/sacridini/Awesome-Geospatial
同一栏里已经有类似的"浏览器本地转换"工具（geoo.app、LidarKit），所以我们很合适。

**步骤（全在 GitHub 网页上操作，不用装任何东西）**
1. 登录 GitHub，打开 https://github.com/sacridini/Awesome-Geospatial/blob/master/README.md
2. 点右上角的 **铅笔图标 ✏️**（Edit this file）。GitHub 会提示先 Fork（复制一份到你名下），点 **Fork this repository**
3. 按 **Ctrl+F**（Mac 按 ⌘+F）搜索 `* [geoo.app]`，找到那一行
4. 在 **geoo.app 那一行的下一行**（`* [GOAT]` 的上面）新起一行，粘贴：

```
* [GeoUnpack](https://geounpack.com/) - Browser-based converter for Esri layer packages (.lpk/.lpkx), map packages (.mpk/.mpkx) and zipped file geodatabases (.gdb) to Shapefile, GeoPackage, GeoJSON, KML and CSV, without ArcGIS. Runs locally with GDAL compiled to WebAssembly; files are never uploaded. Free, no sign-up.
```

5. 点右上角绿色的 **Commit changes...**，在弹出框里：
   - **Commit message** 填：`Add GeoUnpack to SaaS`
   - 点 **Propose changes**
6. 下一页点 **Create pull request**，标题保持不变，正文填下面这段，再点一次 **Create pull request**：

```
Adds GeoUnpack to the SaaS section.

GeoUnpack opens Esri .lpk/.lpkx/.mpk/.mpkx packages and zipped .gdb file geodatabases in the browser and exports Shapefile, GeoPackage, GeoJSON, KML or CSV. It uses GDAL (gdal3.js) and 7-Zip compiled to WebAssembly, so files never leave the user's machine. Free, no account.

Disclosure: I'm the author.
```

### 2. awesome-gis（第二个）
仓库：https://github.com/sshuair/awesome-gis（规定：一次只加一个链接，结尾要有句号）

步骤同上：打开 https://github.com/sshuair/awesome-gis/blob/master/README.md → 铅笔图标 → 搜索 `- [GIS Cloud]` → 在**它的上一行**粘贴：

```
- [GeoUnpack](https://geounpack.com/) - Open and convert Esri .lpk, .mpk and zipped .gdb files to Shapefile, GeoPackage, GeoJSON, KML or CSV in the browser, without ArcGIS; files are never uploaded.
```

Commit message：`Add GeoUnpack`；PR 正文用上面那段，把第一行改成 `Adds GeoUnpack to Cloud Service > SaaS.`

> OpenOlder 暂时没找到合适的 GitHub 清单（Premiere 和 Ableton 没有活跃的 awesome 清单），先只做 AlternativeTo。

---

## 二、AlternativeTo.net

1. 打开 https://alternativeto.net ，右上角 **Sign up** 注册（可以用 Google 账号）
2. 登录后，点右上角头像旁边的 **+** 或 **Add app / Suggest application**
3. 按下面的内容填写。新提交的软件需要人工审核，一般几天到一两周

### GeoUnpack

| 字段 | 填写 |
|---|---|
| Name | `GeoUnpack` |
| Website | `https://geounpack.com/` |
| Platforms | `Online` / `Web` |
| License / Pricing | `Free` |
| Tags / Categories | `GIS`, `File Converter`, `Shapefile`, `KML`, `Privacy focused` |
| Alternative to（是谁的替代品） | `MyGeodata Converter`、`ogr2ogr`、`QGIS`（搜得到哪个就选哪个） |

Short description（一句话简介）：
```
Open and convert Esri LPK, MPK and GDB files in your browser, without ArcGIS. Nothing is uploaded.
```

Description（详细介绍）：
```
GeoUnpack is a free web tool for people who receive Esri ArcGIS files but don't have ArcGIS.

Drop a layer package (.lpk, .lpkx), map package (.mpk, .mpkx) or a zipped file geodatabase (.gdb) and GeoUnpack lists every layer, shows it on a map, and exports it to Shapefile, GeoPackage, GeoJSON, KML (Google Earth) or CSV.

The conversion runs entirely in your browser using GDAL and 7-Zip compiled to WebAssembly, so files are never uploaded to a server. No account or installation needed.

Limits: vector layers and tables only (no raster or tile packages yet), files up to 150 MB.
```

### OpenOlder

| 字段 | 填写 |
|---|---|
| Name | `OpenOlder` |
| Website | `https://openolder.com/` |
| Platforms | `Online` / `Web` |
| License / Pricing | `Free` |
| Tags / Categories | `Video Editing`, `File Converter`, `Premiere Pro`, `Privacy focused` |
| Alternative to | `prem-down`（搜不到就留空，不要选 Premiere Pro 本身） |

Short description：
```
Open a newer Premiere Pro project in an older version. Converts .prproj files in your browser, nothing uploaded.
```

Description：
```
OpenOlder converts Premiere Pro projects saved in a newer version (including 2026) so an older version of Premiere Pro can open them. It fixes the "This project was saved in a newer version" error without needing the newer Premiere installed.

Drop one or more .prproj files, a Production folder or a .zip, pick the version you have, and download converted copies. The original is never changed. Everything runs in your browser; files are not uploaded.

Based on the open-source prem-down project (MIT). OpenOlder is independent and not affiliated with Adobe.
```

> Ableton 页面按许可证要求必须保持非商业，暂时不单独提交到任何目录。
