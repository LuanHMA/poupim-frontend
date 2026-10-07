import { CategoryIcon } from "@/modules/categories/components/category-icon";
import { transactionQueryKeys } from "@/modules/transactions/query-keys";
import { TransactionsService } from "@/modules/transactions/transactions.service";
import type { GetTransactionsOutput } from "@/modules/transactions/types/transactions";
import { transactionStatusStyles } from "@/modules/transactions/utils/custom-styles";
import { Button, Skeleton } from "@/shared/components/ui";
import { formatations } from "@/shared/utils/formatations";
import { useQuery } from "@tanstack/react-query";
import { CircleAlert } from "lucide-react";
import { Link } from "react-router-dom";

export function RecentTransactions({ currentMonth, currentYear }: { currentMonth: number, currentYear: number }) {
    const { data, isLoading, isError, refetch } = useQuery<GetTransactionsOutput>({
        queryKey: transactionQueryKeys.recentByPeriod(currentMonth, currentYear),
        queryFn: () => TransactionsService.getRecentTransactions({
            month: currentMonth,
            year: currentYear,
        }),
    });

    if (isLoading) {
        return (
            <section className="flex flex-col items-start gap-6 rounded-xl bg-background-surface p-4" role="status" aria-live="polite">
                <span className="sr-only">Carregando transações recentes</span>
                <h2 className="text-lg font-semibold text-content-primary">Últimas transações</h2>
                <div className="flex w-full flex-col gap-4">
                    {Array.from({ length: 4 }, (_, index) => (
                        <div key={index} className="flex w-full items-center justify-between gap-4 border-b border-brd-subtle pb-4 last:border-b-0 last:pb-0">
                            <div className="flex items-center gap-4">
                                <Skeleton className="size-10 rounded-md" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-3 w-24" />
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-3 w-14" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        )
    }
    if (isError) {
        return (
            <section role="alert" className="flex flex-col items-start gap-4 rounded-xl bg-background-surface p-4">
                <h2 className="text-lg font-semibold text-content-primary">Últimas transações</h2>
                <div className="flex w-full flex-col items-start gap-3">
                    <div className="flex items-start gap-3">
                        <CircleAlert className="mt-0.5 size-5 shrink-0 text-content-danger" />
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-content-primary">Não foi possível carregar as transações</p>
                            <p className="text-sm text-content-muted">As movimentações deste período não foram carregadas.</p>
                        </div>
                    </div>
                    <Button type="button" variant="link" size="sm" onClick={() => refetch()}>
                        Tentar novamente
                    </Button>
                </div>
            </section>
        )
    }

    return (
        <section className="flex flex-col items-start gap-6 bg-background-surface p-4 rounded-xl">
            <div className="flex items-center gap-4 justify-between w-full">
                <h2 className="text-content-primary font-semibold text-lg">Últimas transações</h2>
                {data?.transactions?.length && data.transactions.length > 0 ? (
                    <Link to="/transactions" className="text-sm text-content-accent hover:text-content-accent-light transition-all duration-300">
                        Ver todas
                    </Link>
                ) : null}
            </div>
            <div className="flex flex-col gap-4 w-full">
                {data?.transactions.length === 0 ? (
                    <div className="flex items-center justify-start w-full">
                        <p className="text-sm text-content-muted">Nenhuma transação encontrada</p>
                    </div>
                ) : (
                    data?.transactions.map(({ id, amount, description, status, type, category, created_at }) => {
                        return (
                            <Link to={"/transactions"} className="flex items-center gap-4 justify-between w-full last:border-none last:pb-0 border-b border-brd-subtle pb-4" key={id}>
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
                            </Link>
                        )
                    })
                )}
            </div>
        </section>
    )
}
