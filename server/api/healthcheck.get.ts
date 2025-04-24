// server/api/healthcheck.get.ts
export default defineEventHandler((event) => {
    const db = event.context.db
    try {
      db.prepare('SELECT 1').get()
      return { status: 'ok' }
    } catch (e) {
      throw createError({ statusCode: 500, message: 'Database connection failed' })
    }
  })