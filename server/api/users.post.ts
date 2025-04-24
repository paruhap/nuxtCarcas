// server/api/users.post.ts
export default defineEventHandler(async (event) => {
    const db = event.context.db
    const body = await readBody(event)
  
    // Валидация
    if (!body.name || !body.email) {
      throw createError({
        statusCode: 400,
        message: 'Name and email are required'
      })
    }
  
    try {
      const stmt = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)')
      const result = stmt.run(body.name, body.email)
      return { id: result.lastInsertRowid }
    } catch (e) {
      throw createError({
        statusCode: 500,
        message: 'Database error: ' + e.message
      })
    }
  })