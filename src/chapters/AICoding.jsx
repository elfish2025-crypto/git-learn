import React, { useState } from 'react'
import Quiz from '../components/Quiz.jsx'
import Pitfall from '../components/Pitfall.jsx'
import { QUIZZES, PITFALLS } from '../data.js'

const PROMPTS = [
  ['开工前建立检查点', '动手前先看一下 git status。如果工作区不干净，先把现有改动提交、或者告诉我，确保我们从一个干净的检查点开始。', 'git status → git commit'],
  ['让它在分支上干活', '在新分支 feature/login 上做这个改动，不要直接改 main。', 'git switch -c feature/login'],
  ['完成后让它提交', '把这次改动提交。commit message 用 Conventional Commits 格式（feat/fix/refactor…），标题一句话说清做了什么，正文说为什么这么改。', 'git add -A && git commit'],
  ['让它自查改动', '提交前先用 git diff 把你这次的改动从头看一遍，逐个文件告诉我你改了什么、为什么，有没有顺手误改的地方。', 'git diff'],
  ['拆成原子提交', '你这次其实改了两件事，请拆成两个独立提交，各自一个清晰的 message，别混在一起。', 'git add -p → 多次 commit'],
  ['改飞了要回退', '你刚才这版方向不对。用 git restore 把工作区恢复到上一次提交的状态，我们重来。', 'git restore .'],
  ['撤销提交但留改动', '撤销你上一个提交，但把改动保留在工作区，我想再调整一下。', 'git reset --soft HEAD~1'],
  ['救回误删的提交', '我可能不小心 reset 丢了一个提交。用 git reflog 找一下，把它恢复回来。', 'git reflog → git reset --hard <hash>'],
]

const BOUNDARY = [
  ['✅ 放心让 agent 自动做', '#3B6D11', ['git status / diff / log（只读，看状态和改动）', '本地 commit、写 commit message', '开 feature 分支、本地 stash']],
  ['⚠️ 让它做，但你先看一眼', '#854F0B', ['git reset --hard、git restore（会丢未提交的工作）', 'git rebase、解决冲突', '删除本地分支']],
  ['🛑 红线：必须你亲自把关', '#A32D2D', ['git push，尤其 git push --force', '合并进 main / 发 PR / 改写已推送的历史', 'git clean -fd（删未跟踪文件，不可逆）']],
]

const SLOPPY = `你：提交一下

→ agent 可能产出：
   commit -m "update files"
   （一次把无关改动混在一起、message 没信息量、
    甚至把调试用的 console.log 也提交了进去）`

const GOOD = `你：只提交「登录表单校验」这一处改动。
   message 用 feat(login): 加表单校验，
   正文说明校验了哪些字段、为什么。
   提交前先 git diff 确认没把调试代码一起带进去。

→ agent 产出：原子、规范、可追溯的一次提交`

