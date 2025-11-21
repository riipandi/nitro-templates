import { defineHandler } from 'nitro/h3'

export default defineHandler((_event) => {
  return { api: 'works!' }
})
