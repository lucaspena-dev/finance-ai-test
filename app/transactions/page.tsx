import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import { db } from '../_lib/prisma'
import { canUserAddTransaction } from '../_data/can-user-add-transaction'
import Navbar from '../_components/navbar'
import AddTransactionButton from '../_components/add-transaction-button'
import { DataTable } from '../_components/ui/data-table'
import { transactionsColumns } from './_columns'
import { ScrollArea } from '../_components/ui/scroll-area'

async function TransactionsPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/login')
  }

  const transactions = await db.transaction.findMany({
    where: {
      userId,
    },
    orderBy: {
      date: 'desc',
    },
  })

  const userCanAddTransactions = await canUserAddTransaction()

  return (
    <>
      <Navbar />
      <div className="space-y-6 overflow-hidden p-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddTransactionButton userCanAddTransaction={userCanAddTransactions} />
        </div>
        <ScrollArea>
          <DataTable columns={transactionsColumns} data={transactions} />
        </ScrollArea>
      </div>
    </>
  )
}

export default TransactionsPage
