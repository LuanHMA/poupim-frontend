import { ArrowDownLeft, ArrowUpRight, Circle } from "lucide-react";
import { ALL, SlidingTabs, type TabOption } from "../../../../shared/components/ui/sliding-tabs";
import { useTransactionFilters } from "../../hooks/use-transaction-filters";
import type { TransactionType } from "../../types/transactions";

const typeOptions: TabOption<typeof ALL | TransactionType>[] = [
    { value: ALL, label: "Todos", icon: Circle },
    { value: "INCOME", label: "Receita", icon: ArrowDownLeft },
    { value: "EXPENSE", label: "Despesa", icon: ArrowUpRight },
];

export function TransactionsTypeFilter() {
    const { filters, setFilter } = useTransactionFilters();

    return (
        <SlidingTabs
            bgColor="bg-background-elevated"
            label="Tipo"
            value={filters.type ?? ALL}
            options={typeOptions}
            onChange={(value) => setFilter("type", value === ALL ? null : value)}
        />
    );
}
