'use server'

import { TransactionCategory, TransactionPaymentMethod, TransactionType } from '@prisma/client'
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'

import { addTransactionSchema } from './schema'
import { db } from '@/app/_lib/prisma'

type UpsertTransactionParams = {
  id?: string
  name: string
  amount: number
  type: TransactionType
  category: TransactionCategory
  paymentMethod: TransactionPaymentMethod
  date: Date
}

export async function upsertTransaction(params: UpsertTransactionParams) {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('Unauthorized')
  }

  addTransactionSchema.parse(params)

  await db.transaction.upsert({
    create: { ...params, userId },
    update: { ...params, userId },
    where: { id: params?.id ?? '' },
  })
  revalidatePath('/transactions')
}
