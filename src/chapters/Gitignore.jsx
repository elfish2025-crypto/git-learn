import React from 'react'

export default function Gitignore() {
  return (
    <div>
      <h1>.gitignore 详解</h1>
      <p><code>.gitignore</code> 是一个放在仓库里的文本文件，列出"不让 git 跟踪"的文件。它的作用是把<strong style={{ fontWeight: 500 }}>构建产物、依赖、密钥、系统垃圾</strong>挡在仓库外——这些东西要么能重新生成、要么不该公开、要么只属于你这台机器。</p>

      <div className="note-callout" style={{ borderLeftColor: '#A32D2D' }}>
        <strong style={{ fontWeight: 500 }}>这正是你这个项目刚踩过的点：</strong>第一次 push 前如果没有 .gitignore，45MB 的 <code>node_modules/</code> 会被一起提交进去，又大又没必要（别人 <code>npm install</code> 就能生成）。
      </div>

      <h2>匹配规则速查</h2>
      <table className="tbl">
        <thead><tr><th>写法</th><th>含义</th><th>例子</th></tr></thead>
        <tbody>
          <tr><td><code>node_modules/</code></td><td>结尾带 / 只忽略<strong style={{ fontWeight: 500 }}>目录</strong></td><td>忽略整个 node_modules 文件夹</td></tr>
          <tr><td><code>*.log</code></td><td><code>*</code> 通配，忽略所有 .log 文件</td><td>error.log、debug.log</td></tr>
          <tr><td><code>build</code></td><td>不带 / 时，同名文件和目录都忽略</td><td>build 文件 或 build/ 目录</td></tr>
          <tr><td><code>/config.js</code></td><td>开头带 / 只匹配<strong style={{ fontWeight: 500 }}>仓库根</strong>那一个</td><td>根目录的 config.js，不含子目录的</td></tr>
          <tr><td><code>doc/**/*.pdf</code></td><td><code>**</code> 匹配任意层级目录</td><td>doc 下任意深度的 pdf</td></tr>
          <tr><td><code>!important.log</code></td><td><code>!</code> 取反，把已忽略的<strong style={{ fontWeight: 500 }}>重新纳入</strong></td><td>忽略所有 .log，但保留 important.log</td></tr>
          <tr><td><code># 注释</code></td><td><code>#</code> 开头是注释行</td><td>给规则分组写说明</td></tr>
        </tbody>
      </table>

      <h2>本项目用的 .gitignore（一个典型范例）</h2>
      <div className="codeblock">{`# 依赖（npm install 能重新生成）
node_modules/

# 构建产物（npm run build 能重新生成）
dist/

# 日志
*.log

# 环境变量 / 密钥（绝不能进仓库）
.env
.env.local

# 系统 / 编辑器垃圾
.DS_Store
.vscode/*
.idea/`}</div>

      <h2>最容易踩的坑：文件已经被跟踪了，加 .gitignore 没用</h2>
      <p><code>.gitignore</code> 只对<strong style={{ fontWeight: 500 }}>还没被 git 跟踪</strong>的文件生效。如果一个文件之前已经 <code>git add</code> 过、进了仓库，再把它写进 .gitignore 是<strong style={{ fontWeight: 500 }}>不起作用</strong>的——git 已经在管它了。要先把它从跟踪中移除：</p>
      <div className="codeblock">{`# 把文件移出 git 跟踪，但保留在你磁盘上（--cached 是关键）
git rm --cached <文件>
git rm -r --cached node_modules/    # 目录加 -r

# 然后把它写进 .gitignore，再提交
git add .gitignore
git commit -m "chore: 停止跟踪 node_modules"`}</div>
      <div className="note-callout" style={{ borderLeftColor: '#534AB7' }}>
        <code>--cached</code> 表示"只从仓库移除、别删我硬盘上的文件"。漏了它，<code>git rm</code> 会把你本地文件也删掉。
      </div>

      <h2>两个省事的小技巧</h2>
      <ul>
        <li>不知道某类项目该忽略啥？去 <a href="https://github.com/github/gitignore" target="_blank" rel="noreferrer">github/gitignore</a> 抄官方模板（Node、Python、Java… 都有）。</li>
        <li>想验证某个文件到底被哪条规则挡住了：<code>git check-ignore -v &lt;文件&gt;</code> 会告诉你命中了 .gitignore 的第几行。</li>
      </ul>
    </div>
  )
}
