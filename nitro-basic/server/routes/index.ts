import type { AppConfig } from '~~/app.config'

export default eventHandler((event) => {
  const appConfig = useAppConfig(event) as AppConfig
  return `
      <h1>This is your brand new ${appConfig.title}</h1>
      <p>Get started by editing the <code>server/routes/index.ts</code> file.</p>
      <p>Learn more from <a href="https://nitro.unjs.io" target="_blank">Nitro Documentation</a></p>
    `
})
