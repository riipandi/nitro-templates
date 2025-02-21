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
        ssrBuildDir: resolve('dist/server'),
        prerender: { routes: ['/'] },
      },
      {
        minify: isProduction,
        publicAssets: [{ dir: resolve('public') }],
        output: {
          dir: resolve('.output'),
          publicDir: resolve('.output/public'),
        },
      }
    ),
  ],
  server: { port: 3000, host: false, strictPort: true },
  build: { outDir: resolve('dist/client') },
})
