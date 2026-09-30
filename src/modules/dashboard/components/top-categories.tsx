import { useTopCategories } from "@/modules/dashboard/hooks/use-top-categories";
import { cn } from "@/shared/utils/cn";
import { formatations } from "@/shared/utils/formatations";
import { PieChart } from "react-minimal-pie-chart";
import { Link } from "react-router-dom";
import { segmentPaddingPieChart } from "../utils/charts";

const chartRadius = 40
const chartLineWidth = 26

const categoryColors = [
    { stroke: "var(--color-background-accent)", swatch: "bg-background-accent" },
    { stroke: "var(--color-background-success)", swatch: "bg-background-success" },
    { stroke: "var(--color-content-info)", swatch: "bg-content-info" },
    { stroke: "var(--color-content-accent-light)", swatch: "bg-content-accent-light" },
    { stroke: "var(--color-content-warning)", swatch: "bg-content-warning" },
    { stroke: "var(--color-background-danger)", swatch: "bg-background-danger" },
] as const

export function TopCategories({ currentMonth, currentYear }: { currentMonth: number, currentYear: number }) {
    const {
        chartRef,
        categories,
        selected,
        selectedIndex,
        displayedAmount,
        isLoading,
        hasError,
        selectCategory,
    } = useTopCategories(currentMonth, currentYear)

    if (isLoading) {
        return (
            <section className="flex flex-col items-start gap-6">
                <h2 className="text-content-primary font-semibold text-lg">Gastos por categoria</h2>
                <div className="mx-auto size-52 animate-pulse rounded-full bg-background-elevated" />
            </section>
        )
    }

    if (hasError) {
        return (
            <section className="flex flex-col items-start gap-6">
                <h2 className="text-content-primary font-semibold text-lg">Gastos por categoria</h2>
                <p className="text-sm text-content-danger">Erro ao carregar as categorias</p>
            </section>
        )
    }

    const chartData = categories.map((category, index) => ({
        title: category.category,
        value: category.total_amount,
        color: categoryColors[index % categoryColors.length].stroke,
        key: `${category.category}-${index}`,
    }))

    return (
        <section className="flex flex-col items-start gap-6 bg-background-surface p-4 rounded-xl">
            <div className="flex items-center justify-between w-full">
                <h2 className="text-content-primary font-semibold text-lg">Onde você mais gastou</h2>
                <Link to="/statistics" className="text-sm text-content-accent hover:text-content-accent-light transition-all duration-300">
                    Mais detalhes
                </Link>
            </div>

            {categories.length === 0 ? (
                <p className="text-sm text-content-muted">Nenhum gasto neste período.</p>
            ) : (
                <div className="flex w-full flex-col items-center gap-5">
                    <div ref={chartRef} className="relative mx-auto aspect-square w-full max-w-52 md:max-w-64">
                        <PieChart
                            className="size-full overflow-visible"
                            data={chartData}
                            startAngle={-90}
                            radius={chartRadius}
                            lineWidth={chartLineWidth}
                            paddingAngle={segmentPaddingPieChart(categories.length, chartRadius, chartLineWidth)}
                            rounded
                            animate
                            animationDuration={500}
                            segmentsStyle={(index) => {
                                const isDimmed = selectedIndex != null && index !== selectedIndex

                                return {
                                    cursor: "pointer",
                                    opacity: isDimmed ? 0.28 : 1,
                                    transition: "opacity 200ms ease",
                                }
                            }}
                            onClick={(event, index) => {
                                event.stopPropagation()
                                selectCategory(index)
                            }}
                        />

                        <button
                            type="button"
                            aria-label="Mostrar total das categorias"
                            onClick={() => selectCategory(null)}
                            className="absolute inset-[30%] flex flex-col items-center justify-center gap-1 text-center"
                        >
                            <span className="line-clamp-2 text-xs font-medium text-content-muted">
                                {selected ? selected.category : "Total"}
                            </span>
                            <span className="text-base leading-tight font-semibold text-content-primary sm:text-lg">
                                {formatations.currency(displayedAmount)}
                            </span>
                        </button>
                    </div>

                    <ul className="flex w-full flex-wrap items-center justify-center gap-x-4 gap-y-2">
                        {categories.map((category, index) => {
                            const color = categoryColors[index % categoryColors.length]
                            const isActive = index === selectedIndex
                            const isDimmed = selectedIndex != null && !isActive

                            return (
                                <li key={`${category.category}-${index}`} className={cn(
                                    "flex max-w-full items-center gap-1.5 transition-opacity duration-200",
                                    isDimmed && "opacity-35",
                                )}>
                                    <span className={cn("size-2 shrink-0 rounded-full", color.swatch)} />
                                    <span className={cn(
                                        "truncate text-sm",
                                        isActive || selectedIndex == null ? "font-medium text-content-primary" : "text-content-muted",
                                    )}>
                                        {category.category}
                                    </span>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )}
        </section>
    )
}
