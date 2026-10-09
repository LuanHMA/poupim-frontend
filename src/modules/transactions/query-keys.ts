import { statisticsQueryKeys } from "@/modules/statistics/query-keys";
import type { QueryClient } from "@tanstack/react-query";
import type { TransactionFilters } from "./types/transactions";

export const transactionQueryKeys = {
    recentByPeriod: (month: number, year: number) =>
        ["recent-transactions", month, year] as const,
    listByPeriod: (month: number, year: number, filters: TransactionFilters = {}) =>
        ["transactions", month, year, filters] as const,
}

export function invalidateCreatedTransactionQueries(
    queryClient: QueryClient,
    period: { month: number; year: number },
) {
    const { month, year } = period

    return Promise.all([
        queryClient.invalidateQueries({
            queryKey: transactionQueryKeys.recentByPeriod(month, year),
        }),
        queryClient.invalidateQueries({
            queryKey: transactionQueryKeys.listByPeriod(month, year),
        }),
        queryClient.invalidateQueries({
            queryKey: statisticsQueryKeys.cashFlowByPeriod(month, year),
        }),
        queryClient.invalidateQueries({
            queryKey: statisticsQueryKeys.topCategoriesByPeriod(month, year),
        }),
        queryClient.invalidateQueries({
            queryKey: statisticsQueryKeys.availablePeriods,
        }),
        queryClient.invalidateQueries({
            queryKey: statisticsQueryKeys.cashPerDayRest(month, year),
        }),
    ])
}
