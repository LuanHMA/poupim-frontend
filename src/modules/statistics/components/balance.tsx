import { BalanceSkeleton } from "@/modules/statistics/components/balance-skeleton";
import { StatisticsService } from "@/modules/statistics/statistics.service";
import { transactionRelatedQueryKeys } from "@/modules/transactions/query-keys";
import { Button } from "@/shared/components/ui";
import { cn } from "@/shared/utils/cn";
import { formatations } from "@/shared/utils/formatations";
import { useQuery } from "@tanstack/react-query";
import { ArrowDownLeft, ArrowUpRight, CircleAlert, Wallet2 } from "lucide-react";
import type { CSSProperties } from "react";

interface BalanceProps {
    currentMonth: number;
    currentYear: number;
    visualEffects?: boolean;
}

function FittedCurrency({
    value,
    maxSize,
    className,
}: {
    value: number;
    maxSize: string;
    className?: string;
}) {
    const formatted = formatations.currency(value);
    const style = {
        "--chars": Math.max(formatted.length, 1) * 0.72,
        "--max-size": maxSize,
    } as CSSProperties;

    return (
        <div className="@container w-full min-w-0">
            <p
                style={style}
                className={cn(
                    "max-w-full whitespace-nowrap text-content-primary transition-[font-size] duration-300 ease-out text-[clamp(0.875rem,calc(100cqi/var(--chars)),var(--max-size))]",
                    className,
                )}
            >
                {formatted}
            </p>
        </div>
    );
}

export function Balance({ currentMonth, currentYear, visualEffects = true }: BalanceProps) {
    const { data: balance, isLoading, isError, refetch } = useQuery({
        queryKey: transactionRelatedQueryKeys.cashFlowByPeriod(currentMonth, currentYear),
        queryFn: () => StatisticsService.getCashFlow({
            month: currentMonth,
            year: currentYear,
        }),
    });

    if (isError || (balance && !balance.success)) {
        return (
            <section role="alert" className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-brd-default bg-background-surface px-6 py-10 text-center">
                <CircleAlert className="size-8 text-content-danger" />
                <div className="space-y-1">
                    <p className="text-sm font-medium text-content-primary">Não foi possível carregar o saldo</p>
                    <p className="text-sm text-content-muted">Os ganhos e gastos deste período não foram carregados.</p>
                </div>
                <Button type="button" variant="link" size="sm" onClick={() => refetch()}>
                    Tentar novamente
                </Button>
            </section>
        )
    }

    if (isLoading || !balance) {
        return <BalanceSkeleton />
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
                        Total disponível
                    </h2>
                    <FittedCurrency
                        value={balance.cashFlow.balance ?? 0}
                        maxSize="2.25rem"
                        className="text-center font-bold"
                    />

                </div>

                <div className="flex justify-evenly gap-6 items-center z-1">
                    <div className="flex min-w-0 flex-1 flex-col items-center gap-1">
                        <p className="text-sm text-content-muted flex items-center gap-1">
                            <ArrowDownLeft className="size-4 text-content-success" />
                            Ganhos
                        </p>
                        <FittedCurrency
                            value={balance.cashFlow.total_income ?? 0}
                            maxSize="1rem"
                            className="text-center font-medium"
                        />
                    </div>

                    <div className="w-px h-6 bg-background-elevated" />

                    <div className="flex min-w-0 flex-1 flex-col items-center gap-1">
                        <p className="text-sm text-content-muted flex items-center gap-1">
                            <ArrowUpRight className="size-4 text-content-danger" />
                            Gastos
                        </p>
                        <FittedCurrency
                            value={balance.cashFlow.total_expense ?? 0}
                            maxSize="1rem"
                            className="text-center font-medium"
                        />
                    </div>
                </div>
            </section>

            <section className="hidden min-w-0 sm:grid grid-cols-1 gap-4 lg:grid-cols-3">
                <div className="relative z-1 min-w-0 overflow-hidden rounded-xl bg-linear-to-t from-background-surface to-background-elevated p-6">
                    <div className="pointer-events-none absolute -left-8 -top-10 size-24 rounded-full bg-background-accent/60 blur-3xl -z-1" />
                    <div className="pointer-events-none absolute -right-14 top-[18%] size-24 rounded-full bg-background-accent/55 blur-3xl -z-1" />
                    <div className="pointer-events-none absolute left-[38%] -bottom-12 size-20 rounded-full bg-background-accent/40 blur-3xl -z-1" />

                    <div className="relative z-1 flex flex-col gap-2">
                        <h2 className="text-sm font-medium text-content-muted">Saldo</h2>
                        <FittedCurrency
                            value={balance.cashFlow.balance ?? 0}
                            maxSize="2.25rem"
                            className="font-bold"
                        />
                    </div>
                </div>

                <div className="flex min-w-0 flex-col gap-2 rounded-xl border border-brd-default bg-background-surface p-6">
                    <p className="flex items-center gap-1 text-sm text-content-muted">
                        <ArrowDownLeft className="size-4 text-content-success" />
                        Entradas
                    </p>
                    <FittedCurrency
                        value={balance.cashFlow.total_income ?? 0}
                        maxSize="1.5rem"
                        className="font-semibold"
                    />
                </div>

                <div className="flex min-w-0 flex-col gap-2 rounded-xl border border-brd-default bg-background-surface p-6">
                    <p className="flex items-center gap-1 text-sm text-content-muted">
                        <ArrowUpRight className="size-4 text-content-danger" />
                        Saídas
                    </p>
                    <FittedCurrency
                        value={balance.cashFlow.total_expense ?? 0}
                        maxSize="1.5rem"
                        className="font-semibold"
                    />
                </div>
            </section>
        </>
    )
}
