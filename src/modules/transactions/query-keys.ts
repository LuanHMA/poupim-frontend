import type { QueryClient } from "@tanstack/react-query";

export const transactionQueryKeys = {
    recentByPeriod: (month: number, year: number) =>
        ["recent-transactions", month, year] as const,
    listByPeriod: (month: number, year: number) =>
        ["transactions", month, year] as const,
}

export const transactionRelatedQueryKeys = {
    cashFlowByPeriod: (month: number, year: number) =>
        ["cash-flow", month, year] as const,
    topCategoriesByPeriod: (month: number, year: number) =>
        ["top-categories", month, year] as const,
    availablePeriods: ["available-periods"] as const,
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
            queryKey: transactionRelatedQueryKeys.cashFlowByPeriod(month, year),
        }),
        queryClient.invalidateQueries({
            queryKey: transactionRelatedQueryKeys.topCategoriesByPeriod(month, year),
        }),
        queryClient.invalidateQueries({
            queryKey: transactionRelatedQueryKeys.availablePeriods,
        }),
    ])
}
