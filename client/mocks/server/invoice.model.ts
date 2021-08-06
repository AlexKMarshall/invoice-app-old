import { InvoiceDetail, InvoiceSummary } from '@features/invoice/schema'
import { mockInvoices } from './mock-data'

type InvoiceStore = {
  invoices: {
    [id: string]: InvoiceDetail
  }
}

const store: InvoiceStore = {
  invoices: {},
}

function invoiceSummaryFromDetail({
  id,
  paymentDue,
  clientName,
  total,
  status,
}: InvoiceDetail): InvoiceSummary {
  return {
    id,
    paymentDue,
    clientName,
    total,
    status,
  }
}

export function findAll(): Promise<Array<InvoiceSummary>> {
  const invoiceSummaries = Object.values(store.invoices).map((detail) =>
    invoiceSummaryFromDetail(detail)
  )
  return Promise.resolve(invoiceSummaries)
}

export function initialise(invoices: Array<InvoiceDetail>) {
  store.invoices = Object.fromEntries(
    invoices.map((invoice) => [invoice.id, invoice])
  )
}
