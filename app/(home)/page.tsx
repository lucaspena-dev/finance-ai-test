import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { isMatch, format } from 'date-fns'

import { getDashboard } from '../_data/get-dashboard'
import Navbar from '../_components/navbar'
import SummaryCards from './_components/summary-cards'
import MonthSelect from './_components/month-select'
import TransactionsPieChart from './_components/transactions-pie-chart'

type HomeProps = {
  searchParams: {
    month: string
  }
}

async function HomePage({ searchParams: { month } }: HomeProps) {
  const { userId } = await auth()

  if (!userId) {
    redirect('/login')
  }

  const monthIsValid = !month || !isMatch(month, 'MM')

  if (monthIsValid) {
    redirect(`/?month=${format(new Date(), 'MM')}`)
  }

  const dashboard = await getDashboard(month)

  return (
    <>
      <Navbar />
      <div className="space-y-6 p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <MonthSelect />
        </div>
        <div className="grid grid-cols-[2fr,1fr]">
          <div className="flex flex-col gap-6">
            <SummaryCards {...dashboard} />
            <div className="grid grid-cols-3 grid-rows-1 gap-6">
              <TransactionsPieChart {...dashboard} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage
