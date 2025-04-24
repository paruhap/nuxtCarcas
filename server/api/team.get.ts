// server/api/team.get.ts
export default defineEventHandler((event) => {
    const db = event.context.db
    return db.prepare('SELECT * FROM team').all()
  })