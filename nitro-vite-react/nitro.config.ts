import { defineConfig } from 'nitro'

export default defineConfig({
  compatibilityDate: '2025-11-21',
  preset: 'node-server',
  serveStatic: 'node',
  serverDir: './server',
})
