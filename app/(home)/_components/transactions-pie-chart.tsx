'use client'

import { TransactionType } from '@prisma/client'
import { Pie, PieChart } from 'recharts'
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from 'lucide-react'

import { TransactionPercentagePerType } from '@/app/_data/get-dashboard/types'
import { Card, CardContent } from '@/app/_components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/app/_components/ui/chart'
import PercentageItem from './percentage-item'

const chartConfig = {
  [TransactionType.INVESTMENT]: {
    label: 'Investido',
    color: '#FFFFFF',
  },
  [TransactionType.DEPOSIT]: {
    label: 'Receita',
    color: '#55B02E',
  },
  [TransactionType.EXPENSE]: {
    label: 'Despesas',
    color: '#E93030',
  },
} satisfies ChartConfig

type TransactionsPieChartProps = {
  depositsTotal: number
  investmentsTotal: number
  expensesTotal: number
  typesPercentage: TransactionPercentagePerType
}

function TransactionsPieChart({
  depositsTotal,
  investmentsTotal,
  expensesTotal,
  typesPercentage,
}: TransactionsPieChartProps) {
  const chartData = [
    {
      type: TransactionType.DEPOSIT,
      amount: depositsTotal,
      fill: '#55B02E',
    },
    {
      type: TransactionType.EXPENSE,
      amount: expensesTotal,
      fill: '#E93030',
    },
    {
      type: TransactionType.INVESTMENT,
      amount: investmentsTotal,
      fill: '#FFFFFF',
    },
  ]

  return (
    <Card className="flex flex-col xl:px-7 2xl:px-6 2xl:py-6">
      <CardContent className="flex-1 pb-6">
        {!depositsTotal && !investmentsTotal && !expensesTotal ? (
          <div className="mb-6 flex items-center justify-center">
            <span className="text-center font-bold">Nenhuma transação encontrada.</span>
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie data={chartData} dataKey="amount" nameKey="type" innerRadius={60} />
            </PieChart>
          </ChartContainer>
        )}
        <div className="space-y-3">
          <PercentageItem
            icon={<TrendingUpIcon size={16} className="text-primary" />}
            title="Receita"
            value={typesPercentage[TransactionType.DEPOSIT]}
          />
          <PercentageItem
            icon={<TrendingDownIcon size={16} className="text-danger" />}
            title="Despesas"
            value={typesPercentage[TransactionType.EXPENSE]}
          />
          <PercentageItem
            icon={<PiggyBankIcon size={16} />}
            title="Investido"
            value={typesPercentage[TransactionType.INVESTMENT]}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default TransactionsPieChart
