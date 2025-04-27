import { readBody, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const db = event.context.db
  const body = await readBody(event)

  if (!body.id || !body.name || !body.email) {
    throw createError({
      statusCode: 400,
      message: 'User id, name and email are required'
    })
  }

  try {
    const stmt = db.prepare(`
      UPDATE users SET
        name = ?,
        addres = ?,
        email = ?,
        phone = ?,
        telegram = ?,
        whatsapp = ?,
        vk = ?,
        insta = ?,
        title = ?,
        subtitle = ?,
        description = ?,
        maintext = ?,
        worktime = ?
      WHERE id = ?
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
      body.worktime || '',
      body.id
    )
    return { updated: result.changes }
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      message: 'Database error: ' + e.message
    })
  }
})