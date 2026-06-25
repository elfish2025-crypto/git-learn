import React, { useState } from 'react'
import Quiz from '../components/Quiz.jsx'
import { QUIZZES } from '../data.js'

const CONFLICT = `function greet(name) {
<<<<<<< HEAD
  return "你好, " + name + "!"
=======
  return \`Hi, \${name}\`
>>>>>>> feature/english
}`

const RESOLVED = `function greet(name) {
  return \`你好, \${name}!\`
}`

export default function Conflict() {
  const [view, setView] = useState('conflict')
  return (
    <div>
      <h1>合并冲突手把手</h1>
      <p>冲突不是事故，是 git 在<strong style={{ fontWeight: 500 }}>同一处两个人都改了</strong>时，老老实实把决定权交给你。它从不偷偷替你选——理解了冲突标记，解决冲突就是删几行字的事。</p>

      <h2>冲突标记长什么样</h2>
      <p>当 <code>git merge</code> 或 <code>git rebase</code> 遇到冲突，git 会把冲突文件改成这样，让你二选一（或都要、重写）：</p>

      <div style={{ display: 'flex', gap: 8, margin: '12px 0' }}>
        <button className={'chip' + (view === 'conflict' ? ' active' : '')} onClick={() => setView('conflict')}>① 冲突时</button>
        <button className={'chip' + (view === 'resolved' ? ' active' : '')} onClick={() => setView('resolved')}>② 解决后</button>
      </div>
      <div className="codeblock" style={{ minHeight: 130 }}>{view === 'conflict' ? CONFLICT : RESOLVED}</div>

      {view === 'conflict' ? (
        <table className="tbl">
          <thead><tr><th>标记</th><th>含义</th></tr></thead>
          <tbody>
            <tr><td><code>{'<<<<<<< HEAD'}</code></td><td>从这往下，是<strong style={{ fontWeight: 500 }}>你当前分支</strong>（HEAD）的版本</td></tr>
            <tr><td><code>=======</code></td><td>分隔线：上半是你的，下半是对方的</td></tr>
            <tr><td><code>{'>>>>>>> feature/english'}</code></td><td>到这为止，是<strong style={{ fontWeight: 500 }}>被合进来那条分支</strong>的版本</td></tr>
          </tbody>
        </table>
      ) : (
        <div className="note-callout" style={{ borderLeftColor: '#3B6D11' }}>
          解决 = 删掉 <code>{'<<<<<<<'}</code> / <code>=======</code> / <code>{'>>>>>>>'}</code> 三行标记，只留下你最终想要的内容（这里我们融合了两边：中文 + 模板字符串）。
        </div>
      )}

      <h2>解决冲突的标准三步</h2>
      <div className="codeblock">{`# 1. git status 会列出所有冲突文件（both modified）
git status

# 2. 打开每个冲突文件，删掉 <<< === >>> 标记，留下你要的内容

# 3. 标记为已解决，然后收尾
git add <冲突文件>
git commit                 # merge 场景：提交即完成
# 或 git rebase --continue  # rebase 场景：继续重放剩下的提交`}</div>

      <div className="note-callout" style={{ borderLeftColor: '#534AB7' }}>
        <strong style={{ fontWeight: 500 }}>记住这个对应关系：</strong>merge 冲突解决后用 <code>git commit</code>；rebase 冲突解决后用 <code>git rebase --continue</code>。它俩收尾命令不一样，但前面"改文件 + git add"是完全一样的。
      </div>

      <h2>三个实用逃生口</h2>
      <table className="tbl">
        <thead><tr><th>处境</th><th>命令</th></tr></thead>
        <tbody>
          <tr><td>太乱了，我不想合了，回到合并前</td><td><code>git merge --abort</code>（rebase 用 <code>git rebase --abort</code>）</td></tr>
          <tr><td>这个文件整个用我的版本</td><td><code>git checkout --ours &lt;文件&gt;</code> 后 <code>git add</code></td></tr>
          <tr><td>这个文件整个用对方的版本</td><td><code>git checkout --theirs &lt;文件&gt;</code> 后 <code>git add</code></td></tr>
        </tbody>
      </table>
      <p style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>提示：在 rebase 里，<code>ours</code> / <code>theirs</code> 的含义会反过来（因为是把你的提交重放到对方基底上），拿不准时优先手动看内容，别盲信 ours/theirs。</p>

      <Quiz title="自测 · 合并冲突" items={QUIZZES.conflict} />
    </div>
  )
}
