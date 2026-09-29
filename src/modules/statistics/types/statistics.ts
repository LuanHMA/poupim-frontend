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