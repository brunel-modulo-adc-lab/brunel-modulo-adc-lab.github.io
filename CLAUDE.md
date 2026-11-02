# CLAUDE.md

课题组网站（Jekyll，greenelab lab-website-template），发布在 <https://brunel-modulo-adc-lab.github.io>。维护流程见 `MAINTAINING.md`。

## 工作流程

1. 开始前 `git pull`，其他人可能在 GitHub 网页上直接改过文件。
2. 改动先在本地预览（`MAINTAINING.md` 第 4 节，Windows 下用 `BUNDLE_GEMFILE=Gemfile.local`），截图核对后再提交。
3. 用户说“推送”之前不要 push。推送后在 Actions 里确认 “On push to main” 成功，再请求线上页面核对新内容是否出现。
4. 浏览器缓存约 10 分钟。脚本和样式的地址带版本号（`?v=`），会自动更新；图片没有，换图时最好换文件名。

## 内容原则

- 数字、定理、结论只取自已发表或已录用的论文原文，不自行推算或夸大。论文和学位论文版本不一致时，以用户指定的版本为准。
  - TSSA 和门限偏差（Threshold Deviation）部分只用 ICASSP 2025 发表版（86.2%、Theorem 1/2、Table I、Fig. 1–3）。
- 硬件结果要分清实时与离线：只有两通道 RCRT 是在 FPGA 上实时重建的；RSoD、TSSA、ECRT、CoFMo 都是采集数据后离线恢复的。
- 每个方法的写法：先写 “Problem / Approach / Result” 三行，再放一个定理框（定理或关键公式，加一句 Interpretation），然后是关键图和论文引用。

## 用词规则（摘自课题组 Lexicon）

- **美式拼写**：quantization、analog、optimization、color、neighboring、modeled、stabilization。
- **统一术语**：
  - error tolerance（不写 noise margin、error bound）
  - recoverable range（不写 peak magnitude）
  - remainder（不写 residue）
  - folding threshold
  - folding-depth ratio ρ
  - folding integer（CoFMo 一节沿用论文自己的 fold count）
  - deviated threshold（不写 actual threshold）
  - coprime、bandlimited、modular inverse
- **大小写和缩写**：正文写 “Chinese remainder theorem (CRT)” 和 “robust CRT (RCRT)”，首次出现给全称，之后只用缩写。
- **风格**：
  - 不用自我评价的形容词（novel、remarkable、significantly 后面不带数字等）。
  - “小、大、很多”要给出具体数量。
  - 不写绝对化的结论（irreversible、gone for good、completely）。
  - “first” 一类说法前加 “To our knowledge”。
- **句式**：正文和图注少用冒号、分号连接分句，拆成完整句子。倍数写 “a factor of 5.7” 或 “3.5 times”，不写 “5.7×”。

## 技术要点

- **论文列表**：只改 `_data/sources.yaml`。有 DOI 写 `- id: doi:...`；没有 DOI 的手写条目可加 `note:`，显示在日期后面。`_data/citations.yaml` 由 `_cite/cite.py` 自动生成，推送时 CI 也会运行它（本地需要 Python 依赖 `_cite/requirements.txt`）。
- **公式**：
  - MathJax 由 jekyll-spaceship 加载，kramdown 不处理数学。
  - Markdown 段落里 `$$...$$` 会变成独立公式，正文里的简单量用 Unicode（±λ、Δ<sub>1</sub>）。
  - 定理框是纯 HTML（`<div class="theorem">`），里面的独立公式必须写 `\[ ... \]`，因为 kramdown 会把 HTML 块里的 `$$` 转义。
  - Markdown 里的 `\|`、`\{` 会被吃掉，范数用 `\lVert ... \rVert`。
- **样式**：`_styles/*.scss` 和 `_scripts/*.js` 会自动加载。本项目新增了：
  - `theorem.scss`：定理框和 Problem/Approach/Result 网格（`.summary`）
  - `toc.scss` / `toc.js`：研究页和首页的左侧导航
  - `team.scss`：Team 页左右布局
- **成员页**：`_layouts/member.html`，支持 `email`、`email-2`、`google-scholar`、`home-page` 字段，以及顶层的 `papers`（没有 Scholar 时，页面底部链接到这里）。
- **编码**：文件用 UTF-8 不带 BOM。PowerShell 5 的 `Set-Content -Encoding utf8` 会加 BOM，会破坏 front matter。
- **Shell**：在 Git Bash 的 heredoc 里写 Python 时，反斜杠会被转义（`\frac` 变成换页符）。含 LaTeX 的内容用 Write 工具写文件。
- **图片**：
  - 论文配图先裁掉多余空白；透明 PNG 先合成到白底再转 JPG，否则背景会变黑。
  - 照片墙裁掉人脸和时间水印，原图不要提交到仓库。
- **CI**：`.github/workflows/build-site.yaml` 和 `build-preview.yaml` 固定用 `ubuntu-24.04`，因为 ubuntu-latest（26）编译不了 `posix-spawn`。不要改回去。
