'use client'

import { Transaction } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { Trash2Icon } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import TransactionTypeBadge from '../_components/type-badge'
import {
  TRANSACTION_CATEGORY_LABELS,
  TRANSACTION_PAYMENT_METHOD_LABELS,
} from '@/app/_constants/transactions'
import EditTransactionButton from '../_components/edit-transaction-button'
import { Button } from '@/app/_components/ui/button'
import { formatCurrency } from '@/app/_utils/currency'

const MONTH_OPTIONS = [
  {
    value: 'janeiro',
    label: 'Janeiro',
  },
  {
    value: 'fevereiro',
    label: 'Fevereiro',
  },
  {
    value: 'marco',
    label: 'Março',
  },
  {
    value: 'abril',
    label: 'Abril',
  },
  {
    value: 'maio',
    label: 'Maio',
  },
  {
    value: 'junho',
    label: 'Junho',
  },
  {
    value: 'julho',
    label: 'Julho',
  },
  {
    value: 'agosto',
    label: 'Agosto',
  },
  {
    value: 'setembro',
    label: 'Setembro',
  },
  {
    value: 'outubro',
    label: 'Outubro',
  },
  {
    value: 'novembro',
    label: 'Novembro',
  },
  {
    value: 'dezembro',
    label: 'Dezembro',
  },
]

function formatMonth(date: string) {
  for (let i = 0; i < MONTH_OPTIONS.length; i++) {
    if (date.includes(MONTH_OPTIONS[i].value)) {
      return date.replace(MONTH_OPTIONS[i].value, MONTH_OPTIONS[i].label)
    }
  }
  return date
}

export const transactionsColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'type',
    header: 'Tipo',
    cell: ({ row: { original: transaction } }) => {
      return <TransactionTypeBadge transaction={transaction} />
    },
  },
  {
    accessorKey: 'category',
    header: 'Categoria',
    cell: ({ row: { original: transaction } }) => {
      return TRANSACTION_CATEGORY_LABELS[transaction.category]
    },
  },
  {
    accessorKey: 'paymentMethod',
    header: 'Método de Pagamento',
    cell: ({ row: { original: transaction } }) => {
      return TRANSACTION_PAYMENT_METHOD_LABELS[transaction.paymentMethod]
    },
  },
  {
    accessorKey: 'date',
    header: 'Data',
    cell: ({ row: { original: transaction } }) => {
      const formattedDate = format(new Date(transaction.date), `dd 'de' MMMM, yyyy`, {
        locale: ptBR,
      })

      return formatMonth(formattedDate)
    },
  },
  {
    accessorKey: 'amount',
    header: 'Valor',
    cell: ({ row: { original: transaction } }) => {
      return formatCurrency(Number(transaction.amount))
    },
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
    cell: ({ row: { original: transaction } }) => {
      return (
        <div className="space-x-1">
          <EditTransactionButton transaction={transaction} />
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Trash2Icon />
          </Button>
        </div>
      )
    },
  },
]
