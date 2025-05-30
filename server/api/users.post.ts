// server/api/users.post.ts
import { readBody, createError } from 'h3'

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
    const stmt = db.prepare(`
      INSERT INTO users (
        name, addres, email, phone, telegram, whatsapp, vk, insta, title, subtitle, description, maintext, worktime
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
    const result = stmt.run(
      body.name,
      body.addres || '',
      body.email,
      body.phone || '',
      body.telegram || '',
      body.whatsapp || '',
      body.vk || '',
      body.insta || '',
      body.title || '',
      body.subtitle || '',
      body.description || '',
      body.maintext || '',
      body.worktime || ''
    )
    return { id: result.lastInsertRowid }
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      message: 'Database error: ' + e.message
    })
  }
})