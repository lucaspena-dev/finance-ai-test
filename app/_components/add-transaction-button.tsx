'use client'

import { useState } from 'react'
import { ArrowDownUpIcon } from 'lucide-react'

import UpsertTransactionDialog from './upsert-transaction-dialog'
import { Button } from './ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'

type AddTransactionButtonProps = {
  userCanAddTransaction?: boolean
}

function AddTransactionButton({ userCanAddTransaction }: AddTransactionButtonProps) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="rounded-full font-bold"
              onClick={() => setDialogIsOpen(true)}
              disabled={!userCanAddTransaction}
            >
              Adicionar transação
              <ArrowDownUpIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {!userCanAddTransaction &&
              'Você atingiu o limite de transações mensais. Atualize seu plano para a versão premium para adicionar transações ilimitadas.'}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <UpsertTransactionDialog isOpen={dialogIsOpen} setIsOpen={setDialogIsOpen} />
    </>
  )
}

export default AddTransactionButton
