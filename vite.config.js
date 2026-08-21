import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// En GitHub Actions usa /<repo>/ como base; en local, /
export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_REPOSITORY
    ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/`
    : '/',
})
