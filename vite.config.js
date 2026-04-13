import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main:   resolve(__dirname, 'index.html'),
        aiForm: resolve(__dirname, 'ai-form.html'),
      },
    },
  },
  server: {
    port: 5173,
    open: true,
  },
})
