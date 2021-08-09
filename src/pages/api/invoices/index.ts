import type { NextApiRequest, NextApiResponse } from 'next'
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { InvoiceSummary, getInvoiceSummaries } from 'src/features/invoice/model'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ invoices: Array<InvoiceSummary> } | { error: any }>
) {
  try {
    const invoices = await getInvoiceSummaries()
    res.status(200).json({ invoices })
  } catch (error) {
    res.status(500).json({ error })
  }
}