function LoopDiagram() {
  return (
    <svg width="100%" viewBox="0 0 680 250" role="img">
      <title>AI coding 的 git 安全循环</title>
      <desc>先 commit 建立干净检查点，放手让 agent 改代码，用 git diff 审查；满意就 commit 存档进入下一轮，不满意就 git restore 回退重来。</desc>
      <defs>
        <marker id="lg" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#888780" /></marker>
        <marker id="lr" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#A32D2D" /></marker>
        <marker id="lt" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#0F6E56" /></marker>
      </defs>

      <line x1="156" y1="66" x2="174" y2="66" stroke="#888780" strokeWidth="1.6" markerEnd="url(#lg)" />
      <line x1="292" y1="66" x2="310" y2="66" stroke="#888780" strokeWidth="1.6" markerEnd="url(#lg)" />
      <line x1="428" y1="66" x2="446" y2="66" stroke="#888780" strokeWidth="1.6" markerEnd="url(#lg)" />

      <path d="M490 88 C420 122,330 128,300 150" fill="none" stroke="#A32D2D" strokeWidth="1.6" markerEnd="url(#lr)" />
      <text x="408" y="120" textAnchor="middle" className="t" style={{ fontSize: 10 }}>不满意 · 改飞了</text>
      <path d="M235 150 C232 124,236 110,236 90" fill="none" stroke="#A32D2D" strokeWidth="1.6" markerEnd="url(#lr)" />

      <path d="M520 88 L520 150" fill="none" stroke="#0F6E56" strokeWidth="1.6" markerEnd="url(#lt)" />
      <text x="540" y="124" textAnchor="start" className="t" style={{ fontSize: 10 }}>满意</text>
      <path d="M438 178 C260 240,150 210,98 90" fill="none" stroke="#0F6E56" strokeWidth="1.5" strokeDasharray="5 3" markerEnd="url(#lt)" />
      <text x="250" y="236" textAnchor="middle" className="t" style={{ fontSize: 10 }}>存档后进入下一轮</text>

      <g className="cc c-teal"><rect x="40" y="44" width="116" height="44" rx="8" /><text x="98" y="63" textAnchor="middle" className="th" style={{ fontSize: 13 }}>① 干净检查点</text><text x="98" y="79" textAnchor="middle" className="ts" style={{ fontSize: 10 }}>git commit</text></g>
      <g className="cc c-blue"><rect x="176" y="44" width="116" height="44" rx="8" /><text x="234" y="63" textAnchor="middle" className="th" style={{ fontSize: 13 }}>② 放手让 agent 改</text></g>
      <g className="cc c-amber"><rect x="312" y="44" width="116" height="44" rx="8" /><text x="370" y="63" textAnchor="middle" className="th" style={{ fontSize: 13 }}>③ git diff 审查</text></g>
      <g className="cc c-gray"><rect x="446" y="44" width="120" height="44" rx="8" /><text x="506" y="70" textAnchor="middle" className="th" style={{ fontSize: 13 }}>满意吗？</text></g>

      <g className="cc c-red"><rect x="160" y="150" width="150" height="44" rx="8" /><text x="235" y="169" textAnchor="middle" className="th" style={{ fontSize: 12 }}>回退重来</text><text x="235" y="185" textAnchor="middle" className="ts" style={{ fontSize: 10 }}>git restore / reset</text></g>
      <g className="cc c-teal"><rect x="446" y="150" width="170" height="44" rx="8" /><text x="531" y="169" textAnchor="middle" className="th" style={{ fontSize: 12 }}>存档新检查点</text><text x="531" y="185" textAnchor="middle" className="ts" style={{ fontSize: 10 }}>git commit</text></g>
    </svg>
  )
}

