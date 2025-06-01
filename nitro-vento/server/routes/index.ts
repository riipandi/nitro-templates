import { renderTemplate } from '~/utils/vento'

export default eventHandler(({ context }) => {
  const appConfig = context.appConfig

  return renderTemplate(context.templateKey, {
    csrfToken: context.csrfToken,
    title: appConfig.meta.title,
  })
})
