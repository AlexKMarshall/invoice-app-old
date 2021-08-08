import { execSync } from 'child_process'
import prisma from '../../prisma'
import { getInvoiceSummaries } from './model'

beforeEach(() => {
  const dbUrl = `file:./test-${process.env.JEST_WORKER_ID}.db`
  process.env.DATABASE_URL = dbUrl

  const command = `DATABASE_URL=${dbUrl} npx prisma migrate deploy`
  execSync(command)
})
afterEach(async () => {
  await prisma.$disconnect()
})

it('should return empty array if no invoices', async () => {
  const invoiceSummaries = await getInvoiceSummaries()

  expect(invoiceSummaries).toEqual([])
})
