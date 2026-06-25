import React, { useState, useEffect } from 'react'
import Quiz from '../components/Quiz.jsx'
import Pitfall from '../components/Pitfall.jsx'
import { WF_NODES, WF_EDGES, WF_STEPS, WF_BAND, WF_COL, WF_FILL, WF_LABELS, QUIZZES, PITFALLS } from '../data.js'

const N = {}
WF_NODES.forEach((n) => { N[n.id] = { ...n, x: WF_COL(n.col), y: WF_BAND[n.band] } })

function nstate(id, s) {
  if (id === 'P2') return s >= 4 ? 'dropped' : 'bad'
  if (id === 'P1') return s >= 8 ? 'aband' : 'live'
  return 'live'
}
function edgePath(a, b) {
  if (a.y === b.y) return `M${a.x} ${a.y} L${b.x} ${b.y}`
  const mx = a.x + (b.x - a.x) * 0.45
  return `M${a.x} ${a.y} C${mx} ${a.y},${b.x - (b.x - a.x) * 0.45} ${b.y},${b.x} ${b.y}`
}

function Graph({ step }) {
  const s = step
  const els = []
  // 泳道引导线 + 标签
  const bandseen = {}
  WF_NODES.forEach((n) => { if (n.rev <= s) bandseen[n.band] = Math.max(bandseen[n.band] || 0, N[n.id].x) })
  Object.keys(bandseen).forEach((bd) => {
    els.push(<line key={'gl' + bd} x1="64" y1={WF_BAND[bd]} x2={bandseen[bd]} y2={WF_BAND[bd]} stroke="var(--color-border-tertiary)" strokeWidth="1" />)
    els.push(<text key={'gt' + bd} x="6" y={WF_BAND[bd] + 4} style={{ fill: 'var(--color-text-secondary)', fontSize: 11 }}>{WF_LABELS[bd]}</text>)
  })
  // 边
  WF_EDGES.forEach((e, i) => {
    if (e[3] > s) return
    const a = N[e[0]], b = N[e[1]], ty = e[2]
    const sa = nstate(a.id, s), sb = nstate(b.id, s)
    const faded = (sa === 'dropped' || sa === 'aband' || sb === 'dropped' || sb === 'aband') && ty !== 'replay' && ty !== 'copy'
    let col = '#888780', dash = '', op = 1
    if (ty === 'replay') { col = '#BA7517'; dash = '5 3' }
    else if (ty === 'copy') { col = '#7F77DD'; dash = '5 3' }
    if (faded) { col = '#888780'; dash = '4 3'; op = 0.4 }
    els.push(<path key={'e' + i} d={edgePath(a, b)} fill="none" stroke={col} strokeWidth="1.6" strokeDasharray={dash || undefined} opacity={op} />)
  })
  // 节点
  WF_NODES.forEach((n) => {
    if (n.rev > s) return
    const { x: nx, y: ny } = N[n.id]
    const stt = nstate(n.id, s), f = WF_FILL[n.cat]
    const foc = WF_STEPS[s - 1].focus === n.id
    if (foc) {
      els.push(<circle key={n.id + 'h'} cx={nx} cy={ny} r="13" fill={f} opacity="0.18" />)
      els.push(<circle key={n.id + 'r'} cx={nx} cy={ny} r="13" fill="none" stroke={f} strokeWidth="2.5" />)
    }
    if (stt === 'dropped' || stt === 'aband') {
      els.push(<circle key={n.id} cx={nx} cy={ny} r="8" fill="var(--color-background-primary)" stroke="#888780" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.55" />)
      if (stt === 'dropped') els.push(<line key={n.id + 'x'} x1={nx - 7} y1={ny - 7} x2={nx + 7} y2={ny + 7} stroke="#888780" strokeWidth="1.5" opacity="0.7" />)
    } else if (n.cat === 'merge') {
      els.push(<circle key={n.id} cx={nx} cy={ny} r="9" fill={f} />)
      els.push(<circle key={n.id + 'i'} cx={nx} cy={ny} r="4" fill="var(--color-background-primary)" />)
    } else {
      els.push(<circle key={n.id} cx={nx} cy={ny} r="9" fill={f} />)
      if (n.cat === 'bad') els.push(<text key={n.id + 'b'} x={nx} y={ny + 3.5} textAnchor="middle" style={{ fill: '#fff', fontSize: 11, fontWeight: 500 }}>!</text>)
    }
    const lbl = n.id.replace('S1c', 'S1′').replace('P1r', 'P1′')
    els.push(<text key={n.id + 'l'} x={nx} y={n.band === 'main' ? ny - 14 : ny - 13} textAnchor="middle" style={{ fill: 'var(--color-text-tertiary)', fontSize: 9 }}>{lbl}</text>)
    if (n.tag) {
      const tw = n.tag.length * 6.5 + 10
      els.push(<rect key={n.id + 'tr'} x={nx - tw / 2} y={ny + 12} width={tw} height="15" rx="3" style={{ fill: 'var(--color-background-secondary)', stroke: 'var(--color-border-secondary)', strokeWidth: 0.5 }} />)
      els.push(<text key={n.id + 'tt'} x={nx} y={ny + 22.5} textAnchor="middle" style={{ fill: 'var(--color-text-secondary)', fontSize: 10 }}>{n.tag}</text>)
    }
  })
  return <svg width="100%" viewBox="0 0 680 372" style={{ display: 'block' }}>{els}</svg>
}

const LEGEND = [
  ['#5F5E5A', 'main'], ['#1D9E75', 'done'], ['#7F77DD', 'search'], ['#D85A30', 'priority'],
  ['#378ADD', 'export'], ['#E24B4A', '坏提交'], ['#BA7517', 'revert'],
]

export default function Workflow() {
  const [step, setStep] = useState(1)
  const d = WF_STEPS[step - 1]
  const MAX = WF_STEPS.length
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') setStep((s) => Math.min(MAX, s + 1))
      if (e.key === 'ArrowLeft') setStep((s) => Math.max(1, s - 1))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [MAX])
  return (
    <div>
      <h1>实战工作流：一个项目从 v1.0 到 v2.1</h1>
      <p>这是 git 在真实开发中怎么一步步用的全景：<strong style={{ fontWeight: 500 }}>并行分支、reset / revert 两种回退、rebase 解决冲突、cherry-pick 交叉搬运、worktree 并行热修复</strong>。点"下一步"或用 ← → 方向键逐步推进，每一步对照命令、HEAD 移动和"为什么这么做"。</p>

      <div className="card" style={{ marginTop: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13, color: 'var(--color-text-secondary)' }}>
          <span>⎇ {d.head} &nbsp;·&nbsp; 最新 tag: {d.tag}</span>
          <span style={{ color: 'var(--color-text-tertiary)' }}>第 {step} / {MAX} 步</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '10px 0 4px' }}>
          <button className="btn" disabled={step === 1} onClick={() => setStep(step - 1)}>‹ 上一步</button>
          <div aria-live="polite" style={{ flex: 1, textAlign: 'center', fontSize: 15, fontWeight: 500 }}>{d.t}</div>
          <button className="btn" disabled={step === MAX} onClick={() => setStep(step + 1)}>下一步 ›</button>
        </div>
        <div className="dots">
          {WF_STEPS.map((_, i) => (
            <button key={i} className="dot-btn" aria-label={'第' + (i + 1) + '步'}
              style={{ background: i + 1 === step ? 'var(--color-text-primary)' : (i + 1 < step ? 'var(--color-text-tertiary)' : 'var(--color-border-secondary)') }}
              onClick={() => setStep(i + 1)} />
          ))}
        </div>
        <Graph step={step} />
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', fontSize: 11, color: 'var(--color-text-secondary)', marginTop: 4 }}>
          {LEGEND.map(([c, l]) => (
            <span key={l} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <svg width="11" height="11"><circle cx="5.5" cy="5.5" r="5" fill={c} /></svg>{l}
            </span>
          ))}
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <svg width="13" height="11"><circle cx="6.5" cy="5.5" r="5" fill="none" stroke="#888780" strokeDasharray="3 2" /></svg>废弃/丢弃
          </span>
          <span>◎ 合并提交</span>
        </div>
      </div>

      <div className="codeblock" style={{ marginTop: 14 }}>{d.cmd}</div>
      <p style={{ marginTop: 10 }}>{d.what}</p>
      <div className="note-callout" style={{ borderLeftColor: d.color }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: d.color, marginBottom: 3 }}>{d.cl}</div>
        <div style={{ fontSize: 14 }}>{d.cc}</div>
      </div>
      <p style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>💡 心智模型：{d.model}</p>

      <Pitfall items={PITFALLS.workflow} />
      <Quiz title="自测 · 实战工作流" items={QUIZZES.workflow} />
    </div>
  )
}
