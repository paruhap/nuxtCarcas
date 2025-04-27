import { readBody, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const db = event.context.db
  const body = await readBody(event)

  if (!body.id) {
    throw createError({
      statusCode: 400,
      message: 'User id is required'
    })
  }

  try {
    const stmt = db.prepare('DELETE FROM users WHERE id = ?')
    const result = stmt.run(body.id)
    return { deleted: result.changes }
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      message: 'Database error: ' + e.message
    })
  }
})