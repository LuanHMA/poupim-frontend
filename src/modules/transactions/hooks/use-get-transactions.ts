import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useCallback, useState } from "react"
import { transactionQueryKeys } from "../query-keys"
import { TransactionsService } from "../transactions.service"
import type { GetTransactionsOutput } from "../types/transactions"
import { useTransactionFilters } from "./use-transaction-filters"

interface UseTransactionsPaginationParams {
    month: number
    year: number
}

export function useGetTransactions({ month, year }: UseTransactionsPaginationParams) {
    const { filters } = useTransactionFilters()

    const resetKey = JSON.stringify([month, year, filters])
    const [pageState, setPageState] = useState({ resetKey, page: 1 })
    const page = pageState.resetKey === resetKey ? pageState.page : 1

    const query = useQuery<GetTransactionsOutput>({
        queryKey: [...transactionQueryKeys.listByPeriod(month, year, filters), page],
        queryFn: () => TransactionsService.getTransactions({ month, year, page, ...filters }),
        placeholderData: keepPreviousData,
    })

    const totalPages = query.data?.pagination.total_pages ?? 0

    if (!query.isPlaceholderData && totalPages > 0 && page > totalPages) {
        setPageState({ resetKey, page: totalPages })
    }

    const goToPage = useCallback((nextPage: number) => {
        setPageState({ resetKey, page: nextPage })
    }, [resetKey])

    return {
        ...query,
        pagination: {
            page,
            totalPages,
            totalItems: query.data?.pagination.total ?? 0,
            pageSize: query.data?.pagination.limit ?? 0,
            goToPage,
        },
    }
}
