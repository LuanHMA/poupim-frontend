import { useUpdateTransaction } from "../../hooks/use-update-transaction";
import type { Transaction } from "../../types/transactions";
import { TransactionForm } from "../transaction-form";

interface EditTransactionFormProps {
    transaction: Transaction;
    onCloseDrawer: () => void;
    onSaved?: () => void;
}

export function EditTransactionForm({ transaction, onCloseDrawer, onSaved }: EditTransactionFormProps) {
    const {
        control,
        isSubmitting,
        handleUpdateTransaction,
    } = useUpdateTransaction({ transaction, onCloseDrawer, onSaved });


    return (
        <TransactionForm
            transactionType={transaction.type}
            control={control}
            isSubmitting={isSubmitting}
            onSubmit={handleUpdateTransaction}
            submitLabel="Salvar alterações"
            category={transaction.category}
        />
    );
}
