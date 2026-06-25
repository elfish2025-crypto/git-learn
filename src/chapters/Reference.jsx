import React from 'react'

const CONCEPTS = [
  ['repository (仓库)', '项目 + 完整历史，存在 .git 文件夹里', '项目的"时光机数据库"'],
  ['commit (提交)', '某一刻整个项目的快照 + 作者/时间/父提交', '一张存档，整份副本而非"改了哪几行"'],
  ['SHA / hash', '每个提交的唯一 40 位 ID，如 2f9570a', '提交的身份证号，平时用前 7 位'],
  ['HEAD', '指向"你当前所在的提交/分支"的指针', '你现在站在哪'],
  ['branch (分支)', '指向某提交、会随提交移动的轻量指针', '贴在某个提交上的便利贴'],
  ['tag (标签)', '钉死在某提交上、不移动的名字，如 v1.0', '里程碑书签'],
  ['index (暂存区)', 'git add 操作的对象，决定下次提交内容', '下一次提交的预演台'],
  ['tracked / untracked', '文件 git 是否在管', '新文件默认 untracked，add 后才纳管'],
  ['remote / origin', '远程仓库；origin 是默认远程名', '团队共享的那份'],
  ['upstream', '本地分支跟踪的远程分支', 'push -u 后建立的"对口"关系'],
  ['detached HEAD', 'HEAD 直接指向某提交而非分支', '站在历史里但没站在任何分支上，提交易丢'],
  ['fast-forward', '合并时直接把指针前移，不产生合并提交', '没有分叉时的"无痛合并"'],
  ['.gitignore', '列出不让 git 跟踪的文件', '排除 node_modules、密钥、临时文件'],
  ['stash', '把未提交改动临时收进抽屉', '活干一半要切走，先塞抽屉'],
]

const CMDS = [
  ['起步与配置', [
    ['git init', '把当前目录变成 git 仓库'],
    ['git clone <url>', '把远程仓库完整拉到本地'],
    ['git config --global user.name "名字"', '设置全局提交身份'],
    ['git config --global user.email "邮箱"', '同上'],
  ]],
  ['日常：看状态 / 暂存 / 提交', [
    ['git status', '看哪些文件改了/暂存了（最常用）'],
    ['git add <file> / git add .', '把改动放进暂存区'],
    ['git commit -m "信息"', '把暂存区固化成一次提交'],
    ['git commit -am "信息"', '已跟踪文件：跳过 add 直接提交'],
    ['git commit --amend', '修补上一次提交（改信息或补文件）'],
  ]],
  ['看历史与差异', [
    ['git log --oneline --graph --all', '看提交历史图'],
    ['git show <hash>', '看某次提交具体改了什么'],
    ['git diff', '工作区 vs 暂存区的差异'],
    ['git diff --staged', '暂存区 vs 上次提交的差异'],
    ['git diff main feature', '两个分支的差异'],
  ]],
  ['分支', [
    ['git branch', '列出本地分支'],
    ['git switch <分支>', '切换分支（新版，推荐）'],
    ['git switch -c <新分支>', '新建并切到该分支'],
    ['git merge <分支>', '把别的分支合进当前分支'],
    ['git merge --no-ff <分支>', '强制生成合并提交，保留分支痕迹'],
    ['git branch -d <分支>', '删除已合并的分支'],
  ]],
  ['撤销与回退', [
    ['git restore <file>', '丢弃工作区对该文件的改动'],
    ['git restore --staged <file>', '把文件移出暂存区（取消 add）'],
    ['git reset --soft/--mixed/--hard HEAD~1', '退回提交（改动保留/取消暂存/全丢）'],
    ['git revert <hash>', '用反向提交安全撤销已推送的提交'],
    ['git reflog', '后悔药：找回被 reset 丢掉的提交'],
  ]],
  ['远程协作', [
    ['git remote -v', '看关联了哪些远程'],
    ['git fetch', '只拉远程更新，不动你的工作区'],
    ['git pull', '= fetch + merge，拉并合并'],
    ['git pull --rebase', '拉并用 rebase 接上，历史更干净'],
    ['git push', '把本地提交推到远程'],
    ['git push -u origin <分支>', '首次推送并建立跟踪关系'],
  ]],
  ['临时保存与查找', [
    ['git stash / git stash pop', '把未提交改动塞抽屉 / 取回来'],
    ['git blame <file>', '看每一行是谁、哪次提交改的'],
    ['git bisect', '二分查找：定位是哪次提交引入了 bug'],
    ['git grep "关键词"', '在仓库里搜代码'],
  ]],
]

export default function Reference() {
  return (
    <div>
      <h1>概念与命令速查</h1>
      <p>这一章是工具书，随时回来查。抓三个锚点就不慌：① 命令在四个区之间搬什么；② HEAD = 你站在哪；③ 分支 = 会动的指针，提交 = 不变的快照。</p>

      <h2>核心概念</h2>
      <table className="tbl">
        <thead><tr><th>概念</th><th>是什么</th><th>大白话</th></tr></thead>
        <tbody>{CONCEPTS.map(([a, b, c]) => <tr key={a}><td><strong style={{ fontWeight: 500 }}>{a}</strong></td><td>{b}</td><td style={{ color: 'var(--color-text-secondary)' }}>{c}</td></tr>)}</tbody>
      </table>

      <h2>命令速查（按用途分类）</h2>
      {CMDS.map(([group, rows]) => (
        <section key={group}>
          <h3>{group}</h3>
          <table className="tbl">
            <tbody>{rows.map(([cmd, desc]) => <tr key={cmd}><td style={{ width: '46%' }}><code>{cmd}</code></td><td>{desc}</td></tr>)}</tbody>
          </table>
        </section>
      ))}
    </div>
  )
}
