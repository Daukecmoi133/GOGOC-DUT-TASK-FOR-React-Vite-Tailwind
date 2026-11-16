import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/GOGOC-DUT-TASK-FOR-React-Vite-Tailwind/',
  plugins: [react(), tailwindcss()],
})