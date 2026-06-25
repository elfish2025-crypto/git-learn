import React from 'react'

const COLS = [
  ['日常', [
    ['git status', '看状态'],
    ['git add .', '全部暂存'],
    ['git commit -m "x"', '提交'],
    ['git commit -am "x"', '暂存+提交（已跟踪）'],
    ['git commit --amend', '改上一次提交'],
    ['git log --oneline --graph --all', '看历史图'],
    ['git diff / --staged', '看差异'],
  ]],
  ['分支', [
    ['git switch <b>', '切分支'],
    ['git switch -c <b>', '建并切'],
    ['git merge --no-ff <b>', '合并保留痕迹'],
    ['git rebase main', '换基底'],
    ['git rebase -i HEAD~3', '整理提交'],
    ['git cherry-pick <h>', '摘单个提交'],
    ['git branch -d <b>', '删分支'],
  ]],
  ['撤销（私有 reset / 公开 revert）', [
    ['git restore <f>', '丢工作区改动'],
    ['git restore --staged <f>', '取消暂存'],
    ['git reset --soft HEAD~1', '退提交·留改动'],
    ['git reset --hard HEAD~1', '退提交·全丢'],
    ['git revert <h>', '反向提交抵消'],
    ['git reflog', '后悔药·找回'],
  ]],
  ['远程', [
    ['git clone <url>', '克隆'],
    ['git push -u origin <b>', '首次推送'],
    ['git push', '推送'],
    ['git fetch', '只拉不合'],
    ['git pull --rebase', '拉+重放'],
    ['git push --force-with-lease', '安全强推'],
  ]],
  ['临时 / 排查', [
    ['git stash / pop', '塞抽屉 / 取回'],
    ['git worktree add ../d -b <b> main', '并行工作树'],
    ['git blame <f>', '逐行溯源'],
    ['git bisect', '二分定位 bug'],
    ['git tag v1.0', '打标签'],
  ]],
  ['三条铁律', [
    ['私有用 reset', '公开用 revert'],
    ['别 rebase 已共享分支', '只 rebase 自己的'],
    ['reset --hard 有 reflog', '90 天内可救回'],
  ]],
]

export default function Cheatsheet() {
  return (
    <div className="cheatsheet">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 12 }}>
        <h1 style={{ margin: 0 }}>git 速查卡</h1>
        <button className="btn btn-primary no-print" onClick={() => window.print()}>🖨 打印 / 导出 PDF</button>
      </div>
      <p style={{ color: 'var(--color-text-secondary)' }}>一页装下日常全部命令。点右上角可直接打印或存成 PDF 贴墙。</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14, marginTop: 12 }}>
        {COLS.map(([title, rows]) => (
          <div key={title} className="card" style={{ padding: '12px 14px' }}>
            <div style={{ fontWeight: 500, fontSize: 14, marginBottom: 8, color: 'var(--accent)' }}>{title}</div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5 }}>
              <tbody>
                {rows.map(([cmd, desc]) => (
                  <tr key={cmd}>
                    <td style={{ padding: '3px 0', verticalAlign: 'top' }}><code style={{ fontSize: 12 }}>{cmd}</code></td>
                    <td style={{ padding: '3px 0 3px 8px', color: 'var(--color-text-secondary)', textAlign: 'right', whiteSpace: 'nowrap' }}>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  )
}
