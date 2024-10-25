import { resolve } from 'pathe'
import { env, isDevelopment, isProduction } from 'std-env'
import type { AppConfig } from '~/types/config'

/* https://nitro.unjs.io/config */
export default defineNitroConfig({
  appConfig: {
    baseURL: env.SITE_BASE_URL || 'http://localhost:3000',
    title: 'Nitro Application',
    description: 'Build fast and modern web applications with Nitro',
  } as AppConfig,
  preset: 'node-server',
  serveStatic: 'node',
  minify: isProduction,
  sourceMap: isDevelopment,
  srcDir: 'server',
  errorHandler: '~/error',
  publicAssets: [{ dir: resolve('public') }],
})
