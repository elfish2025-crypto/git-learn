import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' 让构建产物用相对路径，dist 里的 index.html 双击（file://）也能打开
export default defineConfig({
  plugins: [react()],
  base: './',
})
