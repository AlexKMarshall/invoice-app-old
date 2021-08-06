import { render, screen, waitForElementToBeRemoved, within } from '@test/utils'
import * as invoiceModel from '@mocks/server/invoice.model'
import { InvoiceList } from './invoice-list'
import { buildMockInvoice } from '@mocks/invoice'

it('should a list of invoices', async () => {
  const mockInvoices = [
    buildMockInvoice(),
    buildMockInvoice(),
    buildMockInvoice(),
  ]
  invoiceModel.initialise(mockInvoices)
  render(<InvoiceList />)
  expect(screen.getByRole('heading')).toHaveTextContent(/invoices/i)

  await waitForElementToBeRemoved(() => screen.getByText(/loading/i))

  const invoiceList = screen.getByRole('list')

  const invoiceEls = within(invoiceList).getAllByRole('listitem')

  expect(invoiceEls).toHaveLength(mockInvoices.length)

  mockInvoices.forEach((mockInvoice) => {
    expect(
      screen.getByRole('listitem', { name: mockInvoice.id })
    ).toBeInTheDocument()
  })
})
