import { Button } from "@/shared/components/ui"
import { useIsMobile } from "@/shared/hooks/use-is-mobile"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { SearchX } from "lucide-react"
import { useTransactionFilters } from "../../hooks/use-transaction-filters"
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
    const { filters, clearFilters, hasFilters } = useTransactionFilters()

    const { data, isLoading, isError } = useQuery<GetTransactionsOutput>({
        queryKey: transactionQueryKeys.listByPeriod(month, year, filters),
        queryFn: () => TransactionsService.getTransactions({ month, year, ...filters }),
        placeholderData: keepPreviousData,
    })

    return (
        <div className="space-y-6">
            <TransactionsFilters />

            {isLoading ? (
                <div>Carregando...</div>
            ) : isError || !data?.transactions ? (
                <div>Erro ao carregar transações</div>
            ) : data.transactions.length === 0 && hasFilters ? (
                <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-brd-default bg-background-surface px-6 py-12 text-center">
                    <SearchX className="size-8 text-content-muted" />
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-content-primary">Nenhuma transação encontrada</p>
                        <p className="text-sm text-content-muted">
                            Nada corresponde a esses filtros. Tente outro termo, categoria, status ou tipo.
                        </p>
                    </div>
                    <Button type="button" variant="link" size="sm" onClick={clearFilters}>
                        Limpar filtros
                    </Button>
                </div>
            ) : isMobile ? (
                <TransactionsCardsView transactions={data.transactions} />
            ) : (
                <TransactionsTableView transactions={data.transactions} />
            )}
        </div>
    )
}