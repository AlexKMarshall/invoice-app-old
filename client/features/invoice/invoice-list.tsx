import { useQuery } from 'react-query'
import { InvoiceSummary } from './schema'

export function InvoiceList() {
  const invoiceSummaryQuery = useQuery(['invoices'], () =>
    fetch('/invoices').then(
      (res) => res.json() as Promise<Array<InvoiceSummary>>
    )
  )

  return (
    <>
      <header>
        <h1>Invoices</h1>
        {invoiceSummaryQuery.isLoading ? <div>Loading...</div> : null}
        {invoiceSummaryQuery.isError ? (
          <pre>{JSON.stringify(invoiceSummaryQuery.error, null, 2)} </pre>
        ) : null}
        {invoiceSummaryQuery.isSuccess ? (
          <ul>
            {invoiceSummaryQuery.data.map((invoice) => (
              <li key={invoice.id}>
                <pre>{JSON.stringify(invoice, null, 2)}</pre>
              </li>
            ))}
          </ul>
        ) : null}
      </header>
    </>
  )
}
