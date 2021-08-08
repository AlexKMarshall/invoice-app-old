import { AsyncReturnType, Except, IterableElement } from 'type-fest'
import { CompleteDeep } from 'src/types/utils'
import * as z from 'zod'
import prisma from '../../../prisma'

function getDBInvoiceSummaries() {
  return prisma.invoice
    .findMany({
      select: {
        id: true,
        createdAt: true,
        paymentTerm: {
          select: {
            days: true,
          },
        },
        client: {
          select: {
            name: true,
          },
        },
        invoiceItems: {
          select: {
            quantity: true,
            item: {
              select: {
                price: true,
              },
            },
          },
        },
        status: true,
      },
    })
    .then((dbInvoiceSummaries) =>
      dbInvoiceSummaries.map(
        ({ id, createdAt, paymentTerm, client, invoiceItems, status }) => ({
          id,
          paymentDue:
            createdAt && paymentTerm?.days
              ? addDays(paymentTerm.days, createdAt)
              : createdAt,
          client,
          total: invoiceItems
            .map(({ quantity, item }) => (quantity ?? 0) * (item?.price ?? 0))
            .reduce((acc, cur) => acc + cur, 0),
          status,
        })
      )
    )
}

function addDays(days: number, date: Date) {
  const newDate = new Date(Number(date))
  newDate.setDate(date.getDate() + days)
  return newDate
}

type DBInvoiceSummary = IterableElement<
  AsyncReturnType<typeof getDBInvoiceSummaries>
>

type DBDraftInvoiceSummary = Except<DBInvoiceSummary, 'status'> & {
  status: 'draft'
}

type DBFinalInvoiceSummary = Except<
  CompleteDeep<DBInvoiceSummary>,
  'status'
> & { status: 'pending' | 'paid' }

function schemaForType<T>() {
  return <S extends z.ZodType<T, any, any>>(arg: S) => arg
}

const draftInvoiceSummarySchema = schemaForType<DBDraftInvoiceSummary>()(
  z.object({
    id: z.string(),
    paymentDue: z.date().nullable(),
    client: z
      .object({
        name: z.string().nullable(),
      })
      .nullable(),
    total: z.number(),
    status: z.literal('draft'),
  })
)

const finalInvoiceSummarySchema = schemaForType<DBFinalInvoiceSummary>()(
  z.object({
    id: draftInvoiceSummarySchema.shape.id,
    paymentDue: draftInvoiceSummarySchema.shape.paymentDue.unwrap(),
    client: z.object({
      name: draftInvoiceSummarySchema.shape.client.unwrap().shape.name.unwrap(),
    }),
    total: draftInvoiceSummarySchema.shape.total,
    status: z.enum(['pending', 'paid']),
  })
)

type DraftInvoiceSummary = z.infer<typeof draftInvoiceSummarySchema>
type FinalInvoiceSummary = z.infer<typeof finalInvoiceSummarySchema>
export type InvoiceSummary = DraftInvoiceSummary | FinalInvoiceSummary

export function getInvoiceSummaries(): Promise<Array<InvoiceSummary>> {
  return getDBInvoiceSummaries().then((dbInvoiceSummaries) =>
    dbInvoiceSummaries.map((dbInvoiceSummary) =>
      dbInvoiceSummary.status === 'draft'
        ? draftInvoiceSummarySchema.parse(dbInvoiceSummary)
        : finalInvoiceSummarySchema.parse(dbInvoiceSummary)
    )
  )
}
