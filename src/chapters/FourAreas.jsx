import React from 'react'
import Quiz from '../components/Quiz.jsx'
import { QUIZZES } from '../data.js'

export default function FourAreas() {
  return (
    <div>
      <h1>git 的四个区：命令到底在搬什么</h1>
      <p>理解了这张图，80% 的命令你就知道它在干嘛了。git 的所有日常操作，本质就是在下面这 4 个"区"之间搬数据：向右是逐步保存（add → commit → push），向左是取回/撤销。</p>

      <div className="card" style={{ marginTop: 16 }}>
        <svg width="100%" viewBox="0 0 680 292" role="img">
          <title>git 的四个区与命令数据流</title>
          <defs>
            <marker id="aT" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#1D9E75" /></marker>
            <marker id="aG" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#888780" /></marker>
            <marker id="aB" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#378ADD" /></marker>
          </defs>

          <path d="M95 118 Q258 32 421 118" fill="none" stroke="#1D9E75" strokeWidth="1.5" strokeDasharray="5 3" markerEnd="url(#aT)" />
          <text x="258" y="38" textAnchor="middle" className="t" style={{ fontSize: 11 }}>git commit -am （跳过暂存区）</text>

          <path d="M150 118 Q176 96 203 118" fill="none" stroke="#1D9E75" strokeWidth="1.6" markerEnd="url(#aT)" />
          <path d="M313 118 Q339 96 366 118" fill="none" stroke="#1D9E75" strokeWidth="1.6" markerEnd="url(#aT)" />
          <path d="M476 118 Q502 96 529 118" fill="none" stroke="#1D9E75" strokeWidth="1.6" markerEnd="url(#aT)" />
          <text x="176" y="92" textAnchor="middle" className="t" style={{ fontSize: 11 }}>git add</text>
          <text x="339" y="92" textAnchor="middle" className="t" style={{ fontSize: 11 }}>git commit</text>
          <text x="502" y="92" textAnchor="middle" className="t" style={{ fontSize: 11 }}>git push</text>

          <path d="M203 186 Q176 208 150 186" fill="none" stroke="#888780" strokeWidth="1.6" markerEnd="url(#aG)" />
          <path d="M366 186 Q339 208 313 186" fill="none" stroke="#888780" strokeWidth="1.6" markerEnd="url(#aG)" />
          <path d="M529 186 Q502 208 476 186" fill="none" stroke="#888780" strokeWidth="1.6" markerEnd="url(#aG)" />
          <text x="176" y="224" textAnchor="middle" className="t" style={{ fontSize: 10 }}>restore --staged</text>
          <text x="339" y="224" textAnchor="middle" className="t" style={{ fontSize: 10 }}>reset / restore</text>
          <text x="502" y="224" textAnchor="middle" className="t" style={{ fontSize: 10 }}>git fetch</text>

          <path d="M584 186 Q340 272 95 186" fill="none" stroke="#378ADD" strokeWidth="1.6" markerEnd="url(#aB)" />
          <text x="340" y="264" textAnchor="middle" className="t" style={{ fontSize: 11 }}>git pull  =  git fetch + git merge</text>

          <g className="cc c-coral"><rect x="40" y="118" width="110" height="68" rx="8" /><text x="95" y="146" textAnchor="middle" className="th">工作区</text><text x="95" y="165" textAnchor="middle" className="ts">你编辑的文件</text></g>
          <g className="cc c-amber"><rect x="203" y="118" width="110" height="68" rx="8" /><text x="258" y="146" textAnchor="middle" className="th">暂存区</text><text x="258" y="165" textAnchor="middle" className="ts">待提交 index</text></g>
          <g className="cc c-teal"><rect x="366" y="118" width="110" height="68" rx="8" /><text x="421" y="146" textAnchor="middle" className="th">本地仓库</text><text x="421" y="165" textAnchor="middle" className="ts">.git 历史</text></g>
          <g className="cc c-blue"><rect x="529" y="118" width="110" height="68" rx="8" /><text x="584" y="146" textAnchor="middle" className="th">远程仓库</text><text x="584" y="165" textAnchor="middle" className="ts">GitHub 等</text></g>
        </svg>
      </div>

      <h2>一句话记住</h2>
      <p><code>git add</code> 把改动放进暂存区，<code>git commit</code> 把暂存区固化成历史快照，<code>git push</code> 把本地历史传到远程。撤销就是反着走。</p>

      <h2>为什么要有"暂存区"这一层？</h2>
      <p>很多人一开始觉得 add 多余。它的价值在于：让你<strong style={{ fontWeight: 500 }}>挑选</strong>这次要提交什么。你可能改了 5 个文件，但其中 2 个属于功能 A、3 个属于功能 B——通过 <code>git add</code> 分两次暂存、分两次提交，历史就清清楚楚，而不是混成一坨。</p>

      <Quiz title="自测 · 四个区" items={QUIZZES.basics} />
    </div>
  )
}
