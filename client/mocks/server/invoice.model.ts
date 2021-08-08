import { InvoiceSummary } from '@features/invoice/model'

type InvoiceStore = {
  invoices: {
    [id: string]: InvoiceSummary
  }
}

const store: InvoiceStore = {
  invoices: {},
}

// function invoiceSummaryFromDetail({
//   id,
//   paymentDue,
//   clientName,
//   total,
//   status,
// }: InvoiceDetail): InvoiceSummary {
//   return {
//     id,
//     paymentDue,
//     clientName,
//     total,
//     status,
//   }
// }

export function getInvoiceSummaries(): Promise<Array<InvoiceSummary>> {
  const invoiceSummaries = Object.values(store.invoices)
  return Promise.resolve(invoiceSummaries)
}

export function initialise(invoices: Array<InvoiceSummary>) {
  store.invoices = Object.fromEntries(
    invoices.map((invoice) => [invoice.id, invoice])
  )
}
