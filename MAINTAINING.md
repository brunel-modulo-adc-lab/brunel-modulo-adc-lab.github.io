# 网站维护说明

本文件写给课题组里负责更新网站的同学。网站地址：<https://brunel-modulo-adc-lab.github.io>

网站的全部内容就是这个仓库里的文件。改完文件并推送（push）到 GitHub 后，GitHub 会自动重新生成网站，通常 3–5 分钟后上线，不需要服务器。

---

## 1. 两种修改方式

### 方式 A：直接在 GitHub 网页上改（适合小改动）

1. 打开仓库 <https://github.com/brunel-modulo-adc-lab/brunel-modulo-adc-lab.github.io>。
2. 找到要改的文件，点右上角的铅笔图标。
3. 改完点 **Commit changes**。
4. 打开仓库的 **Actions** 标签页看构建进度。最上面一条出现绿色 ✓ 就是已经上线，红色 ✗ 表示构建出错。
5. 浏览器会缓存页面约 10 分钟。看不到变化时，按 **Ctrl+F5** 强制刷新，或用无痕窗口打开。

### 方式 B：下载到本地，用 Claude Code 对话修改（适合大改动）

准备工作（只需做一次）：

| 需要什么 | 说明 |
|---|---|
| GitHub 账号和仓库权限 | 由组织 Owner 邀请进 `brunel-modulo-adc-lab` 组织，至少需要本仓库的 Write 权限 |
| Git 和 GitHub CLI（`gh`） | 安装后运行 `gh auth login` 登录，再运行 `gh auth setup-git`，之后就能推送 |
| Claude Code | VS Code 插件或命令行版，需要自己的 Claude 订阅 |
| 下载项目 | `gh repo clone brunel-modulo-adc-lab/brunel-modulo-adc-lab.github.io` |
| Ruby（可选） | 只在本地预览时需要，见第 4 节 |

用 Claude Code 打开项目文件夹后，Claude 会自动读取仓库里的 `CLAUDE.md`，里面写了本项目的写作规范和操作习惯。每次开始前先让它“同步最新版本”（即 `git pull`），改完先本地预览，确认后再让它推送。

---

## 2. 常见改动对应的文件

| 想做什么 | 改哪里 |
|---|---|
| 加一篇有 DOI 的论文 | `_data/sources.yaml` 里加一行 `- id: doi:10.xxxx/...`，标题、作者、期刊会自动抓取 |
| 加一篇还没有 DOI 的论文 | 在 `_data/sources.yaml` 里照着 “Decoupled Coarse-to-Fine Learning” 那条手写标题、作者、期刊和日期；已录用未出版的写 `note: Accepted for publication` |
| 论文有 DOI 后 | 把手写的那条换成 `- id: doi:...` |
| 改个人简介、邮箱、主页 | `_members/姓名.md` |
| 加新成员 | 复制一个 `_members/xxx.md` 改内容，照片放到 `images/members/`（正方形，约 600×600） |
| 改首页 | `index.md` |
| 改研究页面 | `theory/index.md`、`algorithms/index.md`、`hardware/index.md`、`applications/index.md` |
| 改 Team 页、照片墙 | `team/index.md`，照片墙图片是 `images/team/food-wall.jpg` |
| 改联系方式 | `contact/index.md` |
| 加图片 | 放到 `images/figs/`，在正文里照已有的 `{% include figure.html image="..." caption="..." %}` 写一行 |

成员页 `_members/xxx.md` 里 `links:` 下可用的字段：

```yaml
links:
  email: name@brunel.ac.uk        # 主邮箱
  email-2: name@gmail.com         # 第二个邮箱（可选）
  google-scholar: XXXXXXXXXXXX    # Google Scholar 地址里 user= 后面那串
  home-page: https://...          # 个人主页（可选）
```

---

## 3. 自动完成的事

- **论文信息**：`_data/sources.yaml` 里填了 DOI 的论文，推送后会自动生成完整的引用信息（写进 `_data/citations.yaml`，不要手动改这个文件）。
- **每周更新**：每周一自动重新抓取一次论文信息。
- **构建网站**：每次推送都会自动构建并发布。

---

## 4. 本地预览（可选）

大改动建议先在本地看效果。Windows 上：

1. 安装 [RubyInstaller](https://rubyinstaller.org/)（选 Ruby+Devkit 3.x，安装时勾选 MSYS2）。
2. 在项目文件夹里：
   ```
   copy Gemfile Gemfile.local
   set BUNDLE_GEMFILE=Gemfile.local
   bundle install
   bundle exec jekyll serve --livereload
   ```
3. 浏览器打开 <http://127.0.0.1:4000>，改文件后页面会自动刷新。

用 `Gemfile.local` 是为了让 Windows 下生成的依赖锁文件不和仓库里 Linux 用的 `Gemfile.lock` 冲突，`Gemfile.local` 不需要提交。这些步骤也可以直接让 Claude 帮忙做。

---

## 5. 注意事项

- **改之前先同步**：多人维护时，每次动手前先 `git pull`，避免覆盖别人刚推上去的修改。两人同时大改同一页容易冲突，先在群里说一声。
- **文件编码**：所有文件用 UTF-8（不带 BOM）。Windows 记事本或 PowerShell 的 `Set-Content` 可能加上 BOM，导致页面不显示。
- **公式**：正文里行内公式写 `$...$`。定理框是 HTML 块，里面的独立公式要写 `\[ ... \]`，不要写 `$$ ... $$`。
- **不要随便改 `.github/workflows/`**：构建环境固定在 Ubuntu 24.04，因为更新的 Ubuntu 26 编不过网站依赖的 `posix-spawn` 组件。将来 GitHub 停用 24.04 时，需要升级模板或去掉 `jekyll-last-modified-at` 插件。
- **构建失败**：在 Actions 里点开红色 ✗ 那条，看出错的步骤和日志。大多是 YAML 缩进写错，或文件名、图片路径写错。
- **用词**：网站文字遵循课题组 Lexicon 的用词规则，详见 `CLAUDE.md`。

---

## 6. 权限与账号

- 组织：<https://github.com/orgs/brunel-modulo-adc-lab/people>，在这里邀请成员、设置角色。
- **Owner** 可以修改一切，包括删除仓库和管理成员，只给信得过的人；建议至少保留两位 Owner。
- 所有成员建议开启两步验证，并保存恢复码。
- GitHub 免费版即可，公开仓库和 GitHub Pages 不收费。
