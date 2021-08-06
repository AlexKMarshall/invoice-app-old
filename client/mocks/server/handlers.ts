import { InvoiceSummary } from '@features/invoice/schema'
import { rest } from 'msw'
import * as invoiceModel from './invoice.model'

export const handlers = [
  rest.get<undefined, { invoices: InvoiceSummary[] }>(
    '/invoices',
    async (_req, res, ctx) => {
      const invoices = await invoiceModel.findAll()
      return res(ctx.status(200), ctx.json({ invoices }))
    }
  ),
]
