import { render, screen, waitForElementToBeRemoved, within } from '@test/utils'
import * as invoiceModel from '@mocks/server/invoice.model'
import { InvoiceList } from './invoice-list'
import {
  buildMockInvoiceSummary,
  buildMockFinalInvoiceSummary,
} from '@mocks/invoice'
import { currencyFormatter } from '../../utils'

it('should a list of invoices', async () => {
  const mockInvoices = [buildMockFinalInvoiceSummary()]
  invoiceModel.initialise(mockInvoices)
  render(<InvoiceList />)
  expect(screen.getByRole('heading')).toHaveTextContent(/invoices/i)

  await waitForElementToBeRemoved(() => screen.getByText(/loading/i))

  const invoiceList = screen.getByRole('list')
  const invoiceEls = within(invoiceList).getAllByRole('listitem')
  expect(invoiceEls).toHaveLength(mockInvoices.length)

  mockInvoices.forEach((mockInvoice) => {
    const invoiceEl = screen.getByRole('listitem', { name: mockInvoice.id })

    expect(invoiceEl).toBeInTheDocument()

    // TODO check this once formatting in place
    // expect(
    //   within(invoiceEl).getByText(`Due ${mockInvoice.paymentDue}`)
    // ).toBeInTheDocument()
    expect(
      within(invoiceEl).getByText(mockInvoice.client.name)
    ).toBeInTheDocument()
    expect(
      within(invoiceEl).getByText(currencyFormatter.format(mockInvoice.total))
    ).toBeInTheDocument()
    expect(within(invoiceEl).getByText(mockInvoice.status)).toBeInTheDocument()
  })
})
