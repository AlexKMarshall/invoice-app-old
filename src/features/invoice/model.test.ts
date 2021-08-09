import { execSync } from 'child_process'

import prisma from '@/prisma'
import { deleteDatabase } from '@/prisma/utils'

import { getInvoiceSummaries } from './model'

let dbFileName: string

beforeEach(() => {
  dbFileName = `test-${process.env.JEST_WORKER_ID}`
  const dbUrl = `file:./${dbFileName}.db`
  process.env.DATABASE_URL = dbUrl

  const command = `DATABASE_URL=${dbUrl} npx prisma migrate deploy`
  execSync(command)
})
afterEach(async () => {
  await prisma.$disconnect()
  await deleteDatabase(dbFileName)
})

it('should return empty array if no invoices', async () => {
  const invoiceSummaries = await getInvoiceSummaries()

  expect(invoiceSummaries).toEqual([])
})
