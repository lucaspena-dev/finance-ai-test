import AddTransactionButton from '@/app/_components/add-transaction-button'

import { Card, CardHeader, CardContent } from '@/app/_components/ui/card'

type SummaryCardProps = {
  icon: React.ReactNode
  title: string
  amount: number
  size?: 'small' | 'large'
}

async function SummaryCard({ icon, title, amount, size = 'small' }: SummaryCardProps) {
  return (
    <Card className={`${size === 'large' ? 'bg-white bg-opacity-5' : ''}`}>
      <CardHeader className="flex-row items-center gap-3">
        {icon}
        <p className={`${size === 'small' ? 'text-muted-foreground' : 'text-white opacity-70'}`}>
          {title}
        </p>
      </CardHeader>
      <CardContent className="flex justify-between">
        <p className={`${size === 'small' ? 'text-2xl' : 'text-4xl'} font-bold`}>
          {Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(amount)}
        </p>

        {size === 'large' && <AddTransactionButton />}
      </CardContent>
    </Card>
  )
}

export default SummaryCard
