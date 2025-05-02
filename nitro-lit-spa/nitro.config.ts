import { resolve } from 'node:path'
import { createConsola } from 'consola'
import { makeDirectory } from 'make-dir'
import { isDevelopment, isProduction } from 'std-env'
import appConfig from './app.config'

const _console = createConsola({ defaults: { tag: 'nitro' } })

export default defineNitroConfig({
  compatibilityDate: '2025-05-02',
  preset: 'node-server',
  serveStatic: 'node',
  appConfig: appConfig,
  minify: isProduction,
  sourceMap: isDevelopment,
  srcDir: resolve('server'),

  publicAssets: [{ dir: resolve('public') }],
  serverAssets: [{ baseName: 'vite', dir: resolve('build/client/.vite') }],

  output: {
    dir: resolve('build'),
    serverDir: resolve('build/server'),
    publicDir: resolve('build/client'),
  },

  handlers: [{ handler: '~/http/middleware/core.ts', middleware: true }],
  errorHandler: '~/http/error',

  hooks: {
    'rollup:before': async (nitro) => {
      _console.info('Creating application data directory')
      await Promise.all([
        makeDirectory(resolve('storage/backup'), { mode: 0o755 }),
        makeDirectory(resolve('storage/uploads'), { mode: 0o755 }),
      ])

      if (nitro.options.dev) {
        _console.info('Spawning Vite development server')
        const { createServer } = await import('vite')
        const vite = await createServer()
        await vite.listen().then(async (viteContext) => {
          // Send Vite server address to runtime config
          const [serverAddress] = viteContext.resolvedUrls?.local ?? []
          nitro.options.runtimeConfig.viteServerUrl = serverAddress
          _console.success('Vite dev server ready:', serverAddress)
        })
      }
    },
    'build:before': async (nitro) => {
      if (!nitro.options.dev) {
        _console.start('Building frontend application')
        const { build } = await import('vite')
        await build().then(() => {
          _console.success('Frontend application built')
        })
      }
    },
  },

  devServer: { watch: ['server', 'client'] },
  esbuild: { options: { target: 'ES2020' } },
  typescript: {
    strict: true,
    tsConfig: {
      compilerOptions: {
        allowImportingTsExtensions: true,
        experimentalDecorators: true,
        isolatedModules: true,
        lib: ['ES2020', 'DOM', 'DOM.Iterable'],
        moduleDetection: 'force',
        noFallthroughCasesInSwitch: true,
        noUncheckedSideEffectImports: true,
        noUnusedLocals: true,
        noUnusedParameters: true,
        target: 'ES2020',
        useDefineForClassFields: false,
        paths: {
          '#/*': ['../../client/*'],
        },
      },
    },
  },
})
