import { env } from 'std-env'

const appConfig = {
  title: 'Nitro Application',
  description: 'Build fast and modern web applications with Nitro',
  baseURL: env.APP_BASE_URL || 'http://localhost:3000',
}

export type AppConfig = typeof appConfig

export default appConfig
