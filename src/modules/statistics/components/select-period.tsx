import { StatisticsService } from "@/modules/statistics/statistics.service";
import type { AvaiblePeriodsOutput } from "@/modules/statistics/types/statistics";
import { transactionRelatedQueryKeys } from "@/modules/transactions/query-keys";
import { Select } from "@/shared/components/ui";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface SelectPeriodProps {
    currentMonth: number
    currentYear: number
    navigateTo: string
}

export function SelectPeriod({ currentMonth, currentYear, navigateTo }: SelectPeriodProps) {
    const { data, isLoading, isError } = useQuery<AvaiblePeriodsOutput>({
        queryKey: transactionRelatedQueryKeys.availablePeriods,
        queryFn: StatisticsService.getAvailablePeriods,
    });

    const navigate = useNavigate();

    if (isLoading) return <div>Carregando...</div>;
    if (isError) return <div>Erro ao carregar períodos</div>;

    const periods = data?.periods.map(({ month, year }) => {
        const monthName = new Date(year, month - 1).toLocaleString("pt-BR", { month: "long" });

        return {
            label: `${monthName}/${year}`,
            value: `${month}/${year}`,
        }
    })

    const currentPeriod = `${currentMonth}/${currentYear}`;

    const onChangePeriod = (value: string) => {
        const [month, year] = value.split("/").map(Number);
        navigate(`/${navigateTo}?month=${month}&year=${year}`);
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
