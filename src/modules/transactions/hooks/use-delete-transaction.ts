import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import { invalidateCreatedTransactionQueries } from "../query-keys";
import { TransactionsService } from "../transactions.service";
import type { Transaction } from "../types/transactions";

interface UseDeleteTransactionProps {
    transaction: Transaction;
    onDeleted: () => void;
}

export function useDeleteTransaction({ transaction, onDeleted }: UseDeleteTransactionProps) {
    const queryClient = useQueryClient();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteTransaction = async () => {
        try {
            setIsDeleting(true);

            await TransactionsService.deleteTransaction(String(transaction.id));

            await invalidateCreatedTransactionQueries(queryClient, {
                month: transaction.month,
                year: transaction.year,
            });

            toast.success("Transação deletada com sucesso");
            onDeleted();
        } catch (error) {
            console.error(error);
            toast.error("Erro ao deletar transação");
        } finally {
            setIsDeleting(false);
        }
    };

    return {
        isDeleting,
        handleDeleteTransaction,
    };
}
