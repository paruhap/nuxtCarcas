// server/api/team.post.ts
export default defineEventHandler(async (event) => {
    const db = event.context.db
    const body = await readBody(event)
  
    // Валидация обязательных полей
    if (!body.name) {
      throw createError({
        statusCode: 400,
        message: 'Name is required'
      })
    }
  
    try {
      const stmt = db.prepare(`
        INSERT INTO team (
          name, secondname, lastname, email, phone, telegram,
          whatsapp, title, subtitle, description, maintext, list, link
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `)
  
      const result = stmt.run(
        body.name,
        body.secondname || null,
        body.lastname || null,
        body.email || null,
        body.phone || null,
        body.telegram || null,
        body.whatsapp || null,
        body.title || null,
        body.subtitle || null,
        body.description || null,
        body.maintext || null,
        body.list || null,
        body.link || null
      )
  
      return { id: result.lastInsertRowid }
    } catch (e) {
      const error = e as Error
      throw createError({
        statusCode: 500,
        message: 'Database error: ' + error.message
      })
    }
  })