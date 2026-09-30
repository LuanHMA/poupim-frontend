export type TransactionType = "INCOME" | "EXPENSE";

export type TransactionStatus = "PENDING" | "PAID" | "RECEIVED";

export type Transaction = {
    id: number
    amount: number
    category: {
        id: number
        name: string
        color: string
        icon: string
    }
    created_at: string
    description: string
    ignore: boolean
    month: number
    observation: string | null
    status: TransactionStatus
    type: TransactionType
    fixed: boolean
    year: number
}

export type TransactionFilters = {
    category_id?: number
    status?: TransactionStatus
    type?: TransactionType
    search?: string
}

export type GetTransactionsInput = {
    month: number
    year: number
    page?: number
    limit?: number
} & TransactionFilters

export type GetTransactionsOutput = {
    transactions: Transaction[];
    pagination: {
        page: number
        limit: number
        total: number
        total_pages: number
    }
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

export type CreateTransactionInput = {
    description: string
    observation?: string
    category_id: number
    amount: number
    type: TransactionType
    status: TransactionStatus
    ignore: boolean
    fixed: boolean
    date: string
}

export type CreateTransactionOutput = {
    transaction: Transaction
}

export type UpdateTransactionInput = CreateTransactionInput

export type UpdateTransactionOutput = {
    message: string
    success: boolean
}
