import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Or the port Vercel dev is using, if different
        changeOrigin: true,
        secure: false,  // Set to `true` if your target is HTTPS
      },
    },
  },
})