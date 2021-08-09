import { client } from 'src/services/client'

import { InvoiceSummary } from './model'

const BASE_URL = '/api/invoices'

export function getInvoices(): Promise<Array<InvoiceSummary>> {
  return client<{ invoices: Array<InvoiceSummary> }>(`${BASE_URL}`).then(
    ({ invoices }) => invoices
  )
}
