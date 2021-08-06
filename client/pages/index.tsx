import Head from 'next/head'
import { InvoiceList } from '@features/invoice'

export default function Home() {
  return (
    <>
      <Head>
        <title>Invoice App</title>
        <meta
          name="description"
          content="Application to generate and manage invoices"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <InvoiceList />
      </main>
    </>
  )
}
