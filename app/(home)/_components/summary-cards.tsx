import { PiggyBankIcon, TrendingUpIcon, WalletIcon } from 'lucide-react'

import SummaryCard from './summary-card'
import { canUserAddTransaction } from '@/app/_data/can-user-add-transaction'

type SummaryCardsProps = {
  balance: number
  depositsTotal: number
  investmentsTotal: number
  expensesTotal: number
}

async function SummaryCards({
  balance,
  depositsTotal,
  investmentsTotal,
  expensesTotal,
}: SummaryCardsProps) {
  const userCanAddTransaction = await canUserAddTransaction()

  return (
    <div className="space-y-6">
      <SummaryCard
        icon={<WalletIcon size={16} />}
        title="Saldo"
        amount={balance}
        size="large"
        userCanAddTransaction={userCanAddTransaction}
      />

      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          icon={<PiggyBankIcon size={16} />}
          title="Investido"
          amount={investmentsTotal}
        />
        <SummaryCard
          icon={<TrendingUpIcon size={16} className="text-primary" />}
          title="Receita"
          amount={depositsTotal}
        />
        <SummaryCard
          icon={<TrendingUpIcon size={16} className="text-danger" />}
          title="Despesas"
          amount={expensesTotal}
        />
      </div>
    </div>
  )
}

export default SummaryCards
