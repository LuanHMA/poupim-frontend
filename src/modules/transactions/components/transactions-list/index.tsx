import { Button, Pagination } from "@/shared/components/ui"
import { useIsMobile } from "@/shared/hooks/use-is-mobile"
import { CircleAlert, SearchX } from "lucide-react"
import { useRef } from "react"
import { useGetTransactions } from "../../hooks/use-get-transactions"
import { useTransactionFilters } from "../../hooks/use-transaction-filters"
import { TransactionsFilters } from "../transactions-filters"
import { TransactionsCardsView } from "./card-view"
import { TransactionsTableView } from "./table-view"
import { TransactionsListSkeleton } from "./transactions-list-skeleton"

interface TransactionsListProps {
    month: number
    year: number
}

export function TransactionsList({ month, year }: TransactionsListProps) {
    const { isMobile } = useIsMobile({ limitScreenWidth: 768 })
    const { clearFilters, hasFilters } = useTransactionFilters()
    const listRef = useRef<HTMLDivElement>(null)

    const {
        data,
        isLoading,
        isError,
        isPlaceholderData,
        refetch,
        pagination,
    } = useGetTransactions({ month, year })

    const handlePageChange = (nextPage: number) => {
        pagination.goToPage(nextPage)
        listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }

    return (
        <div ref={listRef} className="scroll-mt-6 space-y-6">
            <TransactionsFilters />

            {isLoading ? (
                <TransactionsListSkeleton />
            ) : isError || !data?.transactions ? (
                <div role="alert" className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-brd-default bg-background-surface px-6 py-12 text-center">
                    <CircleAlert className="size-8 text-content-danger" />
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-content-primary">Não foi possível carregar as transações</p>
                        <p className="text-sm text-content-muted">
                            A lista deste período não foi carregada.
                        </p>
                    </div>
                    <Button type="button" variant="link" size="sm" onClick={() => refetch()}>
                        Tentar novamente
                    </Button>
                </div>
            ) : data.transactions.length === 0 ? (
                <>
                    {hasFilters ? (
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
                    ) : (
                        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-brd-default bg-background-surface py-8 px-6 text-center">
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-content-primary">Nenhuma transação encontrada</p>
                                <p className="text-sm text-content-muted">
                                    Adicione uma nova transação para começar a organizar suas finanças.
                                </p>
                            </div>
                        </div>
                    )}

                </>
            ) : (
                <>
                    {isMobile ? (
                        <TransactionsCardsView transactions={data.transactions} />
                    ) : (
                        <TransactionsTableView transactions={data.transactions} />
                    )}

                    <Pagination
                        page={pagination.page}
                        totalPages={pagination.totalPages}
                        totalItems={pagination.totalItems}
                        pageSize={pagination.pageSize}
                        disabled={isPlaceholderData}
                        onPageChange={handlePageChange}
                    />
                </>
            )}
        </div>
    )
}
