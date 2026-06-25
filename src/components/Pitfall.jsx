import React from 'react'

export default function Pitfall({ title = '常见踩坑 & 避坑', items }) {
  return (
    <div className="pitfall">
      <div className="pitfall-head">⚠ {title}</div>
      {items.map((p, i) => (
        <div key={i} className="pitfall-item">
          <div className="pitfall-trap"><span style={{ color: '#E24B4A', fontWeight: 500 }}>✗ 坑</span>　{p.trap}</div>
          <div className="pitfall-fix"><span style={{ color: '#639922', fontWeight: 500 }}>✓ 避</span>　{p.fix}</div>
        </div>
      ))}
    </div>
  )
}
