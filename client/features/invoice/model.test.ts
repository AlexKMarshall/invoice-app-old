import { getInvoiceSummaries } from './model'

it('should return empty array if no invoices', async () => {
  const invoiceSummaries = await getInvoiceSummaries()

  expect(invoiceSummaries).toEqual([])
})
