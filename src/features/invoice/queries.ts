import { useQuery } from 'react-query'
import { getInvoices } from './api-client'

const invoiceKeys = {
  all: ['invoices'] as const,
  lists: () => [...invoiceKeys.all, 'list'] as const,
  list: (filters: any = {}) => [...invoiceKeys.lists(), filters] as const,
}

export function useInvoices() {
  return useQuery(invoiceKeys.list(), () => getInvoices())
}
