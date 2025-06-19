import { defineConfig } from 'rolldown-vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  define: {
    'import.meta.env.VITE_BUNDLER': JSON.stringify('Rolldown-Vite')
  }
})