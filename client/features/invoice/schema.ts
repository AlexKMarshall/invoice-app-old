export type InvoiceSummary = {
  id: string
  paymentDue: string
  clientName: string
  total: number
  status: string
}

export type InvoiceDetail = {
  id: string
  createdAt: string
  paymentDue: string
  description: string
  paymentTerms: number
  clientName: string
  clientEmail: string
  status: 'draft' | 'pending' | 'paid'
  senderAddress: Address
  clientAddress: Address
  items: Array<Item>
  total: number
}

export type Address = {
  street: string
  city: string
  postCode: string
  country: string
}

export type Item = {
  name: string
  quantity: number
  price: number
  total: number
}
