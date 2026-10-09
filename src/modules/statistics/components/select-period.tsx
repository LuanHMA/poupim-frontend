import { StatisticsService } from "@/modules/statistics/statistics.service";
import type { AvaiblePeriodsOutput } from "@/modules/statistics/types/statistics";
import { statisticsQueryKeys } from "@/modules/statistics/query-keys";
import { Button, Select, Skeleton } from "@/shared/components/ui";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";

interface SelectPeriodProps {
    currentMonth: number
    currentYear: number
    navigateTo: string
}

export function SelectPeriod({ currentMonth, currentYear, navigateTo }: SelectPeriodProps) {
    const { data, isLoading, isError, refetch } = useQuery<AvaiblePeriodsOutput>({
        queryKey: statisticsQueryKeys.availablePeriods,
        queryFn: StatisticsService.getAvailablePeriods,
    });

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    if (isLoading) {
        return (
            <div className="w-36" role="status" aria-live="polite">
                <span className="sr-only">Carregando período</span>
                <Skeleton className="h-11 w-full rounded-xl sm:h-10" />
            </div>
        );
    }
    if (isError) {
        return (
            <div role="alert" className="flex flex-col items-end gap-1 text-right">
                <p className="text-xs text-content-danger">Não foi possível carregar os períodos.</p>
                <Button type="button" variant="link" size="sm" onClick={() => refetch()}>
                    Tentar novamente
                </Button>
            </div>
        );
    }

    const getInitialPeriod = () => {
        const monthName = new Date(currentYear, currentMonth - 1).toLocaleString("pt-BR", { month: "long" });

        return {
            label: `${monthName}/${currentYear}`,
            value: `${currentMonth}/${currentYear}`,
        }
    }

    const periods = data?.periods.length === 0 ? [getInitialPeriod()] : data?.periods.map(({ month, year }) => {
        const monthName = new Date(year, month - 1).toLocaleString("pt-BR", { month: "long" });
        return {
            label: `${monthName}/${year}`,
            value: `${month}/${year}`,
        }
    })

    const currentPeriod = `${currentMonth}/${currentYear}`;

    const onChangePeriod = (value: string) => {
        const [month, year] = value.split("/").map(Number);
        const nextParams = new URLSearchParams(searchParams);
        nextParams.set("month", String(month));
        nextParams.set("year", String(year));
        navigate(`/${navigateTo}?${nextParams.toString()}`);
    }

    return (
        <div className="w-36">
            <Select
                name="period"
                defaultValue={currentPeriod}
                options={periods ?? []}
                placeholder="Período"
                className="border-none text-sm"
                onValueChange={onChangePeriod}
            />
        </div>
    )
}
