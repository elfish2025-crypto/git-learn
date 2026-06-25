import React from 'react'
import Quiz from '../components/Quiz.jsx'
import Pitfall from '../components/Pitfall.jsx'
import { QUIZZES, PITFALLS } from '../data.js'

export default function Stash() {
  return (
    <div>
      <h1>git stash 实战</h1>
      <p>场景：你正改到一半，突然要切到别的分支救急。但 git 不让你带着一堆未提交的脏改动切分支。这时不必为了切分支硬凑一个垃圾提交——<strong style={{ fontWeight: 500 }}>把改动塞进"抽屉"</strong>就好。</p>

      <h2>stash 是一个栈（后进先出）</h2>
      <div className="card" style={{ marginTop: 12 }}>
        <svg width="100%" viewBox="0 0 680 210" role="img">
          <title>git stash 把工作区改动压进一个栈</title>
          <defs>
            <marker id="sA" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#854F0B" /></marker>
            <marker id="sB" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#0F6E56" /></marker>
          </defs>

          <path d="M196 70 Q300 38 404 70" fill="none" stroke="#854F0B" strokeWidth="1.7" markerEnd="url(#sA)" />
          <text x="300" y="38" textAnchor="middle" className="t" style={{ fontSize: 12 }}>git stash （压入，工作区变干净）</text>
          <path d="M404 150 Q300 184 196 150" fill="none" stroke="#0F6E56" strokeWidth="1.7" markerEnd="url(#sB)" />
          <text x="300" y="180" textAnchor="middle" className="t" style={{ fontSize: 12 }}>git stash pop （弹出并删除）</text>

          <g className="cc c-coral"><rect x="44" y="78" width="152" height="64" rx="8" /><text x="120" y="104" textAnchor="middle" className="th">工作区</text><text x="120" y="123" textAnchor="middle" className="ts">改到一半的脏改动</text></g>

          <g className="cc c-amber"><rect x="404" y="44" width="232" height="30" rx="6" /><text x="520" y="64" textAnchor="middle" className="t" style={{ fontSize: 12 }}>stash@&#123;0&#125; 最近一次（栈顶）</text></g>
          <g className="cc c-amber"><rect x="404" y="80" width="232" height="30" rx="6" /><text x="520" y="100" textAnchor="middle" className="t" style={{ fontSize: 12 }}>stash@&#123;1&#125;</text></g>
          <g className="cc c-amber"><rect x="404" y="116" width="232" height="30" rx="6" /><text x="520" y="136" textAnchor="middle" className="t" style={{ fontSize: 12 }}>stash@&#123;2&#125; 更早</text></g>
          <text x="520" y="166" textAnchor="middle" className="t" style={{ fontSize: 11 }}>抽屉是一个栈，可以塞多个</text>
        </svg>
      </div>

      <h2>最常用的流程</h2>
      <div className="codeblock">{`# 正改着 feature 分支，突然要切去修线上 bug
git stash                  # 收起改动，工作区瞬间变干净
git switch main            # 现在能自由切分支了
# ...修 bug、提交、切回来...
git switch feature/xxx
git stash pop              # 把改动取回来，继续干`}</div>

      <h2>常用命令</h2>
      <table className="tbl">
        <thead><tr><th>命令</th><th>作用</th></tr></thead>
        <tbody>
          <tr><td><code>git stash</code></td><td>把未提交改动压进栈，工作区变干净</td></tr>
          <tr><td><code>git stash -u</code></td><td>连未跟踪的新文件一起收（默认不收 untracked）</td></tr>
          <tr><td><code>git stash push -m "说明"</code></td><td>压栈时加一句备注，方便日后辨认</td></tr>
          <tr><td><code>git stash list</code></td><td>看抽屉里都有啥</td></tr>
          <tr><td><code>git stash pop</code></td><td>取回栈顶改动，并从栈里删除</td></tr>
          <tr><td><code>git stash apply</code></td><td>取回但保留在栈里（可应用到多个分支）</td></tr>
          <tr><td><code>git stash drop</code></td><td>丢掉栈顶那条</td></tr>
          <tr><td><code>git stash clear</code></td><td>清空整个抽屉（慎用）</td></tr>
        </tbody>
      </table>

      <div className="note-callout" style={{ borderLeftColor: '#854F0B' }}>
        <strong style={{ fontWeight: 500 }}>stash vs worktree：</strong>两者都解决"做一半被打断"。stash 轻量、适合<strong style={{ fontWeight: 500 }}>短暂</strong>切换（收起→切走→很快回来）；worktree 重一点但能让两条线<strong style={{ fontWeight: 500 }}>同时存在</strong>，适合需要长时间并行、来回对照的场景（见"实战工作流"第 12 步）。
      </div>

      <Pitfall items={PITFALLS.stash} />
      <Quiz title="自测 · git stash" items={QUIZZES.stash} />
    </div>
  )
}
