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
    name TEXT,
    addres TEXT,
    email TEXT,
    phone TEXT,
    telegram TEXT,
    whatsapp TEXT,
    vk TEXT,
    insta TEXT,
    title TEXT,
    subtitle TEXT,
    description TEXT,
    maintext TEXT,
    worktime TEXT
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

// Добавим функцию для пересоздания таблицы (использовать только при необходимости)
// function resetLeadsTable() {
//   db.exec(`
//     DROP TABLE IF EXISTS users;
//      CREATE TABLE IF NOT EXISTS users (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       name TEXT,
//       email TEXT,
//       phone TEXT,
//       status TEXT DEFAULT 'new',
//       service_id INTEGER,
//       created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
//       FOREIGN KEY(service_id) REFERENCES services(id)
//     );
//   `);
// }

// resetLeadsTable(); // раскомментировать только когда нужно пересоздать таблицу