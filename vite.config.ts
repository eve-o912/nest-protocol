import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterPlugin } from '@tanstack/router-plugin'

export default defineConfig({
  plugins: [
    react(),
    TanStackRouterPlugin(),
  ],
})
