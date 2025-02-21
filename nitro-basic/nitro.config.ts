import { resolve } from 'pathe'
import { isDevelopment, isProduction } from 'std-env'
import appConfig from './app.config'

/* https://nitro.unjs.io/config */
export default defineNitroConfig({
  appConfig: appConfig,
  preset: 'node-server',
  serveStatic: 'node',
  minify: isProduction,
  sourceMap: isDevelopment,
  srcDir: resolve('server'),
  output: { dir: resolve('build') },
  publicAssets: [{ dir: resolve('public') }],
  errorHandler: '~/error',
})
