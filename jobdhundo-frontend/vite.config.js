import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Remove the tailwind() import if it's still there
export default defineConfig({
  plugins: [react()],
  base: "./",
})