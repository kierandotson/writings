import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// For GitHub Pages: set BASE_PATH to /repo-name/ when building for project pages.
// Leave unset (or '/') for custom domain or user site at root.
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [vue()],
})
