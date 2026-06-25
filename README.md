# 学 git · 交互式入门

一个用交互图把 git 学成肌肉记忆的本地静态网站。核心理念：**分支是指针、提交是快照、HEAD 是你站在哪**。

## 运行

```bash
npm install
npm run dev      # 本地预览，默认 http://localhost:5173
npm run build    # 打包到 dist/
npm run preview  # 预览构建产物
```

> 构建用了 `base: './'`（相对路径），所以 `dist/index.html` 双击（file://）也能离线打开。

## 章节

| # | 章节 | 内容 |
|---|------|------|
| 0 | 开始这里 | 三个心智锚点 + 学习路线 |
| 1 | 四个区 · 数据流 | 命令在四个区之间搬什么（静态图 + 自测） |
| 2 | 概念怎么协作 | 交互：点概念高亮协作关系 + 命令 |
| 3 | 实战工作流 | 交互：14 步逐步推进的 git graph（并行 / 回退 / rebase / cherry-pick / worktree） |
| 4 | 回退决策 | reset / revert / rebase / cherry-pick 决策树 + 表 + 自测 |
| 5 | 远程协作 | push / pull / fetch、PR 流程、远程冲突 + 自测 |
| 6 | 合并冲突手把手 | 冲突标记拆解、解决三步、逃生口 + 自测 |
| 7 | git stash 实战 | stash 栈模型、常用命令、与 worktree 对比 + 自测 |
| 8 | .gitignore 详解 | 匹配规则、已跟踪文件的坑（git rm --cached）|
| 9 | 概念与命令速查 | 概念表 + 7 类命令表 |
| 10 | 速查卡 | 可打印的一页 cheatsheet |

## 部署

仓库已配置 GitHub Actions（`.github/workflows/deploy.yml`）：每次 push 到 `main` 会自动构建并发布到 GitHub Pages。需在仓库 Settings → Pages 把 Source 设为 **GitHub Actions**（首次）。

在线地址：https://elfish2025-crypto.github.io/git-learn/

## 技术栈

- React 18 + Vite 5，零运行时 UI 依赖
- 纯静态产物，可离线、可托管到任何静态服务器（GitHub Pages / Netlify 等）
- 自带浅 / 深色双主题（`src/styles.css`）

## 目录结构

```
src/
├─ App.jsx            侧边导航 + 主题切换
├─ styles.css         主题 token + SVG 配色系统 + 深色模式
├─ data.js            工作流步骤 / 概念备注 / 测验题
├─ components/Quiz.jsx 可复用自测题组件
└─ chapters/          8 个章节组件
```

## 配套练习仓库

本仓库的"实战工作流"章节对应一个真实可跑的 git 演示仓库（`notes-app`），其完整提交历史由 `build-demo.sh` 一键生成，可对照终端里的 `git log` 学习。该演示仓库为独立项目，不包含在本站源码内。
