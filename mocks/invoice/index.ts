import faker from 'faker'
import { generateInvoiceId } from '../../utils'
import { InvoiceSummary } from '@features/invoice/model'
import { PartialDeep, Except, SetRequired } from 'type-fest'

type DraftInvoiceSummary = Extract<InvoiceSummary, { status: 'draft' }>
type MockDraftInvoiceSummaryOverrides = Except<
  PartialDeep<DraftInvoiceSummary>,
  'paymentDue'
> &
  Partial<{ paymentDue: DraftInvoiceSummary['paymentDue'] }>

type FinalInvoiceSummary = Extract<
  InvoiceSummary,
  { status: 'pending' | 'paid' }
>

type MockFinalInvoiceSummaryOverrides = Except<
  PartialDeep<FinalInvoiceSummary>,
  'paymentDue'
> &
  Partial<{ paymentDue: FinalInvoiceSummary['paymentDue'] }>

export function buildMockFinalInvoiceSummary({
  client: clientOverrides,
  ...overrides
}: MockFinalInvoiceSummaryOverrides = {}): FinalInvoiceSummary {
  return {
    id: generateInvoiceId(),
    paymentDue: faker.date.soon(),
    client: {
      name: faker.name.findName(),
      ...clientOverrides,
    },
    total: faker.datatype.number(),
    status: Math.random() < 0.5 ? 'pending' : 'paid',
    ...overrides,
  }
}

function possibly<T>(value: T): T | null {
  return Math.random() < 0.5 ? value : null
}

function buildMockDraftInvoiceSummary({
  client: clientOverrides,
  ...overrides
}: MockDraftInvoiceSummaryOverrides = {}): DraftInvoiceSummary {
  return {
    id: generateInvoiceId(),
    paymentDue: possibly(faker.date.soon()),
    client: {
      name: possibly(faker.name.findName()),
      ...clientOverrides,
    },
    total: faker.datatype.number(),
    status: 'draft',
    ...overrides,
  }
}

type MockInvoiceSummaryOverrides =
  | SetRequired<MockDraftInvoiceSummaryOverrides, 'status'>
  | SetRequired<MockFinalInvoiceSummaryOverrides, 'status'>

export function buildMockInvoiceSummary(
  overrides?: MockInvoiceSummaryOverrides
): InvoiceSummary {
  if (!overrides) {
    return Math.random() < 0.5
      ? buildMockDraftInvoiceSummary()
      : buildMockFinalInvoiceSummary()
  }

  if (overrides.status === 'draft') {
    return buildMockDraftInvoiceSummary(overrides)
  } else {
    return buildMockFinalInvoiceSummary(overrides)
  }
}

// export function buildMockInvoice(): InvoiceDetail {
//   return {
//     id: generateInvoiceId(),
//     createdAt: faker.date.recent().toLocaleDateString(),
//     paymentDue: faker.date.soon().toLocaleDateString(),
//     description: faker.commerce.productDescription(),
//     paymentTerms: faker.datatype.number(),
//     clientName: faker.name.findName(),
//     clientEmail: faker.internet.email(),
//     status: 'pending',
//     senderAddress: buildMockAddress(),
//     clientAddress: buildMockAddress(),
//     items: [buildMockItem()],
//     total: faker.datatype.number(),
//   }
// }

// export function buildMockAddress(): Address {
//   return {
//     street: faker.address.streetAddress(),
//     city: faker.address.city(),
//     postCode: faker.address.zipCode(),
//     country: faker.address.country(),
//   }
// }

// export function buildMockItem(): Item {
//   return {
//     name: faker.commerce.productName(),
//     quantity: faker.datatype.number(),
//     price: faker.datatype.number(),
//     total: faker.datatype.number(),
//   }
// }
