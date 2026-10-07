import { BadgeCheck, Clock, Layers, Wallet } from "lucide-react";
import { ALL, SlidingTabs, type TabOption } from "../../../../shared/components/ui/sliding-tabs";
import type { TransactionStatus } from "../../types/transactions";

const statusOptions: TabOption<typeof ALL | TransactionStatus>[] = [
    { value: ALL, label: "Todos", icon: Layers },
    { value: "PENDING", label: "Pendente", icon: Clock },
    { value: "PAID", label: "Pago", icon: Wallet },
    { value: "RECEIVED", label: "Recebido", icon: BadgeCheck },
];

type TransactionsStatusFilterProps = {
    status?: TransactionStatus;
    onChange: (status: TransactionStatus | null) => void;
};

export function TransactionsStatusFilter({ status, onChange }: TransactionsStatusFilterProps) {
    return (
        <SlidingTabs
            bgColor="bg-background-elevated"
            label="Status"
            value={status ?? ALL}
            options={statusOptions}
            onChange={(value) => onChange(value === ALL ? null : value)}
        />
    );
}
