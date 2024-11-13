'use client'

import { Trash2Icon } from 'lucide-react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/app/_components/ui/alert-dialog'
import { Button } from '@/app/_components/ui/button'
import { deleteTransaction } from '../_actions/delete-transaction'
import { toast } from 'sonner'

type DeleteTransactionButtonProps = {
  transactionId: string
}

function DeleteTransactionButton({ transactionId }: DeleteTransactionButtonProps) {
  async function handleConfirmDeleteClick(transactionId: string) {
    try {
      await deleteTransaction({ transactionId })
      toast.success('Transação deletada com sucesso!')
    } catch (error) {
      console.error(error)
      toast.error('Ocorreu um erro ao deletar a transação.')
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Trash2Icon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você deseja realmente deletar essa transação?</AlertDialogTitle>
          <AlertDialogDescription>Essa ação não pode ser desfeita.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleConfirmDeleteClick(transactionId)}>
            Deletar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteTransactionButton
