import faker from 'faker'
import { generateInvoiceId } from '../../utils'
import { Address, InvoiceDetail, Item } from '@features/invoice/schema'

export function buildMockInvoice(): InvoiceDetail {
  return {
    id: generateInvoiceId(),
    createdAt: faker.date.recent().toLocaleDateString(),
    paymentDue: faker.date.soon().toLocaleDateString(),
    description: faker.commerce.productDescription(),
    paymentTerms: faker.datatype.number(),
    clientName: faker.name.findName(),
    clientEmail: faker.internet.email(),
    status: 'pending',
    senderAddress: buildMockAddress(),
    clientAddress: buildMockAddress(),
    items: [buildMockItem()],
    total: faker.datatype.number(),
  }
}

export function buildMockAddress(): Address {
  return {
    street: faker.address.streetAddress(),
    city: faker.address.city(),
    postCode: faker.address.zipCode(),
    country: faker.address.country(),
  }
}

export function buildMockItem(): Item {
  return {
    name: faker.commerce.productName(),
    quantity: faker.datatype.number(),
    price: faker.datatype.number(),
    total: faker.datatype.number(),
  }
}
