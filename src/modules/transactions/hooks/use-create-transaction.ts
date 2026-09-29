import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { createTransactionSchema, type CreateTransactionSchemaType } from "../schemas/create-transaction-schema"

export function useCreateTransaction() {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        reset,
        control
    } = useForm<CreateTransactionSchemaType>({
        resolver: zodResolver(createTransactionSchema)
    })

    const handleCreateTransaction = async (data: CreateTransactionSchemaType) => {
        console.log(data)
    }

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