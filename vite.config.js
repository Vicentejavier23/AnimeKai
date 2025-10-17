import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 👇 usa el nombre EXACTO de tu repositorio en GitHub
export default defineConfig({
  plugins: [react()],
  base: '/AnimeKai/', // <--- importante: el nombre del repo
})

