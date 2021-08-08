import '@testing-library/jest-dom'
import 'whatwg-fetch'
import { execSync } from 'child_process'
import { server } from '@mocks/server/test-server'

process.env.DEBUG_PRINT_LIMIT = 1500

beforeAll(() => {
  server.listen()
})
beforeEach(() => {
  const dbUrl = `file:./test-${process.env.JEST_WORKER_ID}.db`
  process.env.DATABASE_URL = dbUrl

  const command = `DATABASE_URL=${dbUrl} npx prisma migrate deploy`
  execSync(command)
})
afterAll(() => {
  server.close()
})
afterEach(() => {
  server.resetHandlers()
})
