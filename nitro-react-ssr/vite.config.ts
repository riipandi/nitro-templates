import nitro from '@analogjs/vite-plugin-nitro'
import react from '@vitejs/plugin-react'
import { resolve } from 'pathe'
import { isProduction } from 'std-env'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    react(),
    nitro(
      {
        ssr: true,
        entryServer: './src/main.server.tsx',
        ssrBuildDir: resolve('.output/server'),
        workspaceRoot: resolve('.output'),
        prerender: { routes: ['/'] },
      },
      {
        preset: 'node-server',
        compatibilityDate: '2025-02-21',
        publicAssets: [{ dir: resolve('public') }],
        output: {
          dir: resolve('build'),
          publicDir: resolve('build/public'),
          serverDir: resolve('build/server'),
        },
        minify: isProduction,
      }
    ),
  ],
  server: { port: 3000, host: false, strictPort: true },
  build: { outDir: resolve('.output/client') },
})
