export type TransactionType = "INCOME" | "EXPENSE";

export type TransactionStatus = "PENDING" | "PAID" | "RECEIVED";

export type Transaction = {
    id: number
    amount: number
    category: {
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
    year: number
}

export type GetTransactionsInput = {
    month: number
    year: number
}

export type GetTransactionsOutput = {
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