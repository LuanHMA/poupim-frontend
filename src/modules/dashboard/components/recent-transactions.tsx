import { CategoryIcon } from "@/modules/categories/components/category-icon";
import { transactionQueryKeys } from "@/modules/transactions/query-keys";
import { TransactionsService } from "@/modules/transactions/transactions.service";
import type { GetTransactionsOutput } from "@/modules/transactions/types/transactions";
import { transactionStatusStyles } from "@/modules/transactions/utils/custom-styles";
import { formatations } from "@/shared/utils/formatations";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export function RecentTransactions({ currentMonth, currentYear }: { currentMonth: number, currentYear: number }) {
    const { data, isLoading, isError } = useQuery<GetTransactionsOutput>({
        queryKey: transactionQueryKeys.recentByPeriod(currentMonth, currentYear),
        queryFn: () => TransactionsService.getRecentTransactions({
            month: currentMonth,
            year: currentYear,
        }),
    });

    if (isLoading) return <div>Carregando...</div>
    if (isError) return <div>Erro ao carregar as transações</div>

    return (
        <section className="flex flex-col items-start gap-8 bg-background-surface p-4 rounded-xl">
            <div className="flex items-center gap-4 justify-between w-full">
                <h2 className="text-content-primary font-semibold text-lg">Últimas transações</h2>
                <Link to="/transactions" className="text-sm text-content-accent hover:text-content-accent-light transition-all duration-300">
                    Ver todas
                </Link>
            </div>
            <div className="flex flex-col gap-4 w-full">
                {data?.transactions.map(({ id, amount, description, status, type, category, created_at }) => {
                    return (
                        <div className="flex items-center gap-4 justify-between w-full last:border-none last:pb-0 border-b border-brd-subtle pb-4" key={id}>
                            <div className="flex items-center gap-4">
                                <span className="flex items-center justify-center size-10 rounded-md bg-background-elevated">
                                    <CategoryIcon category={category} className="size-5" />
                                </span>
                                <div className="flex flex-col items-start gap-1">
                                    <p className="text-sm font-medium text-content-primary">{description}</p>
                                    <p className="text-xs text-content-muted">{formatations.dateTimeLong(created_at)}</p>
                                </div>
                            </div>

                            <div className="flex flex-col items-end gap-1">
                                <p className={`text-sm font-medium tracking-wide ${type === "INCOME" && status !== "PENDING" ? "text-content-success" : type === "EXPENSE" && status !== "PENDING" ? "text-content-danger" : "text-content-primary"}`}>
                                    {type === "INCOME" && status !== "PENDING" ? "+" : type === "EXPENSE" && status !== "PENDING" ? "-" : ""}
                                    {formatations.currency(amount)}
                                </p>
                                <p className="text-xs text-content-muted">{transactionStatusStyles[status].label}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
