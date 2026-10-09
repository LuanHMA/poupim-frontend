import { statisticsQueryKeys } from "@/modules/statistics/query-keys";
import { StatisticsService } from "@/modules/statistics/statistics.service";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

export function useTopCategories(currentMonth: number, currentYear: number) {
    const chartRef = useRef<HTMLDivElement>(null)
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: statisticsQueryKeys.topCategoriesByPeriod(currentMonth, currentYear),
        queryFn: () => StatisticsService.getTopExpenseCategories({
            month: currentMonth,
            year: currentYear,
        }),
    })

    useEffect(() => {
        setSelectedIndex(null)
    }, [currentMonth, currentYear])

    useEffect(() => {
        function handlePointerDown(event: PointerEvent) {
            if (!(event.target instanceof Node)) return
            if (chartRef.current?.contains(event.target)) return
            setSelectedIndex(null)
        }

        document.addEventListener("pointerdown", handlePointerDown)
        return () => document.removeEventListener("pointerdown", handlePointerDown)
    }, [])

    const categories = (data?.topExpenseCategories ?? []).filter((category) => category.total_amount > 0)
    const selected = selectedIndex != null ? categories[selectedIndex] : undefined
    const total = categories.reduce((sum, category) => sum + category.total_amount, 0)

    return {
        chartRef,
        categories,
        selected,
        selectedIndex: selected ? selectedIndex : null,
        displayedAmount: selected ? selected.total_amount : total,
        isLoading,
        hasError: isError || Boolean(data && !data.success),
        refetch,
        selectCategory: setSelectedIndex,
    }
}
