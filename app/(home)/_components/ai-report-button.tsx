'use client'

import { useState } from 'react'
import { BotIcon, Loader2Icon } from 'lucide-react'
import Markdown from 'react-markdown'

import { generateAiReport } from '../_actions/generate-ai-report'
import { Button } from '@/app/_components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/_components/ui/dialog'
import { ScrollArea } from '@/app/_components/ui/scroll-area'
import Link from 'next/link'

type AiReportButtonProps = {
  month: string
  hasPremiumPlan: boolean
}

function AiReportButton({ month, hasPremiumPlan }: AiReportButtonProps) {
  const [report, setReport] = useState<string | null>(null)
  const [reportIsLoading, setReportIsLoading] = useState(false)

  async function handleGenerateAiReportClick() {
    try {
      setReportIsLoading(true)
      const aiReport = await generateAiReport({ month })
      setReport(aiReport)
    } catch (error) {
      console.log(error)
    } finally {
      setReportIsLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          Relatório IA
          <BotIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[600px]">
        {hasPremiumPlan ? (
          <>
            <DialogHeader>
              <DialogTitle>Relatório IA</DialogTitle>
              <DialogDescription>
                Use Inteligência Artificial para gerar um relatório com insights sobre suas
                finanças.
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="prose max-h-[450px] text-white prose-h2:text-white prose-h3:text-white prose-h4:text-white prose-strong:text-white">
              <Markdown className="px-4">{report}</Markdown>
            </ScrollArea>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost">Cancelar</Button>
              </DialogClose>
              <Button onClick={handleGenerateAiReportClick} disabled={reportIsLoading}>
                {reportIsLoading && <Loader2Icon className="animate-spin" />}
                {reportIsLoading ? 'Gerando relatório...' : 'Gerar relatório'}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Relatório IA</DialogTitle>
              <DialogDescription>
                Você precisa de um plano premium para gerar relatórios com IA.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost">Cancelar</Button>
              </DialogClose>
              <Button asChild>
                <Link href="/subscription">Assinar plano premium</Link>
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default AiReportButton
