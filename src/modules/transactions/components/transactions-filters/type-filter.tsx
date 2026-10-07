import { ArrowDownLeft, ArrowUpRight, Circle } from "lucide-react";
import { ALL, SlidingTabs, type TabOption } from "../../../../shared/components/ui/sliding-tabs";
import type { TransactionType } from "../../types/transactions";

const typeOptions: TabOption<typeof ALL | TransactionType>[] = [
    { value: ALL, label: "Todos", icon: Circle },
    { value: "INCOME", label: "Ganho", icon: ArrowDownLeft },
    { value: "EXPENSE", label: "Gasto", icon: ArrowUpRight },
];

type TransactionsTypeFilterProps = {
    type?: TransactionType;
    onChange: (type: TransactionType | null) => void;
};

export function TransactionsTypeFilter({ type, onChange }: TransactionsTypeFilterProps) {
    return (
        <SlidingTabs
            bgColor="bg-background-elevated"
            label="Tipo"
            value={type ?? ALL}
            options={typeOptions}
            onChange={(value) => onChange(value === ALL ? null : value)}
        />
    );
}
