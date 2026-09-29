import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { invalidateCreatedTransactionQueries } from "../query-keys"
import { createTransactionSchema, type CreateTransactionSchemaType } from "../schemas/create-transaction-schema"
import { TransactionsService } from "../transactions.service"
import type { TransactionType } from "../types/transactions"

interface UseCreateTransactionProps {
    transactionType: TransactionType
    onCloseDrawer: () => void
}

export function useCreateTransaction({ transactionType, onCloseDrawer }: UseCreateTransactionProps) {
    const queryClient = useQueryClient()

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        reset,
        control
    } = useForm<CreateTransactionSchemaType>({
        resolver: zodResolver(createTransactionSchema),
        defaultValues: {
            amount: 0,
            date: new Date().toISOString().split('T')[0],
            ignore: false,
            fixed: false,
            status: true,
            observation: "",
        }
    })

    const handleCreateTransaction = handleSubmit(async (data) => {
        try {
            const status = transactionType === "EXPENSE" ? (
                data.status ? "PAID" : "PENDING"
            ) : (
                data.status ? "RECEIVED" : "PENDING"
            )

            const created = await TransactionsService.createTransaction({
                ...data,
                status,
                type: transactionType,
                category_id: data.categoryId,
            })

            const [yearFromDate, monthFromDate] = data.date.split("-").map(Number)

            await invalidateCreatedTransactionQueries(queryClient, {
                month: created.transaction?.month ?? monthFromDate,
                year: created.transaction?.year ?? yearFromDate,
            })

            toast.success("Transação criada com sucesso")

            reset()
            onCloseDrawer()
        } catch (error) {
            console.error(error)
            toast.error("Erro ao criar transação")
        }
    })

    return {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        reset,
        control,
        handleCreateTransaction
    }
}