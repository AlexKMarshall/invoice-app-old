// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getInvoiceSummaries, InvoiceSummary } from 'src/features/invoice/model'
import type { NextApiRequest, NextApiResponse } from 'next'

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
