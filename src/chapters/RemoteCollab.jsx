import React from 'react'
import Quiz from '../components/Quiz.jsx'
import Pitfall from '../components/Pitfall.jsx'
import { QUIZZES, PITFALLS } from '../data.js'

export default function RemoteCollab() {
  return (
    <div>
      <h1>远程协作：从一个人到一个团队</h1>
      <p>前面几章都是本地。真正的开发是多人围着同一个远程仓库（GitHub/GitLab）协作。这一章补上最后一块拼图：代码怎么在你、远程、同事之间流转，以及 PR 和远程冲突怎么处理。</p>

      <div className="card" style={{ marginTop: 16 }}>
        <svg width="100%" viewBox="0 0 680 256" role="img">
          <title>团队通过远程仓库协作的数据流</title>
          <defs>
            <marker id="rA" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#185FA5" /></marker>
            <marker id="rB" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#0F6E56" /></marker>
          </defs>

          <path d="M168 96 Q258 70 330 96" fill="none" stroke="#185FA5" strokeWidth="1.7" markerEnd="url(#rA)" />
          <text x="252" y="70" textAnchor="middle" className="t" style={{ fontSize: 11 }}>git push</text>
          <path d="M330 130 Q258 158 168 130" fill="none" stroke="#0F6E56" strokeWidth="1.7" markerEnd="url(#rB)" />
          <text x="252" y="172" textAnchor="middle" className="t" style={{ fontSize: 11 }}>git pull / fetch</text>

          <path d="M512 96 Q422 70 350 96" fill="none" stroke="#185FA5" strokeWidth="1.7" markerEnd="url(#rA)" />
          <text x="428" y="70" textAnchor="middle" className="t" style={{ fontSize: 11 }}>git push</text>
          <path d="M350 130 Q422 158 512 130" fill="none" stroke="#0F6E56" strokeWidth="1.7" markerEnd="url(#rB)" />
          <text x="428" y="172" textAnchor="middle" className="t" style={{ fontSize: 11 }}>git pull / fetch</text>

          <g className="cc c-coral"><rect x="40" y="92" width="128" height="44" rx="8" /><text x="104" y="111" textAnchor="middle" className="th">你的本地仓库</text><text x="104" y="127" textAnchor="middle" className="ts">git clone 来的</text></g>
          <g className="cc c-blue"><rect x="278" y="86" width="124" height="56" rx="8" /><text x="340" y="108" textAnchor="middle" className="th">远程仓库</text><text x="340" y="125" textAnchor="middle" className="ts">GitHub · origin</text></g>
          <g className="cc c-coral"><rect x="512" y="92" width="128" height="44" rx="8" /><text x="576" y="111" textAnchor="middle" className="th">同事的本地</text><text x="576" y="127" textAnchor="middle" className="ts">他也 clone 了</text></g>

          <text x="340" y="206" textAnchor="middle" className="t" style={{ fontSize: 12 }}>大家都围着中间这份"远程仓库"推和拉，它是唯一的事实来源</text>
          <text x="340" y="226" textAnchor="middle" className="t" style={{ fontSize: 11 }}>origin/main 是远程在你本地的"镜像指针"，记录远程到哪了</text>
        </svg>
      </div>

      <h2>典型的团队工作流（PR / Pull Request）</h2>
      <p>现代团队几乎不直接往 main 上 push，而是走 <strong style={{ fontWeight: 500 }}>分支 + PR 评审</strong>：</p>
      <div className="codeblock">{`# 1. 同步最新 main
git switch main && git pull

# 2. 开自己的特性分支
git switch -c feature/login

# 3. 干活、提交
git add . && git commit -m "feat: 登录页"

# 4. 推到远程（首次用 -u 建立跟踪）
git push -u origin feature/login

# 5. 在 GitHub 上发起 Pull Request，请同事 review
#    评审通过后，在网页上点 "Merge" 合进 main

# 6. 合并后清理
git switch main && git pull
git branch -d feature/login`}</div>
      <div className="note-callout" style={{ borderLeftColor: '#534AB7' }}>
        <strong style={{ fontWeight: 500 }}>为什么走 PR？</strong> 它给团队一个"代码进 main 之前先被看一眼"的关口——讨论、跑 CI、留下记录。main 因此始终保持可发布状态。
      </div>

      <h2>fetch、pull、pull --rebase 的区别</h2>
      <table className="tbl">
        <thead><tr><th>命令</th><th>做什么</th><th>什么时候用</th></tr></thead>
        <tbody>
          <tr><td><code>git fetch</code></td><td>只下载远程更新到 origin/*，不动你的工作区</td><td>想先看看远程有啥变化，再决定怎么合</td></tr>
          <tr><td><code>git pull</code></td><td>fetch + merge，自动合并进当前分支</td><td>日常同步；可能产生 merge 提交</td></tr>
          <tr><td><code>git pull --rebase</code></td><td>fetch + rebase，把你的提交重放到远程最新之上</td><td>想要线性历史、少一堆 merge 提交（团队常设为默认）</td></tr>
        </tbody>
      </table>

      <h2>远程冲突怎么办</h2>
      <p>当你 push 被拒（"rejected"），通常是因为远程已经有了你本地没有的提交。流程是：</p>
      <div className="codeblock">{`git pull --rebase          # 先把远程的新提交拉下来，把你的提交接在后面
# 如果有冲突：手动改好冲突文件
git add <冲突文件>
git rebase --continue      # 继续
git push                   # 现在能推上去了`}</div>
      <p style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>冲突不可怕：git 只是遇到"同一处两个人都改了"，不敢替你决定，把选择权交给你。打开文件，删掉 <code>{'<<<<<<< ======= >>>>>>>'}</code> 标记、留下你要的内容即可。</p>

      <div className="note-callout" style={{ borderLeftColor: '#A32D2D' }}>
        <strong style={{ fontWeight: 500 }}>一条红线：</strong>永远不要对已经 push、别人在用的分支用 <code>git push --force</code>。它会抹掉别人的提交。万不得已要改写已推送历史，用 <code>--force-with-lease</code>（更安全，会先检查没覆盖别人的新提交）。
      </div>

      <Pitfall items={PITFALLS.remote} />
      <Quiz title="自测 · 远程协作" items={QUIZZES.remote} />
    </div>
  )
}
