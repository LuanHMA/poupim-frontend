import { CategoryIcon } from "@/modules/categories/components/category-icon"
import { transactionStatusStyles } from "@/modules/transactions/utils/custom-styles"
import { Badge } from "@/shared/components/ui"
import { formatations } from "@/shared/utils/formatations"
import { Clock } from "lucide-react"
import { useState } from "react"
import type { Transaction } from "../../types/transactions"
import { TransactionDetailsDrawer } from "../transaction-details-drawer"

interface TransactionsCardsViewProps {
    transactions: Transaction[]
}


export function TransactionsCardsView({ transactions }: TransactionsCardsViewProps) {
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
    const transactionsByDay = new Map<string, Transaction[]>();

    transactions.forEach(transaction => {
        const day = new Date(transaction.created_at).toLocaleDateString("en-CA", {
            timeZone: "America/Sao_Paulo",
        })

        const items = transactionsByDay.get(day) || [];
        items.push(transaction);
        transactionsByDay.set(day, items);
    });

    return (
        <div>
            {selectedTransaction && (
                <TransactionDetailsDrawer
                    transaction={selectedTransaction}
                    onClose={() => setSelectedTransaction(null)}
                />
            )}

            {Array.from(transactionsByDay.entries()).map(([day, transactions]) => (
                <div key={day} className="space-y-6 pb-6">
                    <h3 className="text-sm text-content-muted font-medium">{formatations.dayMonth(day)}</h3>
                    <div className="flex flex-col gap-6">
                        {transactions.map((transaction) => (
                            <button
                                key={transaction.id}
                                type="button"
                                className="w-full text-left"
                                aria-label="Abrir detalhes da transação"
                                onClick={() => setSelectedTransaction(transaction)}
                            >
                                <div className="flex items-center gap-4 justify-between w-full last:border-none last:pb-0 border-b border-brd-subtle pb-4">
                                    <div className="flex items-center gap-4">
                                        <span className="flex items-center justify-center size-10 rounded-md bg-background-elevated">
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
                                                    {formatations.time(transaction.created_at)}
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