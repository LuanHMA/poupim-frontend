import { BadgeCheck, Clock, Layers, Wallet } from "lucide-react";
import { ALL, SlidingTabs, type TabOption } from "../../../../shared/components/ui/sliding-tabs";
import { useTransactionFilters } from "../../hooks/use-transaction-filters";
import type { TransactionStatus } from "../../types/transactions";

const statusOptions: TabOption<typeof ALL | TransactionStatus>[] = [
    { value: ALL, label: "Todos", icon: Layers },
    { value: "PENDING", label: "Pendente", icon: Clock },
    { value: "PAID", label: "Pago", icon: Wallet },
    { value: "RECEIVED", label: "Recebido", icon: BadgeCheck },
];

export function TransactionsStatusFilter() {
    const { filters, setFilter } = useTransactionFilters();

    return (
        <SlidingTabs
            bgColor="bg-background-elevated"
            label="Status"
            value={filters.status ?? ALL}
            options={statusOptions}
            onChange={(value) => setFilter("status", value === ALL ? null : value)}
        />
    );
}
