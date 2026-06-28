import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouter } from '@tanstack/router-plugin/vite'

export default defineConfig({
  plugins: [
    TanStackRouter(),
    react(),
  ],
})
