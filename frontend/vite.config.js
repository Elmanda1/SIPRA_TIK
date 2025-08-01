import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    host: true,
    open: true,
    proxy: {
      '/api': 'http://localhost:5000'
    }
  },
  build: {
    sourcemap: true
  }
})