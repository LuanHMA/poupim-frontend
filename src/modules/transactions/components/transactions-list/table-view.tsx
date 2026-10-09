import { transactionStatusStyles } from "@/modules/transactions/utils/custom-styles"
import { Button } from "@/shared/components/ui"
import { formatations } from "@/shared/utils/formatations"
import { Pencil, Trash } from "lucide-react"
import { useState } from "react"
import type { Transaction } from "../../types/transactions"
import { DeleteTransactionDialog } from "../delete-transaction-dialog"
import { EditTransactionDrawer } from "../edit-transaction/edit-transaction-drawer"
import { TransactionDetailsDrawer } from "../transaction-details-drawer"

interface TransactionsTableViewProps {
    transactions: Transaction[]
}

export function TransactionsTableView({ transactions }: TransactionsTableViewProps) {
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
    const [transactionToEdit, setTransactionToEdit] = useState<Transaction | null>(null)
    const [transactionToDelete, setTransactionToDelete] = useState<Transaction | null>(null)

    return (
        <>
            {selectedTransaction && (
                <TransactionDetailsDrawer
                    transaction={selectedTransaction}
                    onClose={() => setSelectedTransaction(null)}
                />
            )}

            {transactionToEdit && (
                <EditTransactionDrawer
                    transaction={transactionToEdit}
                    onClose={() => setTransactionToEdit(null)}
                />
            )}

            {transactionToDelete && (
                <DeleteTransactionDialog
                    transaction={transactionToDelete}
                    onClose={() => setTransactionToDelete(null)}
                />
            )}

            <div className="overflow-hidden rounded-xl border border-brd-default bg-background-surface">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="border-b border-brd-subtle text-content-muted">
                            <th className="px-4 py-3 font-medium">Data</th>
                            <th className="px-4 py-3 font-medium">Descrição</th>
                            <th className="px-4 py-3 font-medium">Categoria</th>
                            <th className="px-4 py-3 font-medium">Valor</th>
                            <th className="px-4 py-3 font-medium">Status</th>
                            <th className="px-4 py-3 text-right font-medium">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr
                                key={transaction.id}
                                role="button"
                                tabIndex={0}
                                aria-label={`Abrir detalhes de ${transaction.description}`}
                                className="cursor-pointer border-b border-brd-subtle transition-colors hover:bg-background-elevated focus-visible:bg-background-elevated focus-visible:outline-none last:border-b-0"
                                onClick={() => setSelectedTransaction(transaction)}
                                onKeyDown={(event) => {
                                    if (event.target !== event.currentTarget) return
                                    if (event.key !== "Enter" && event.key !== " ") return

                                    event.preventDefault()
                                    setSelectedTransaction(transaction)
                                }}
                            >
                                <td className="px-4 py-3 text-content-muted">{formatations.dateTime(transaction.transaction_date)}</td>
                                <td className="px-4 py-3 font-medium text-content-primary">{transaction.description}</td>
                                <td className="px-4 py-3 text-content-primary">{transaction.category.name}</td>
                                <td className={`px-4 py-3 font-medium ${transaction.type === "INCOME" ? "text-content-success" : "text-content-danger"}`}>
                                    {formatations.currency(transaction.amount)}
                                </td>
                                <td className="px-4 py-3 text-content-muted">{transactionStatusStyles[transaction.status].label}</td>
                                <td className="px-4 py-3">
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            className="size-8"
                                            aria-label={`Editar ${transaction.description}`}
                                            onClick={(event) => {
                                                event.stopPropagation()
                                                setTransactionToEdit(transaction)
                                            }}
                                        >
                                            <Pencil className="size-3.5" />
                                        </Button>
                                        <Button
                                            size="icon"
                                            variant="danger"
                                            className="size-8"
                                            aria-label={`Deletar ${transaction.description}`}
                                            onClick={(event) => {
                                                event.stopPropagation()
                                                setTransactionToDelete(transaction)
                                            }}
                                        >
                                            <Trash className="size-3.5" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
