import { setupWorker } from 'msw'
import { handlers } from './handlers'
import * as invoiceModel from './invoice.model'
import { mockInvoices } from './mock-data'

invoiceModel.initialise(mockInvoices)

export const worker = setupWorker(...handlers)
