// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { InvoiceSummary } from '@features/invoice/schema'
import { mockInvoices } from '@mocks/server/mock-data'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ invoices: Array<any> } | { error: any }>
) {
  try {
    const invoices = await prisma.invoice.findMany()
    res.status(200).json({ invoices })
  } catch (error) {
    res.status(500).json({ error })
  }
}
