'use server'

import { z } from 'zod'

import { db } from '@/app/_lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { addTransactionSchema } from './schema'
import { revalidatePath } from 'next/cache'

type AddTransactionProps = z.infer<typeof addTransactionSchema>

async function addTransaction(params: Omit<AddTransactionProps, 'userId'>) {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('Unauthorized')
  }

  addTransactionSchema.parse(params)

  await db.transaction.create({
    data: { ...params, userId },
  })

  revalidatePath('/transactions')
}

export default addTransaction
