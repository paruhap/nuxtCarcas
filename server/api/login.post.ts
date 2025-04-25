//server/api/login.post.ts
import { defineEventHandler, readBody } from 'h3'
const config = useRuntimeConfig()
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body
  // Здесь ваша логика проверки учетных данных (например, запрос к базе данных)
  if (email === config.adminMail && password === config.adminPassword ) {
    await setUserSession(event, { user: { id: 1, name: 'Admin' } })
    return { success: true }
  }
  throw createError({ statusCode: 401, message: 'Неверные учетные данные' })
})