import React, { useState } from 'react'
import { CM_FOCUS, CM_ALL, CM_NOTE, CM_CHIPS } from '../data.js'

export default function ConceptMap() {
  const [sel, setSel] = useState('all')
  const keep = sel === 'all' ? null : CM_FOCUS[sel]
  const op = (id) => (!keep || keep.indexOf(id) >= 0) ? 1 : 0.16
  const g = (id, children) => <g id={'g-' + id} style={{ opacity: op(id), transition: 'opacity .2s' }}>{children}</g>
  const note = CM_NOTE[sel]

  return (
    <div>
      <h1>概念之间怎么协作</h1>
      <p>把 git 的概念当作节点、它们之间的"协作关系"当作箭头，箭头上标的就是触发这个协作的命令。点下面的概念，会高亮它和谁协作，并在备注栏展开说明 + 命令。</p>
      <p>一句话先记住：<strong style={{ fontWeight: 500 }}>git 的全部协作 = 一堆"指针"（紫色胶囊）和"快照"（圆）在互相指、互相移动。</strong></p>

      <div className="card" style={{ marginTop: 16 }}>
        <svg width="100%" viewBox="0 0 680 330" role="img">
          <defs>
            <marker id="mT" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#1D9E75" /></marker>
            <marker id="mG" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#888780" /></marker>
            <marker id="mP" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#7F77DD" /></marker>
            <marker id="mB" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#378ADD" /></marker>
          </defs>

          {g('addE', <><line x1="158" y1="76" x2="194" y2="76" stroke="#1D9E75" strokeWidth="1.7" markerEnd="url(#mT)" /><text x="176" y="44" textAnchor="middle" style={{ fill: 'var(--color-text-secondary)', fontSize: 11 }}>git add</text></>)}
          {g('commitE', <><path d="M255 100 Q330 150 430 169" fill="none" stroke="#1D9E75" strokeWidth="1.7" markerEnd="url(#mT)" /><text x="333" y="140" textAnchor="middle" style={{ fill: 'var(--color-text-secondary)', fontSize: 11 }}>git commit</text></>)}
          {g('parent', <><line x1="427" y1="182" x2="319" y2="182" stroke="#888780" strokeWidth="1.6" strokeDasharray="4 3" markerEnd="url(#mG)" /><text x="373" y="170" textAnchor="middle" style={{ fill: 'var(--color-text-tertiary)', fontSize: 10 }}>parent · 历史链</text></>)}
          {g('mainref', <><line x1="528" y1="130" x2="464" y2="176" stroke="#7F77DD" strokeWidth="1.6" strokeDasharray="4 3" markerEnd="url(#mP)" /><text x="500" y="146" textAnchor="end" style={{ fill: 'var(--color-text-tertiary)', fontSize: 10 }}>指向</text></>)}
          {g('headE', <><line x1="566" y1="80" x2="566" y2="105" stroke="#7F77DD" strokeWidth="1.6" markerEnd="url(#mP)" /><text x="528" y="97" textAnchor="end" style={{ fill: 'var(--color-text-secondary)', fontSize: 10 }}>git switch</text></>)}
          {g('tagE', <><line x1="300" y1="238" x2="300" y2="202" stroke="#7F77DD" strokeWidth="1.6" strokeDasharray="4 3" markerEnd="url(#mP)" /><text x="338" y="223" textAnchor="start" style={{ fill: 'var(--color-text-tertiary)', fontSize: 10 }}>钉住</text></>)}
          {g('pushE', <><line x1="573" y1="135" x2="573" y2="228" stroke="#378ADD" strokeWidth="1.7" markerEnd="url(#mB)" /><text x="585" y="186" textAnchor="start" style={{ fill: 'var(--color-text-secondary)', fontSize: 10 }}>git push</text></>)}
          {g('pullE', <><line x1="557" y1="228" x2="557" y2="135" stroke="#378ADD" strokeWidth="1.7" markerEnd="url(#mB)" /><text x="545" y="186" textAnchor="end" style={{ fill: 'var(--color-text-secondary)', fontSize: 10 }}>git fetch / pull</text></>)}

          {g('work', <g className="cc c-coral"><rect x="40" y="52" width="118" height="48" rx="8" /><text x="99" y="73" textAnchor="middle" className="th">工作区</text><text x="99" y="90" textAnchor="middle" className="ts">你编辑的文件</text></g>)}
          {g('index', <g className="cc c-amber"><rect x="196" y="52" width="118" height="48" rx="8" /><text x="255" y="73" textAnchor="middle" className="th">暂存区</text><text x="255" y="90" textAnchor="middle" className="ts">index · 待提交</text></g>)}
          {g('c1', <><g className="cc c-teal"><circle cx="300" cy="182" r="17" /><text x="300" y="186" textAnchor="middle" className="th" style={{ fontSize: 11 }}>C1</text></g><text x="300" y="216" textAnchor="middle" style={{ fill: 'var(--color-text-secondary)', fontSize: 10 }}>父提交</text></>)}
          {g('c2', <><g className="cc c-teal"><circle cx="446" cy="182" r="17" /><text x="446" y="186" textAnchor="middle" className="th" style={{ fontSize: 11 }}>C2</text></g><text x="446" y="216" textAnchor="middle" style={{ fill: 'var(--color-text-secondary)', fontSize: 10 }}>最新提交</text></>)}
          {g('main', <g className="cc c-purple"><rect x="524" y="106" width="84" height="28" rx="14" /><text x="566" y="124" textAnchor="middle" className="t" style={{ fontSize: 12 }}>main 分支</text></g>)}
          {g('head', <g className="cc c-purple"><rect x="532" y="53" width="68" height="27" rx="13" /><text x="566" y="70" textAnchor="middle" className="t" style={{ fontSize: 12 }}>HEAD</text></g>)}
          {g('tag', <g className="cc c-purple"><rect x="262" y="238" width="76" height="26" rx="13" /><text x="300" y="255" textAnchor="middle" className="t" style={{ fontSize: 11 }}>tag v1.0</text></g>)}
          {g('remote', <g className="cc c-blue"><rect x="506" y="228" width="118" height="48" rx="8" /><text x="565" y="249" textAnchor="middle" className="th">远程仓库</text><text x="565" y="266" textAnchor="middle" className="ts">GitHub 等</text></g>)}
        </svg>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', fontSize: 11, color: 'var(--color-text-secondary)', marginTop: 4 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><svg width="13" height="13"><circle cx="6.5" cy="6.5" r="5.5" fill="#1D9E75" /></svg>圆 = 提交（快照，不可变）</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><svg width="20" height="13"><rect x="0" y="1" width="20" height="11" rx="5.5" fill="#7F77DD" /></svg>紫胶囊 = 指针（分支/HEAD/tag）</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><svg width="15" height="13"><rect x="0" y="1" width="15" height="11" rx="2" fill="#888780" /></svg>方框 = 文件区 / 远程</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', margin: '14px 0' }}>
        {CM_CHIPS.map(([k, label]) => (
          <button key={k} className={'chip' + (sel === k ? ' active' : '')} onClick={() => setSel(k)}>{label}</button>
        ))}
      </div>

      <div className="card">
        <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 6 }}>{note.t}</div>
        <div style={{ fontSize: 14 }}>{note.b}</div>
        {note.c.length > 0 && (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
            {note.c.map((cmd) => <span key={cmd} className="cmd-pill">{cmd}</span>)}
          </div>
        )}
      </div>
    </div>
  )
}
