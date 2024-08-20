import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://bakhtiyark.github.io/shadowrootexample',
  plugins: [react()],
})
