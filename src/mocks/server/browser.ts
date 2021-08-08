import { setupWorker } from 'msw'
import { handlers } from './handlers'
import * as invoiceModel from './invoice.model'
import { mockInvoiceSummaries } from './mock-data'

invoiceModel.initialise(mockInvoiceSummaries)

export const worker = setupWorker(...handlers)
