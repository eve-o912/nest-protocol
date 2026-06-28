import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterPlugin } from '@tanstack/router-plugin/vite'

export default defineConfig({
  plugins: [
    react(),
    TanStackRouterPlugin(),
  ],
})
