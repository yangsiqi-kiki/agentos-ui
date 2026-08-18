import path from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const rootDir = path.dirname(fileURLToPath(import.meta.url))
const designSystemDir = path.resolve(
  rootDir,
  '../agentos_studio_frontend/packages/@agentos/design-system',
)

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(rootDir, 'src'),
    },
    dedupe: ['react', 'react-dom'],
  },
  server: {
    fs: {
      allow: [rootDir, designSystemDir],
    },
  },
  optimizeDeps: {
    include: ['@agentos/design-system'],
  },
})
