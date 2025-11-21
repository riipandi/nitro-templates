import { defineHandler } from 'nitro/h3'

export default defineHandler((_event) => {
  throw new Error('This is a test error')
})