export default function AICoding() {
  const [mode, setMode] = useState('good')
  return (
    <div>
      <h1>在 AI coding 中用好本地 git</h1>
      <p>和 Claude Code、Codex 这类编程智能体一起写代码，是现在最主流的开发方式。这时 git 的角色变了——它不再只是"版本管理"，而是<strong style={{ fontWeight: 500 }}>你和 agent 之间的安全带和检查点协议</strong>。</p>
      <div className="note-callout" style={{ borderLeftColor: '#534AB7' }}>
        <strong style={{ fontWeight: 500 }}>认知升级：</strong>agent 改得又多又快，偶尔会改错、改飞、或理解偏了。<strong style={{ fontWeight: 500 }}>正因为每一步都能用 git 一键回退，你才敢放手让它大刀阔斧地干。</strong>不会 git，你只能小心翼翼；会 git，你能大胆试错。
      </div>

      <h2>核心心法：把每次 commit 当成一个存档点</h2>
      <p>像玩游戏打 checkpoint 一样用 git。让 agent 干活前先 commit 一次（工作区变干净），它改完你就能用 <code>git diff</code> 精确看到它动了什么；满意就再 commit 存档，不满意就一键读档回退。</p>
      <div className="card" style={{ marginTop: 12 }}><LoopDiagram /></div>

      <h2>会话里的 git 提示词模板（照着说就行）</h2>
      <p>颗粒度细到能直接复制进对话。左边是场景，中间是<strong style={{ fontWeight: 500 }}>对 agent 说的话</strong>，右边是它背后会执行的 git。</p>
      <table className="tbl">
        <thead><tr><th style={{ width: '20%' }}>场景</th><th>这样对 agent 说</th><th style={{ width: '22%' }}>背后的 git</th></tr></thead>
        <tbody>
          {PROMPTS.map(([s, p, g]) => (
            <tr key={s}><td><strong style={{ fontWeight: 500 }}>{s}</strong></td><td style={{ color: 'var(--color-text-secondary)' }}>「{p}」</td><td><code style={{ fontSize: 12 }}>{g}</code></td></tr>
          ))}
        </tbody>
      </table>

      <h2>同样一件事：随手说 vs 精心说</h2>
      <div style={{ display: 'flex', gap: 8, margin: '12px 0' }}>
        <button className={'chip' + (mode === 'sloppy' ? ' active' : '')} onClick={() => setMode('sloppy')}>随手说</button>
        <button className={'chip' + (mode === 'good' ? ' active' : '')} onClick={() => setMode('good')}>精心说 ✓</button>
      </div>
      <div className="codeblock" style={{ minHeight: 150 }}>{mode === 'sloppy' ? SLOPPY : GOOD}</div>
      <p style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>区别就三点：<strong style={{ fontWeight: 500 }}>给清范围</strong>（只提交哪一处）、<strong style={{ fontWeight: 500 }}>指定规范</strong>（message 格式）、<strong style={{ fontWeight: 500 }}>要求自查</strong>（提交前 git diff）。多说这三句话，换来的是一部干净可追溯的历史。</p>

      <h2>哪些放手让 agent 做，哪些你必须把关</h2>
      <p>给 agent 配 git 权限时，按这条线来——只读的放心自动，会丢东西的先看一眼，动远程/改历史的绝不自动放行。</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginTop: 12 }}>
        {BOUNDARY.map(([title, color, items]) => (
          <div key={title} className="card" style={{ borderTop: `3px solid ${color}` }}>
            <div style={{ fontWeight: 500, fontSize: 14, marginBottom: 8, color }}>{title}</div>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5, color: 'var(--color-text-secondary)' }}>
              {items.map((it) => <li key={it} style={{ marginBottom: 4 }}>{it}</li>)}
            </ul>
          </div>
        ))}
      </div>

      <h2>进阶一：把 git 约定写进 CLAUDE.md</h2>
      <p>与其每次会话都重复叮嘱，不如把团队的 git 规矩写进项目根目录的 <code>CLAUDE.md</code>（或 agent 的规则文件），让它每次都自动遵守：</p>
      <div className="codeblock">{`## Git 约定
- 所有改动走 feature/* 分支，不要直接提交到 main
- commit message 用 Conventional Commits（feat/fix/docs/refactor/chore）
- 每个逻辑改动一个独立提交，不要把无关改动混在一起
- 提交前先 git diff 自查，不要把调试代码 / console.log 提交进去
- 永远不要 git push --force；任何 push 前先问我`}</div>

      <h2>进阶二：多个 agent 并行？一人一个 worktree</h2>
      <p>想让两个 agent 同时干两件不相干的事，又不互相踩文件？给每个 agent 一个 <code>git worktree</code>——各自独立目录、独立分支，共享同一个 <code>.git</code>，物理隔离地并行。这正是"实战工作流"第 12 步那个能力，在多 agent 场景下尤其好用。</p>
      <div className="codeblock">{`# 给第二个 agent 开一个独立工作树和分支
git worktree add ../proj-agent2 -b feature/agent2-task main
# agent A 在原目录干活，agent B 在 ../proj-agent2 干活，互不干扰`}</div>

      <Pitfall items={PITFALLS.aicoding} />
      <Quiz title="自测 · AI coding 中的 git" items={QUIZZES.aicoding} />
    </div>
  )
}
