import { useQuery } from 'react-query'
import { useId } from '@reach/auto-id'
import { InvoiceSummary } from './schema'
import { currencyFormatter } from '../../utils'

export function InvoiceList() {
  const invoiceSummaryQuery = useQuery(['invoices'], () =>
    fetch('/invoices')
      .then((res) => res.json() as Promise<{ invoices: Array<InvoiceSummary> }>)
      .then(({ invoices }) => {
        return invoices
      })
  )

  return (
    <>
      <header>
        <h1>Invoices</h1>
      </header>
      {invoiceSummaryQuery.isLoading ? <div>Loading...</div> : null}
      {invoiceSummaryQuery.isError ? (
        <pre>{JSON.stringify(invoiceSummaryQuery.error, null, 2)} </pre>
      ) : null}
      {invoiceSummaryQuery.isSuccess ? (
        <ul>
          {invoiceSummaryQuery.data.map((invoice) => (
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
      <span>{invoice.clientName}</span>
      <span>{currencyFormatter.format(invoice.total)}</span>
      <span>{invoice.status}</span>
    </li>
  )
}
