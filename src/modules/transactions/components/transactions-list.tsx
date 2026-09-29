import { CategoryIcon } from "@/modules/categories/components/category-icon"
import { Badge } from "@/shared/components/ui"
import { formatations } from "@/shared/utils/formatations"
import { useQuery } from "@tanstack/react-query"
import { Clock } from "lucide-react"
import { transactionQueryKeys } from "../query-keys"
import { TransactionsService } from "../transactions.service"
import type { GetTransactionsOutput, Transaction } from "../types/transactions"

interface TransactionsListProps {
    month: number
    year: number
}

export function TransactionsList({ month, year }: TransactionsListProps) {
    const { data, isLoading, isError } = useQuery<GetTransactionsOutput>({
        queryKey: transactionQueryKeys.listByPeriod(month, year),
        queryFn: () => TransactionsService.getTransactions({ month, year }),
    })

    if (isLoading) return <div>Carregando...</div>;
    if (isError) return <div>Erro ao carregar transações</div>;

    const transactionsByDay = new Map<string, Transaction[]>();

    data?.transactions.forEach(transaction => {
        const day = new Date(transaction.created_at).toLocaleDateString("en-CA", {
            timeZone: "America/Sao_Paulo",
        })

        const items = transactionsByDay.get(day) || [];
        items.push(transaction);
        transactionsByDay.set(day, items);
    });

    const statusStyles = {
        PENDING: {
            color: "text-content-primary",
            label: "Pendente",
        },
        PAID: {
            color: "text-content-success",
            label: "Pago",
        },
        RECEIVED: {
            color: "text-content-success",
            label: "Recebido",
        },
    }

    return (
        <div>
            {Array.from(transactionsByDay.entries()).map(([day, transactions]) => (
                <div key={day} className="space-y-6 pb-6">
                    <h3 className="text-sm text-content-muted font-medium">{formatations.toDDMM(day)}</h3>
                    <div className="flex flex-col gap-4">
                        {transactions.map(({
                            id,
                            category,
                            description,
                            created_at,
                            amount,
                            status,
                            type
                        }) => (
                            <div className="flex items-center gap-4 justify-between w-full last:border-none last:pb-0 border-b border-brd-subtle pb-4" key={id}>
                                <div className="flex items-center gap-4">
                                    <span className="flex items-center justify-center size-10 rounded-md bg-background-elevated">
                                        <CategoryIcon name={category.icon} color={category.color} className="size-5" />
                                    </span>
                                    <div className="flex flex-col items-start gap-1">
                                        <p className="text-base font-medium text-content-primary">{description}</p>
                                        <div className="flex items-center gap-2">
                                            <Badge
                                                variant="outline"
                                                className="text-xs text-content-muted"
                                                leftIcon={<Clock className="size-4" />}
                                            >
                                                {formatations.toHHMM(created_at)}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-1">
                                    <p className={`text-sm font-medium tracking-wide ${type === "INCOME" && status !== "PENDING" ? "text-content-success" : type === "EXPENSE" && status !== "PENDING" ? "text-content-danger" : "text-content-primary"}`}>
                                        {type === "INCOME" && status !== "PENDING" ? "+" : type === "EXPENSE" && status !== "PENDING" ? "-" : ""}
                                        {formatations.toBRL(amount)}
                                    </p>
                                    <p className="text-xs text-content-muted">{statusStyles[status].label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}