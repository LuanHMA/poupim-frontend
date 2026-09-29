export type Transaction = {
    id: number
    amount: number
    category_name: string | null
    created_at: string
    description: string
    ignore: boolean
    month: number
    observation: string | null
    status: "PENDING" | "PAID" | "RECEIVED"
    type: "INCOME" | "EXPENSE"
    year: number
}

export type GetRecentTransactionsInput = {
    month: number
    year: number
}

export type GetRecentTransactionsOutput = {
    transactions: Transaction[];
    message: string
    success: boolean
}

export type TopExpenseCategory = {
    category: string
    total_amount: number
    percentage: number
}

export type GetTopExpenseCategoriesInput = {
    month: number
    year: number
}

export type GetTopExpenseCategoriesOutput = {
    topExpenseCategories: TopExpenseCategory[]
    message: string
    success: boolean
}