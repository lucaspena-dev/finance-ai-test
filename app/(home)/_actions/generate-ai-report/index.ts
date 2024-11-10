'use server'

import { endOfMonth, startOfMonth } from 'date-fns'
import { GoogleGenerativeAI } from '@google/generative-ai'

import { db } from '@/app/_lib/prisma'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { GenerateAiReportSchema, generateAiReportSchema } from './schema'

export async function generateAiReport({ month }: GenerateAiReportSchema) {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('Unauthorized')
  }

  generateAiReportSchema.parse({ month })

  const user = await clerkClient().users.getUser(userId)
  const hasPremiumPlan = user.publicMetadata.subscriptionPlan === 'premium'

  if (!hasPremiumPlan) {
    throw new Error('You need a premium plan to generate AI reports.')
  }

  if (!process.env.GEMINI_API_KEY) {
    throw new Error('Gemini API key not found')
  }

  const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

  const transactions = await db.transaction.findMany({
    where: {
      userId,
      date: {
        gte: startOfMonth(new Date(`2024-${month}-01`)),
        lt: endOfMonth(new Date(`2024-${month}-31`)),
      },
    },
  })

  const content = `Gere um relatório com insights sobre as minhas finanças, com dicas e orientações de como melhorar minha vida financeira. As transações estão divididas por ponto e vírgula. A estrutura de cada uma é {DATA}-{TIPO}-{VALOR}-{CATEGORIA}. São elas:
        ${transactions
          .map(
            (transaction) =>
              `${transaction.date.toLocaleDateString('pt-BR')}-R$${transaction.amount}-${transaction.type}-${transaction.category}`
          )
          .join(';')} OBS: Os investimentos são considerados como gastos e não despesas.`

  const model = genAi.getGenerativeModel({
    model: 'gemini-1.5-flash',
    systemInstruction:
      'Você é um especialista em gestão e organização de finanças pessoais. Você ajuda as pessoas a organizarem melhor as suas finanças.',
  })
  const message = await model.generateContent(content)

  return message.response.text()
}
