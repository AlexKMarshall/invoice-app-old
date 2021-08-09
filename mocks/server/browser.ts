import * as invoiceModel from '@/mocks/invoice/invoice.model'
import { setupWorker } from 'msw'

import { handlers } from './handlers'
import { mockInvoiceSummaries } from './mock-data'

invoiceModel.initialise(mockInvoiceSummaries)

export const worker = setupWorker(...handlers)
