import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient
}

const prisma = global.prisma || new PrismaClient()
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test')
  global.prisma = prisma

export default prisma
