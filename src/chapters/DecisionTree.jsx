import React from 'react'
import Quiz from '../components/Quiz.jsx'
import Pitfall from '../components/Pitfall.jsx'
import { QUIZZES, PITFALLS } from '../data.js'

export default function DecisionTree() {
  return (
    <div>
      <h1>回退与搬运：reset / revert / rebase / cherry-pick 怎么选</h1>
      <p>先问自己一个问题：<strong style={{ fontWeight: 500 }}>我是想"撤销提交"，还是想"搬运/整理提交"？</strong> 撤销又分推没推送过。橙色 = 会改写历史（对已推送的要小心），青色 = 安全、不改写已有历史。</p>

      <div className="card" style={{ marginTop: 16 }}>
        <svg width="100%" viewBox="0 0 680 300" role="img">
          <title>reset / revert / rebase / cherry-pick 决策树</title>
          <path d="M340 64 C340 80,187 80,187 96" fill="none" stroke="#888780" strokeWidth="1.6" />
          <path d="M340 64 C340 80,496 80,496 96" fill="none" stroke="#888780" strokeWidth="1.6" />
          <path d="M187 130 L187 162" fill="none" stroke="#888780" strokeWidth="1.6" />
          <path d="M496 130 L496 162" fill="none" stroke="#888780" strokeWidth="1.6" />
          <path d="M187 194 C187 214,112 214,112 234" fill="none" stroke="#1D9E75" strokeWidth="1.6" />
          <path d="M187 194 C187 214,262 214,262 234" fill="none" stroke="#BA7517" strokeWidth="1.6" />
          <path d="M496 194 C496 214,420 214,420 234" fill="none" stroke="#BA7517" strokeWidth="1.6" />
          <path d="M496 194 C496 214,572 214,572 234" fill="none" stroke="#1D9E75" strokeWidth="1.6" />

          <text x="118" y="216" textAnchor="middle" className="t" style={{ fontSize: 10 }}>没推送</text>
          <text x="256" y="216" textAnchor="middle" className="t" style={{ fontSize: 10 }}>已推送</text>
          <text x="424" y="216" textAnchor="middle" className="t" style={{ fontSize: 10 }}>整条分支</text>
          <text x="566" y="216" textAnchor="middle" className="t" style={{ fontSize: 10 }}>单个提交</text>

          <g className="cc c-gray"><rect x="240" y="30" width="200" height="34" rx="6" /><text x="340" y="51" textAnchor="middle" className="th">我想干什么？</text></g>
          <g className="cc c-gray"><rect x="92" y="96" width="190" height="34" rx="6" /><text x="187" y="117" textAnchor="middle" className="th">撤销 / 丢弃某些提交</text></g>
          <g className="cc c-gray"><rect x="401" y="96" width="190" height="34" rx="6" /><text x="496" y="117" textAnchor="middle" className="th">搬运 / 整理提交</text></g>
          <g className="cc c-gray"><rect x="102" y="162" width="170" height="32" rx="6" /><text x="187" y="182" textAnchor="middle" className="ts">这些提交推送/共享过吗？</text></g>
          <g className="cc c-gray"><rect x="406" y="162" width="180" height="32" rx="6" /><text x="496" y="182" textAnchor="middle" className="ts">要整条分支，还是单个提交？</text></g>

          <g className="cc c-amber"><rect x="43" y="234" width="138" height="48" rx="6" /><text x="112" y="256" textAnchor="middle" className="th">reset</text><text x="112" y="272" textAnchor="middle" className="ts">改写历史·退回提交</text></g>
          <g className="cc c-teal"><rect x="193" y="234" width="138" height="48" rx="6" /><text x="262" y="256" textAnchor="middle" className="th">revert</text><text x="262" y="272" textAnchor="middle" className="ts">安全·反向提交抵消</text></g>
          <g className="cc c-amber"><rect x="351" y="234" width="138" height="48" rx="6" /><text x="420" y="256" textAnchor="middle" className="th">rebase</text><text x="420" y="272" textAnchor="middle" className="ts">改写历史·换基底重放</text></g>
          <g className="cc c-teal"><rect x="503" y="234" width="138" height="48" rx="6" /><text x="572" y="256" textAnchor="middle" className="th">cherry-pick</text><text x="572" y="272" textAnchor="middle" className="ts">安全·复制单个提交</text></g>
        </svg>
      </div>

      <h2>四个命令各干什么</h2>
      <table className="tbl">
        <thead><tr><th>命令</th><th>它到底做什么</th><th>什么时候用</th><th>改写历史?</th></tr></thead>
        <tbody>
          <tr><td><code>reset</code></td><td>把当前分支指针往回挪到某个提交</td><td>撤销本地、还没推送的提交；或把暂存区文件退回</td><td>✅ 会</td></tr>
          <tr><td><code>revert</code></td><td>新建一个"反向提交"抵消旧提交的改动</td><td>撤销已经 push、别人拉过的提交</td><td>❌ 不会</td></tr>
          <tr><td><code>rebase</code></td><td>把一串提交摘下来，复制重放到新的基底上</td><td>让落后分支跟上 main；把杂乱提交整理成线性</td><td>✅ 会</td></tr>
          <tr><td><code>cherry-pick</code></td><td>把指定的某个/某几个提交复制到当前分支</td><td>只想要别的分支上的某一两个提交</td><td>❌ 不改已有</td></tr>
        </tbody>
      </table>

      <h2>按"你的处境"反查</h2>
      <table className="tbl">
        <thead><tr><th>你的处境</th><th>用哪个</th><th>命令</th></tr></thead>
        <tbody>
          <tr><td>刚 commit 完发现写错了，还没 push</td><td>reset</td><td><code>git reset --hard HEAD~1</code></td></tr>
          <tr><td>想撤销提交但保留改动在工作区继续改</td><td>reset</td><td><code>git reset --soft HEAD~1</code></td></tr>
          <tr><td>只想把刚 git add 的文件取消暂存</td><td>reset</td><td><code>git reset HEAD &lt;file&gt;</code></td></tr>
          <tr><td>上线的提交有 bug，但已经 push 给团队了</td><td>revert</td><td><code>git revert &lt;hash&gt;</code></td></tr>
          <tr><td>我的分支落后 main 太多，想跟上且历史干净</td><td>rebase</td><td><code>git rebase main</code></td></tr>
          <tr><td>合并前想把自己几个零碎提交合并整理</td><td>rebase -i</td><td><code>git rebase -i HEAD~3</code></td></tr>
          <tr><td>别的分支修了个 bug，我也急着要那一个修复</td><td>cherry-pick</td><td><code>git cherry-pick &lt;hash&gt;</code></td></tr>
        </tbody>
      </table>

      <h2>三条保命铁律</h2>
      <ol>
        <li><strong style={{ fontWeight: 500 }}>私有用 reset，公开用 revert。</strong> 判断标准只有一个——推没推送过。</li>
        <li><strong style={{ fontWeight: 500 }}>rebase / reset --hard 之前，确认没把别人的提交一起改写。</strong> 黄金法则：不要 rebase 已经 push 且别人在用的分支。</li>
        <li><strong style={{ fontWeight: 500 }}>reset --hard 不是真删除——有后悔药。</strong> 被丢的提交进 reflog，90 天内能捞回：<code>git reflog</code> 找 hash，<code>git reset --hard &lt;hash&gt;</code> 救回。</li>
      </ol>

      <Pitfall items={PITFALLS.decision} />
      <Quiz title="自测 · 回退与搬运" items={QUIZZES.undo} />
    </div>
  )
}
