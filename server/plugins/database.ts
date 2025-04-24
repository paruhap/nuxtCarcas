// server/plugins/database.ts
import Database from 'better-sqlite3'

declare module 'h3' {
  interface H3EventContext {
    db: Database.Database
  }
}

export default defineNitroPlugin((nitroApp) => {
  const db = new Database('server/db.sqlite')
  
  db.pragma('journal_mode = WAL')
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL
    );

     CREATE TABLE IF NOT EXISTS team (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    secondname TEXT,
    lastname TEXT,
    email TEXT,
    phone TEXT,
    telegram TEXT,
    whatsapp TEXT,
    title TEXT,
    subtitle TEXT,
    description TEXT,
    maintext TEXT,
    list TEXT,
    link TEXT
  )

  `)

  // Добавляем DB в контекст обработчиков
  nitroApp.hooks.hook('request', (event) => {
    event.context.db = db
  })
})