export const statisticsQueryKeys = {
    cashFlowByPeriod: (month: number, year: number) =>
        ["cash-flow", month, year] as const,
    topCategoriesByPeriod: (month: number, year: number) =>
        ["top-categories", month, year] as const,
    availablePeriods: ["available-periods"] as const,
    cashPerDayRest: (month: number, year: number) =>
        ["cash-per-day-rest", month, year] as const,
    monthlyByPeriod: (month: number, year: number) =>
        ["monthly-statistics", month, year] as const,
}
