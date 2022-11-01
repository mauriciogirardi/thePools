import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({
  log: ['query'],
})

// npx prisma studio
// npx prisma generate
