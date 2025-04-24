// server/api/logout.post.ts
import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  await clearUserSession(event)
  return { success: true }
})