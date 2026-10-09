import { statisticsQueryKeys } from "@/modules/statistics/query-keys";
import { StatisticsService } from "@/modules/statistics/statistics.service";
import { useQuery } from "@tanstack/react-query";

export function useMonthlyStatistics(month: number, year: number) {
    return useQuery({
        queryKey: statisticsQueryKeys.monthlyByPeriod(month, year),
        queryFn: () => StatisticsService.getMonthly({ month, year }),
    });
}
