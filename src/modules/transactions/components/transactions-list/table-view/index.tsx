import type { Transaction } from "../../../types/transactions"

interface TransactionsTableViewProps {
    transactions: Transaction[]
}

export function TransactionsTableView({ transactions }: TransactionsTableViewProps) {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Descrição</th>
                        <th>Categoria</th>
                        <th>Valor</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    )
}