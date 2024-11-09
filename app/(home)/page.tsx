import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { isMatch, format } from 'date-fns'

import Navbar from '../_components/navbar'
import SummaryCards from './_components/summary-cards'
import MonthSelect from './_components/month-select'

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

  return (
    <>
      <Navbar />
      <div className="space-y-6 p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <MonthSelect />
        </div>
        <SummaryCards month={month} />
      </div>
    </>
  )
}

export default HomePage
