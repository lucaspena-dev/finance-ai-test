import { Transaction } from '@prisma/client'
import Link from 'next/link'
import Image from 'next/image'

import { Button } from '@/app/_components/ui/button'
import { CardContent, CardHeader, CardTitle } from '@/app/_components/ui/card'
import { ScrollArea } from '@/app/_components/ui/scroll-area'
import { formatCurrency } from '@/app/_utils/currency'
import { TRANSACTION_PAYMENT_METHOD_ICONS } from '@/app/_constants/transactions'

type LastTransactionsProps = {
  lastTransactions: Transaction[]
}

function LastTransactions({ lastTransactions }: LastTransactionsProps) {
  function getAmountColor(transaction: Transaction) {
    if (transaction.type === 'DEPOSIT') {
      return 'text-green'
    }
    if (transaction.type === 'EXPENSE') {
      return 'text-danger'
    }
    return 'text-white'
  }

  function getAmountPrefix(transaction: Transaction) {
    if (transaction.type === 'DEPOSIT') {
      return '+'
    }
    return '-'
  }

  return (
    <ScrollArea className="rounded-md border">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="font-bold">Últimas Transações</CardTitle>
        <Button variant="outline" asChild>
          <Link href="/transactions">Ver mais</Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {lastTransactions.length > 0 ? (
          lastTransactions.map((transaction) => {
            return (
              <div key={transaction.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-white bg-opacity-[3%] p-3">
                    <Image
                      src={TRANSACTION_PAYMENT_METHOD_ICONS[transaction.paymentMethod]}
                      alt="Ícone do método de pagamento"
                      height={20}
                      width={20}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{transaction.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(transaction.date).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
                <span className={`text-sm font-bold ${getAmountColor(transaction)}`}>
                  {getAmountPrefix(transaction)}
                  {formatCurrency(Number(transaction.amount))}
                </span>
              </div>
            )
          })
        ) : (
          <div>
            <p className="font-bold">Nenhuma transação encontrada.</p>
          </div>
        )}
      </CardContent>
    </ScrollArea>
  )
}

export default LastTransactions
