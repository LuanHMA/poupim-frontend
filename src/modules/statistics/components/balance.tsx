import { StatisticsService } from "@/modules/statistics/statistics.service";
import { transactionRelatedQueryKeys } from "@/modules/transactions/query-keys";
import { formatations } from "@/shared/utils/formatations";
import { useQuery } from "@tanstack/react-query";
import { ArrowDownLeft, ArrowUpRight, Wallet2 } from "lucide-react";

interface BalanceProps {
    currentMonth: number;
    currentYear: number;
    visualEffects?: boolean;
}

export function Balance({ currentMonth, currentYear, visualEffects = true }: BalanceProps) {
    const { data: balance, isLoading, isError } = useQuery({
        queryKey: transactionRelatedQueryKeys.cashFlowByPeriod(currentMonth, currentYear),
        queryFn: () => StatisticsService.getCashFlow({
            month: currentMonth,
            year: currentYear,
        }),
    });

    if (isError || (balance && !balance.success)) {
        return <div>Erro ao carregar o saldo</div>
    }

    if (isLoading || !balance) {
        return <div>Carregando...</div>
    }

    return (
        <>
            <section className="bg-linear-to-t from-background-surface to-background-elevated rounded-xl p-6 space-y-4 relative z-1 overflow-hidden sm:hidden">
                {visualEffects && <div className="pointer-events-none absolute -left-8 -top-10 size-24 rounded-full bg-background-accent/60 blur-3xl -z-1" />}
                {visualEffects && <div className="pointer-events-none absolute -right-14 top-[18%] size-24 rounded-full bg-background-accent/55 blur-3xl -z-1" />}
                {visualEffects && <div className="pointer-events-none absolute left-[38%] -bottom-12 size-20 rounded-full bg-background-accent/40 blur-3xl -z-1" />}

                <div className="flex flex-col items-center gap-1 z-1">
                    <h2 className="text-sm text-content-muted font-medium flex items-center gap-2">
                        <Wallet2 className="size-4 text-content-primary" />
                        Saldo
                    </h2>
                    <p className=" text-content-primary font-bold text-4xl">
                        {formatations.toBRL(balance.cashFlow.balance ?? 0)}
                    </p>

                </div>

                <div className="flex justify-evenly gap-6 items-center z-1">
                    <div className="flex flex-col items-center gap-1">
                        <p className="text-sm text-content-muted flex items-center gap-1">
                            <ArrowDownLeft className="size-4 text-content-success" />
                            Receitas
                        </p>
                        <p className="text-base font-medium text-content-primary">
                            {formatations.toBRL(balance.cashFlow.total_income ?? 0)}
                        </p>
                    </div>

                    <div className="w-px h-6 bg-background-elevated" />

                    <div className="flex flex-col items-center gap-1">
                        <p className="text-sm text-content-muted flex items-center gap-1">
                            <ArrowUpRight className="size-4 text-content-danger" />
                            Despesas
                        </p>
                        <p className="text-base font-medium text-content-primary">
                            {formatations.toBRL(balance.cashFlow.total_expense ?? 0)}
                        </p>
                    </div>
                </div>
            </section>

            <section className="hidden sm:grid grid-cols-1 gap-4 lg:grid-cols-3">
                <div className="relative z-1 overflow-hidden rounded-xl bg-linear-to-t from-background-surface to-background-elevated p-6">
                    <div className="pointer-events-none absolute -left-8 -top-10 size-24 rounded-full bg-background-accent/60 blur-3xl -z-1" />
                    <div className="pointer-events-none absolute -right-14 top-[18%] size-24 rounded-full bg-background-accent/55 blur-3xl -z-1" />
                    <div className="pointer-events-none absolute left-[38%] -bottom-12 size-20 rounded-full bg-background-accent/40 blur-3xl -z-1" />

                    <div className="relative z-1 flex flex-col gap-2">
                        <h2 className="text-sm font-medium text-content-muted">Saldo</h2>
                        <p className="text-4xl font-bold text-content-primary">
                            {formatations.toBRL(balance.cashFlow.balance ?? 0)}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-2 rounded-xl border border-brd-default bg-background-surface p-6">
                    <p className="flex items-center gap-1 text-sm text-content-muted">
                        <ArrowDownLeft className="size-4 text-content-success" />
                        Entradas
                    </p>
                    <p className="text-2xl font-semibold text-content-primary">
                        {formatations.toBRL(balance.cashFlow.total_income ?? 0)}
                    </p>
                </div>

                <div className="flex flex-col gap-2 rounded-xl border border-brd-default bg-background-surface p-6">
                    <p className="flex items-center gap-1 text-sm text-content-muted">
                        <ArrowUpRight className="size-4 text-content-danger" />
                        Saídas
                    </p>
                    <p className="text-2xl font-semibold text-content-primary">
                        {formatations.toBRL(balance.cashFlow.total_expense ?? 0)}
                    </p>
                </div>
            </section>
        </>
    )
}
