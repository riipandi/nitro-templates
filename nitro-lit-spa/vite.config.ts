import { resolve } from 'node:path'
import browserslist from 'browserslist'
import { createConsola } from 'consola'
import { browserslistToTargets } from 'lightningcss'
import { isTest } from 'std-env'
import { type Logger as ViteLogger, defineConfig } from 'vite'
import litLightningcss from 'vite-plugin-lit-lightningcss'
import tsconfigPaths from 'vite-tsconfig-paths'

const _console = createConsola({ defaults: { tag: 'vite' } })

const logger: ViteLogger = {
  info: (msg: string) => _console.info(msg),
  warn: (msg: string) => _console.warn(msg),
  warnOnce: (msg: string) => _console.warn(msg),
  error: (msg: string) => _console.error(msg),
  clearScreen: () => {},
  hasErrorLogged: () => true,
  hasWarned: false,
}

export default defineConfig({
  plugins: [
    litLightningcss({
      include: /src\/.*\.ts$/,
      exclude: /node_modules/,
      lightningcss: { minify: true },
    }),
    tsconfigPaths(),
  ],
  publicDir: resolve('public'),
  envPrefix: ['PUBLIC_'],
  clearScreen: true,
  build: {
    manifest: true,
    emptyOutDir: true,
    chunkSizeWarningLimit: 1024 * 4,
    rollupOptions: {
      input: resolve('client/entry.client.ts'),
      output: {
        entryFileNames: `assets/[name]-[hash].js`,
        assetFileNames: `assets/[name]-[hash][extname]`,
        chunkFileNames: `assets/[name]-[hash].js`,
        manualChunks(id) {
          if (id.includes('lucide')) {
            return 'lucide'
          }
        },
      },
    },
    outDir: resolve('build/client'),
    terserOptions: { format: { comments: false } },
    cssMinify: 'lightningcss',
    minify: process.env.NODE_ENV === 'production',
  },
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      targets: browserslistToTargets(browserslist('>= 0.25%')),
    },
  },
  server: {
    strictPort: false,
    cors: { origin: '*' },
    hmr: { overlay: false },
  },
  esbuild: { legalComments: 'inline' },
  optimizeDeps: { force: true },
  customLogger: !isTest ? logger : undefined,
})
