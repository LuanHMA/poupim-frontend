import { useIsMobile } from "@/shared/hooks/use-is-mobile"
import { useQuery } from "@tanstack/react-query"
import { transactionQueryKeys } from "../../query-keys"
import { TransactionsService } from "../../transactions.service"
import type { GetTransactionsOutput } from "../../types/transactions"
import { TransactionsFilters } from "../transactions-filters"
import { TransactionsCardsView } from "./card-view"
import { TransactionsTableView } from "./table-view"

interface TransactionsListProps {
    month: number
    year: number
}


export function TransactionsList({ month, year }: TransactionsListProps) {
    const { isMobile } = useIsMobile({ limitScreenWidth: 768 })

    const { data, isLoading, isError } = useQuery<GetTransactionsOutput>({
        queryKey: transactionQueryKeys.listByPeriod(month, year),
        queryFn: () => TransactionsService.getTransactions({ month, year }),
    })

    if (isLoading) return <div>Carregando...</div>;
    if (isError || !data?.transactions) return <div>Erro ao carregar transações</div>;


    return (
        <div className="space-y-6">
            <TransactionsFilters />

            {isMobile ? (
                <TransactionsCardsView transactions={data?.transactions} />
            ) : (
                <TransactionsTableView transactions={data?.transactions} />
            )}
        </div>
    )
}