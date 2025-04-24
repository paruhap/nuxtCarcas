// server/middleware/auth.ts
import { defineEventHandler } from 'h3'
import { sendRedirect } from 'h3'

export default defineEventHandler(async (event) => {
  if (event.path.startsWith('/admin') && !process.client) {
    const session = await getUserSession(event)
    if (!session.user) {
      return sendRedirect(event, '/login', 302)
    }
  }
})