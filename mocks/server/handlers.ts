import { InvoiceSummary } from '@features/invoice/model'
import { rest } from 'msw'
import * as invoiceModel from './invoice.model'

export const handlers = [
  rest.get<undefined, { invoices: InvoiceSummary[] }>(
    '/api/invoices',
    async (_req, res, ctx) => {
      const invoices = await invoiceModel.getInvoiceSummaries()
      return res(ctx.status(200), ctx.json({ invoices }))
    }
  ),
]
