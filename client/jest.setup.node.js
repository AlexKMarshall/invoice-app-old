import { execSync } from 'child_process'
import prisma from './prisma'

process.env.DEBUG_PRINT_LIMIT = 1500

beforeEach(() => {
  const dbUrl = `file:./test-${process.env.JEST_WORKER_ID}.db`
  process.env.DATABASE_URL = dbUrl

  const command = `DATABASE_URL=${dbUrl} npx prisma migrate deploy`
  execSync(command)
})
afterAll(() => {})
afterEach(async () => {
  await prisma.$disconnect()
})
