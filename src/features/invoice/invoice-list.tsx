import { useId } from '@reach/auto-id'
import { currencyFormatter } from 'src/utils'

import { InvoiceSummary } from './model'
import { useInvoices } from './queries'

export function InvoiceList() {
  const invoicesQuery = useInvoices()
  console.log('some other change to force commit')

  return (
    <>
      <header>
        <h1>Invoices</h1>
      </header>
      {invoicesQuery.isLoading ? <div>Loading...</div> : null}
      {invoicesQuery.isError ? (
        <pre>{JSON.stringify(invoicesQuery.error, null, 2)} </pre>
      ) : null}
      {invoicesQuery.isSuccess ? (
        <ul>
          {invoicesQuery.data.map((invoice) => (
            <InvoiceItem key={invoice.id} invoice={invoice} />
          ))}
        </ul>
      ) : null}
    </>
  )
}

type InvoiceItemProps = {
  invoice: InvoiceSummary
}
function InvoiceItem({ invoice }: InvoiceItemProps) {
  const id = useId()
  return (
    <li aria-labelledby={id}>
      <span id={id}>{invoice.id}</span>
      <span>Due {invoice.paymentDue}</span>
      <span>{invoice.client?.name}</span>
      <span>{currencyFormatter.format(invoice.total)}</span>
      <span>{invoice.status}</span>
    </li>
  )
}
