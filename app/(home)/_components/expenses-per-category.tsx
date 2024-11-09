import { TotalExpensePerCategory } from '@/app/_data/get-dashboard/types'
import { CardContent, CardHeader, CardTitle } from '@/app/_components/ui/card'
import { ScrollArea } from '@/app/_components/ui/scroll-area'
import { Progress } from '@/app/_components/ui/progress'
import { TRANSACTION_CATEGORY_LABELS } from '@/app/_constants/transactions'

type ExpensesPerCategoryProps = {
  expensesPerCategory: TotalExpensePerCategory[]
}

function ExpensesPerCategory({ expensesPerCategory }: ExpensesPerCategoryProps) {
  return (
    <ScrollArea className="col-span-2 h-full rounded-md border pb-6">
      <CardHeader>
        <CardTitle className="font-bold">Gastos por Categoria</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {expensesPerCategory[0] !== undefined ? (
          expensesPerCategory.map((category) => {
            return (
              <div key={category.category} className="space-y-2">
                <div className="flex w-full justify-between">
                  <p className="text-sm font-bold">
                    {TRANSACTION_CATEGORY_LABELS[category.category]}
                  </p>
                  <span className="text-sm font-bold">{category.percentageOfTotal}%</span>
                </div>
                <Progress value={category.percentageOfTotal} />
              </div>
            )
          })
        ) : (
          <div>
            <p className="font-bold">Nenhuma despesa encontrada.</p>
          </div>
        )}
      </CardContent>
    </ScrollArea>
  )
}

export default ExpensesPerCategory
