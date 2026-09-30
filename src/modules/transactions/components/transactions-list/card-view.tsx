import { CategoryIcon } from "@/modules/categories/components/category-icon"
import { transactionStatusStyles } from "@/modules/transactions/utils/custom-styles"
import { Badge } from "@/shared/components/ui"
import { formatations } from "@/shared/utils/formatations"
import { Clock } from "lucide-react"
import { useState } from "react"
import type { Transaction } from "../../types/transactions"
import { toDateInputValue } from "../../utils/transaction-date"
import { TransactionDetailsDrawer } from "../transaction-details-drawer"

interface TransactionsCardsViewProps {
    transactions: Transaction[]
}

function groupByDay(transactions: Transaction[]) {
    const transactionsByDay = new Map<string, Transaction[]>()

    for (const transaction of transactions) {
        const day = toDateInputValue(transaction.transaction_date)
        const items = transactionsByDay.get(day)

        if (items) {
            items.push(transaction)
            continue
        }

        transactionsByDay.set(day, [transaction])
    }

    for (const items of transactionsByDay.values()) {
        items.sort((a, b) => b.transaction_date.localeCompare(a.transaction_date))
    }

    return Array.from(transactionsByDay.entries()).sort(([a], [b]) => b.localeCompare(a))
}

export function TransactionsCardsView({ transactions }: TransactionsCardsViewProps) {
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
    const transactionsByDay = groupByDay(transactions)

    return (
        <div>
            {selectedTransaction && (
                <TransactionDetailsDrawer
                    transaction={selectedTransaction}
                    onClose={() => setSelectedTransaction(null)}
                />
            )}

            {transactionsByDay.map(([day, transactionsOfDay]) => (
                <div key={day} className="space-y-5 pb-6">
                    <h3 className="text-sm text-content-muted font-medium">{formatations.dayMonth(day)}</h3>
                    <div className="flex flex-col gap-4">
                        {transactionsOfDay.map((transaction) => (
                            <button
                                key={transaction.id}
                                type="button"
                                className="w-full text-left cursor-pointer bg-background-surface hover:bg-background-elevated transition-colors duration-300 rounded-2xl p-4"
                                aria-label="Abrir detalhes da transação"
                                onClick={() => setSelectedTransaction(transaction)}
                            >
                                <div className="flex items-center gap-4 justify-between w-full last:border-none last:pb-0 border-b border-brd-subtle pb-4 group">
                                    <div className="flex items-center gap-4">
                                        <span className="flex items-center justify-center size-10 rounded-md
                                        d bg-background-elevated">
                                            <CategoryIcon category={transaction.category} className="size-5" />
                                        </span>
                                        <div className="flex flex-col items-start gap-1">
                                            <p className="text-sm font-medium text-content-primary">{transaction.description}</p>
                                            <div className="flex items-center gap-2">
                                                <Badge
                                                    variant="outline"
                                                    className="text-xs text-content-muted"
                                                    leftIcon={<Clock className="size-4" />}
                                                >
                                                    {formatations.time(transaction.transaction_date)}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end gap-1">
                                        <p className={`text-sm font-medium tracking-wide ${transaction.type === "INCOME" && transaction.status !== "PENDING" ? "text-content-success" : transaction.type === "EXPENSE" && transaction.status !== "PENDING" ? "text-content-danger" : "text-content-primary"}`}>
                                            {transaction.type === "INCOME" && transaction.status !== "PENDING" ? "+" : transaction.type === "EXPENSE" && transaction.status !== "PENDING" ? "-" : ""}
                                            {formatations.currency(transaction.amount)}
                                        </p>
                                        <p className="text-xs text-content-muted">{transactionStatusStyles[transaction.status].label}</p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}