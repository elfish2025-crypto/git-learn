import React, { useState, useEffect } from 'react'
import Intro from './chapters/Intro.jsx'
import FourAreas from './chapters/FourAreas.jsx'
import ConceptMap from './chapters/ConceptMap.jsx'
import Workflow from './chapters/Workflow.jsx'
import DecisionTree from './chapters/DecisionTree.jsx'
import RemoteCollab from './chapters/RemoteCollab.jsx'
import Reference from './chapters/Reference.jsx'
import Cheatsheet from './chapters/Cheatsheet.jsx'

const CHAPTERS = [
  { id: 'intro', label: '开始这里', Comp: Intro },
  { id: 'fourareas', label: '四个区 · 数据流', Comp: FourAreas },
  { id: 'conceptmap', label: '概念怎么协作', Comp: ConceptMap },
  { id: 'workflow', label: '实战工作流', Comp: Workflow },
  { id: 'decision', label: '回退决策', Comp: DecisionTree },
  { id: 'remote', label: '远程协作', Comp: RemoteCollab },
  { id: 'reference', label: '概念与命令速查', Comp: Reference },
  { id: 'cheatsheet', label: '速查卡（可打印）', Comp: Cheatsheet },
]

export default function App() {
  const [active, setActive] = useState('intro')
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('git-learn-theme') || 'light' } catch { return 'light' }
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try { localStorage.setItem('git-learn-theme', theme) } catch { /* ignore */ }
  }, [theme])

  const go = (id) => { setActive(id); window.scrollTo(0, 0) }
  const Current = CHAPTERS.find((c) => c.id === active)?.Comp || Intro

  return (
    <div className="app">
      <nav className="sidebar">
        <div className="brand"><span className="dot" /> 学 git</div>
        <div className="brand-sub">分支是指针 · 提交是快照 · HEAD 是你站在哪</div>
        {CHAPTERS.map((c, i) => (
          <button key={c.id} className={'nav-item' + (active === c.id ? ' active' : '')} onClick={() => go(c.id)}>
            <span className="nav-num">{i}</span>{c.label}
          </button>
        ))}
      </nav>
      <main className="content">
        <div className="topbar no-print">
          <button className="btn" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            {theme === 'light' ? '🌙 深色' : '☀ 浅色'}
          </button>
        </div>
        <Current go={go} />
      </main>
    </div>
  )
}
