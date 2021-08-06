import { rest } from 'msw'
import invoiceData from './data.json'

const invoiceSummary = invoiceData.map(
  ({ id, paymentDue, clientName, total, status }) => ({
    id,
    paymentDue,
    clientName,
    total,
    status,
  })
)

export const handlers = [
  rest.get('/invoices', (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(invoiceSummary))
  }),
]
