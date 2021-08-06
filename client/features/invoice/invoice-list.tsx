import { useEffect } from 'react'

export function InvoiceList() {
  useEffect(() => {
    fetch('/invoices')
      .then((res) => res.json())
      .then((data) => console.log(data))
  }, [])

  return (
    <>
      <header>
        <h1>Invoices</h1>
      </header>
    </>
  )
}
