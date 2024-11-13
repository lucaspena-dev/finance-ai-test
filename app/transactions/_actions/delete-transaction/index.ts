'use server'

import { auth } from '@clerk/nextjs/server'
import { db } from '@/app/_lib/prisma'
import { revalidatePath } from 'next/cache'

import { deleteTransactionSchema, DeleteTransactionSchema } from './schema'

export async function deleteTransaction({ transactionId }: DeleteTransactionSchema) {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('Unauthorized')
  }

  deleteTransactionSchema.parse({ transactionId })

  await db.transaction.delete({
    where: {
      id: transactionId,
      userId,
    },
  })

  revalidatePath('/transactions')
  revalidatePath('/')

  return
}
