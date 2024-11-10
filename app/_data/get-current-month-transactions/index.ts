'use server'

import { auth } from '@clerk/nextjs/server'
import { endOfMonth, startOfMonth } from 'date-fns'

import { db } from '@/app/_lib/prisma'

export async function getCurrentMonthTransactions() {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('Unauthorized')
  }

  return await db.transaction.count({
    where: {
      userId,
      createdAt: {
        gte: startOfMonth(new Date()),
        lt: endOfMonth(new Date()),
      },
    },
  })
}
