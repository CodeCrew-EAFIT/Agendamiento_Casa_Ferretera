import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  plugins: [react()],
  ...(process.env.NODE_ENV === 'production'
    ? {
        server: {
          port: 3000,
          strictPort: true,
          host: true,
          origin: 'http://0.0.0.0:3000'
        },
        build: {
          outDir: 'dist'
        }
      }
    : {
        server: {
          port: 3000,
          strictPort: false
        },
        preview: {
          port: 8080,
          strictPort: false
        }
      }),
  test: {
    environment: 'jsdom',
    globals: true
  }
})
