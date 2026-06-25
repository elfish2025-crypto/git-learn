import React from 'react'

export default function Intro({ go }) {
  return (
    <div>
      <h1>用交互图，把 git 学成肌肉记忆</h1>
      <p>这个网站不靠背命令，而是让你看见 git 的内部模型。看完你会建立三个心智锚点，之后所有命令都只是它们的组合：</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, margin: '18px 0' }}>
        {[
          ['提交是快照', '每次 commit 是整个项目某一刻的完整副本，不可变。'],
          ['分支是指针', '分支/HEAD/tag 都只是"指向某个提交"的便利贴。'],
          ['HEAD 是你站在哪', 'git switch 改变的就是 HEAD——你当前的位置。'],
        ].map(([t, d]) => (
          <div key={t} className="card">
            <div style={{ fontWeight: 500, marginBottom: 4, color: 'var(--accent)' }}>{t}</div>
            <div style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>{d}</div>
          </div>
        ))}
      </div>

      <h2>建议的学习路线</h2>
      <ol>
        <li><strong style={{ fontWeight: 500 }}>四个区 · 数据流</strong> — 先搞懂命令在"搬什么"。</li>
        <li><strong style={{ fontWeight: 500 }}>概念怎么协作</strong> — 看清概念之间互相指、互相移动的关系。</li>
        <li><strong style={{ fontWeight: 500 }}>实战工作流</strong> — 跟着一个真实项目，逐步走完并行/回退/rebase/cherry-pick/worktree。</li>
        <li><strong style={{ fontWeight: 500 }}>回退决策</strong> 与 <strong style={{ fontWeight: 500 }}>远程协作</strong> — 把最容易踩坑的两块吃透。</li>
        <li><strong style={{ fontWeight: 500 }}>速查</strong> 和 <strong style={{ fontWeight: 500 }}>速查卡</strong> — 随时回来查，或打印贴墙。</li>
      </ol>

      <button className="btn btn-primary" style={{ marginTop: 8 }} onClick={() => go('fourareas')}>从第一章开始 ›</button>

      <div className="note-callout" style={{ borderLeftColor: '#534AB7', marginTop: 24 }}>
        <strong style={{ fontWeight: 500 }}>配套练习场：</strong> 仓库根目录的 <code>git-demo/notes-app</code> 是一个真实可跑的 git 仓库，本站"实战工作流"里的每一步都和它的 <code>git log</code> 一一对应。建议左手开终端 <code>cd</code> 进去，右手点这里的图，逐步对照着敲。运行 <code>bash build-demo.sh</code> 可随时还原现场。
      </div>
    </div>
  )
}
