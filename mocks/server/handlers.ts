import { rest } from 'msw'
import { InvoiceSummary } from 'src/features/invoice/model'
import * as invoiceModel from '@/mocks/invoice/invoice.model'

export const handlers = [
  rest.get<undefined, { invoices: InvoiceSummary[] }>(
    '/api/invoices',
    async (_req, res, ctx) => {
      const invoices = await invoiceModel.getInvoiceSummaries()
      return res(ctx.status(200), ctx.json({ invoices }))
    }
  ),
]
