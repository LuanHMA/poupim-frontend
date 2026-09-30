import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { invalidateCreatedTransactionQueries } from "../query-keys";
import { createTransactionSchema, type CreateTransactionSchemaType } from "../schemas/create-transaction-schema";
import { TransactionsService } from "../transactions.service";
import type { Transaction } from "../types/transactions";

interface UseUpdateTransactionProps {
    transaction: Transaction;
    onCloseDrawer: () => void;
    onSaved?: () => void;
}

export function useUpdateTransaction({ transaction, onCloseDrawer, onSaved }: UseUpdateTransactionProps) {
    const queryClient = useQueryClient();

    const {
        handleSubmit,
        formState: { isSubmitting },
        control,
    } = useForm<CreateTransactionSchemaType>({
        resolver: zodResolver(createTransactionSchema),
        defaultValues: {
            amount: transaction.amount,
            description: transaction.description,
            categoryId: transaction.category.id,
            date: new Date(transaction.created_at).toLocaleDateString("en-CA", {
                timeZone: "America/Sao_Paulo",
            }),
            status: transaction.status !== "PENDING",
            ignore: transaction.ignore,
            fixed: transaction.fixed,
            observation: transaction.observation ?? "",
        },
    });

    const handleUpdateTransaction = handleSubmit(async (data) => {
        try {
            const status = transaction.type === "EXPENSE"
                ? (data.status ? "PAID" : "PENDING")
                : (data.status ? "RECEIVED" : "PENDING");

            await TransactionsService.updateTransaction(String(transaction.id), {
                ...data,
                status,
                type: transaction.type,
                category_id: data.categoryId,
            });

            const [yearFromDate, monthFromDate] = data.date.split("-").map(Number);

            await Promise.all([
                invalidateCreatedTransactionQueries(queryClient, {
                    month: transaction.month,
                    year: transaction.year,
                }),
                invalidateCreatedTransactionQueries(queryClient, {
                    month: monthFromDate,
                    year: yearFromDate,
                }),
            ]);

            toast.success("Transação atualizada com sucesso");
            onSaved?.();
            onCloseDrawer();
        } catch (error) {
            console.error(error);
            toast.error("Erro ao atualizar transação");
        }
    });

    return {
        control,
        isSubmitting,
        handleUpdateTransaction,
    };
}
