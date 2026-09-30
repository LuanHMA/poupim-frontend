import { useCreateTransaction } from "../../hooks/use-create-transaction";
import type { TransactionType } from "../../types/transactions";
import { TransactionForm } from "../transaction-form";

interface NewTransactionFormProps {
    transactionType: TransactionType | null;
    onCloseDrawer: () => void;
}

export function NewTransactionForm({ transactionType, onCloseDrawer }: NewTransactionFormProps) {
    if (!transactionType) return null;

    const {
        control,
        isSubmitting,
        handleCreateTransaction,
    } = useCreateTransaction({ transactionType, onCloseDrawer });

    return (
        <TransactionForm
            transactionType={transactionType}
            control={control}
            isSubmitting={isSubmitting}
            onSubmit={handleCreateTransaction}
            submitLabel="Registrar Transação"
            autoFocusAmount
        />
    );
}