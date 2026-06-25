import React, { useState } from 'react'

function QuizItem({ item, index }) {
  const [picked, setPicked] = useState(null)
  const answered = picked !== null
  return (
    <div className="quiz">
      <div className="quiz-q">{index + 1}. {item.q}</div>
      {item.o.map((opt, i) => {
        let cls = 'quiz-opt'
        if (answered && opt.c) cls += ' correct'
        if (answered && i === picked && !opt.c) cls += ' wrong'
        return (
          <button key={i} className={cls} disabled={answered} onClick={() => setPicked(i)}>
            {opt.c && answered ? '✓ ' : ''}{!opt.c && answered && i === picked ? '✗ ' : ''}{opt.t}
          </button>
        )
      })}
      {answered && (
        <div className="quiz-explain">
          <strong style={{ fontWeight: 500 }}>{item.o[picked].c ? '答对了！' : '再想想'}</strong> — {item.e}
        </div>
      )}
    </div>
  )
}

export default function Quiz({ title = '自测', items }) {
  return (
    <section>
      <h3>{title}</h3>
      {items.map((it, i) => <QuizItem key={i} item={it} index={i} />)}
    </section>
  )
}
