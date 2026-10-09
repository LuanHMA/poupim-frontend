import { statisticsQueryKeys } from "@/modules/statistics/query-keys";
import { StatisticsService } from "@/modules/statistics/statistics.service";
import type { CashPerDayRestOutput } from "@/modules/statistics/types/statistics";
import { Button, Skeleton } from "@/shared/components/ui";
import { useQuery } from "@tanstack/react-query";
import { CircleAlert } from "lucide-react";


export function RecommendedDailySpendingLimit({ currentMonth, currentYear }: { currentMonth: number, currentYear: number }) {
    const { data, isLoading, isError, refetch } = useQuery<CashPerDayRestOutput>({
        queryKey: statisticsQueryKeys.cashPerDayRest(currentMonth, currentYear),
        queryFn: () => StatisticsService.getCashPerDayRest({
            month: currentMonth,
            year: currentYear,
        }),
    });

    if (isLoading) {
        return (
            <section className="flex flex-col items-start gap-6 rounded-xl bg-background-surface p-4" role="status" aria-live="polite">
                <span className="sr-only">Carregando limite diário</span>
                <div className="space-y-2">
                    <h2 className="text-lg font-semibold text-content-primary">Quanto recomendados gastar por dia</h2>
                    <p className="text-sm text-content-muted">Baseando-se no saldo disponível</p>
                </div>
                <Skeleton className="h-8 w-36" />
            </section>
        )
    }

    if (isError || (data && !data.success)) {
        return (
            <section role="alert" className="flex flex-col items-start gap-4 rounded-xl bg-background-surface p-4">
                <div className="space-y-1">
                    <h2 className="text-lg font-semibold text-content-primary">Quanto recomendados gastar por dia</h2>
                    <p className="text-sm text-content-muted">Baseando-se no saldo disponível</p>
                </div>
                <div className="flex w-full flex-col items-start gap-3">
                    <div className="flex items-start gap-3">
                        <CircleAlert className="mt-0.5 size-5 shrink-0 text-content-danger" />
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-content-primary">Não foi possível carregar o limite diário</p>
                            <p className="text-sm text-content-muted">O valor recomendado para este período não foi carregado.</p>
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
        <section className="flex flex-col items-start gap-6 rounded-xl bg-background-surface p-4">
            <div className="space-y-1">
                <h2 className="text-lg font-semibold text-content-primary">Quanto recomendados gastar por dia</h2>
                <p className="text-sm text-content-muted">Baseando-se no saldo disponível</p>
            </div>
            <p className="text-3xl font-bold text-content-primary flex items-end gap-1">
                <span className="text-xl text-content-accent">R$</span>
                {data?.cashPerDay ?? 0}
            </p>
        </section>
    )
}