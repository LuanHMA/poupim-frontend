export type CashFlow = {
    total_income: number
    total_expense: number
    balance: number
    month: number
    year: number
}

export type CashFlowInput = {
    month?: number
    year?: number
}

export type CashFlowOutput = {
    message: string
    cashFlow: CashFlow
    success: boolean
}

export type AvaiblePeriods = {
    month: number
    year: number
}

export type AvaiblePeriodsOutput = {
    message: string
    periods: AvaiblePeriods[]
    success: boolean
}


export type CashPerDayRestInput = {
    month?: number
    year?: number
}

export type CashPerDayRestOutput = {
    message: string
    cashPerDay: number
    success: boolean
}

export type MonthTotals = {
    total_income: number
    total_expense: number
    balance: number
}

export type MonthSnapshot = MonthTotals & {
    month: number
    year: number
}

export type MonthlyStatistics = {
    in_progress: boolean
    has_transactions: boolean
    versus_previous: {
        current: MonthSnapshot
        previous: MonthSnapshot
        difference: MonthTotals
    }
    same_day: {
        day: number
        current_expense: number
        previous_expense: number
        difference: number
    } | null
    top_categories: {
        category: string
        total_amount: number
        previous_amount: number
        difference: number
    }[]
    income_used_percentage: {
        current: number | null
        previous: number | null
    }
    last_three_months: (MonthSnapshot & { in_progress: boolean })[]
    verdict: {
        state: "tranquilo" | "apertado" | "no_vermelho"
        balance: number
        income_used_percentage: number | null
    } | null
}

export type MonthlyStatisticsInput = {
    month?: number
    year?: number
}

export type MonthlyStatisticsOutput = {
    message: string
    monthly: MonthlyStatistics
    success: boolean
}