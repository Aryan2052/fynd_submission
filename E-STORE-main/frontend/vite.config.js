import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "https://fynd-submission.onrender.com",  // Proxy /api requests to deployed backend
    }
  }
})
