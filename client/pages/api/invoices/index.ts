// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { InvoiceSummary } from '@features/invoice/schema'
import { mockInvoices } from '@mocks/server/mock-data'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ invoices: Array<InvoiceSummary> }>
) {
  const invoices = mockInvoices.map(
    ({ id, paymentDue, clientName, total, status }) => ({
      id,
      paymentDue,
      clientName,
      total,
      status,
    })
  )
  res.status(200).json({ invoices })
}
