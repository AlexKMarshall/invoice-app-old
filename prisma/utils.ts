import * as fs from 'fs/promises'
import path from 'path'

export function deleteDatabase(dbName: string) {
  const dbFileName = path.join(__dirname, `${dbName}.db`)
  const dbJournalFileName = `${dbFileName}-journal`

  const deleteDb = fs.unlink(dbFileName)
  const deleteJournal = fs.unlink(dbJournalFileName)
  return Promise.all([deleteDb, deleteJournal])
}
