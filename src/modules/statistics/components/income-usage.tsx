import { segmentPaddingPieChart } from "@/modules/dashboard/utils/charts";
import type { MonthlyStatistics } from "@/modules/statistics/types/statistics";
import { statisticsChartColors } from "@/modules/statistics/utils/chart-styles";
import { PieChart } from "react-minimal-pie-chart";

type IncomeUsageStatistics = MonthlyStatistics["income_used_percentage"];

const chartRadius = 40;
const chartLineWidth = 26;

function formatPercentage(percentage: number) {
    return percentage.toLocaleString("pt-BR", { maximumFractionDigits: 2 });
}

export function IncomeUsage({
    incomeUsageStatistics,
}: {
    incomeUsageStatistics: IncomeUsageStatistics;
}) {
    const currentIncomeUsedPercentage = incomeUsageStatistics.current;
    const chartPercentage = Math.min(Math.max(currentIncomeUsedPercentage ?? 0, 0), 100);
    const exceededIncome = currentIncomeUsedPercentage != null && currentIncomeUsedPercentage > 100;
    const chartData = [
        {
            title: "Renda utilizada",
            value: chartPercentage,
            color: exceededIncome
                ? "var(--color-background-danger)"
                : statisticsChartColors.primary,
        },
        {
            title: "Renda disponível",
            value: 100 - chartPercentage,
            color: statisticsChartColors.secondaryBackground,
        },
    ];
    const visibleSegmentCount = chartData.filter(({ value }) => value > 0).length;

    return (
        <section className="rounded-xl bg-background-surface p-4 sm:p-5">
            <h2 className="text-lg font-semibold text-content-primary">Quanto da renda você já gastou?</h2>
            <p className="mb-5 text-sm text-content-muted">Veja quanto do dinheiro que entrou já foi usado.</p>

            {currentIncomeUsedPercentage == null ? (
                <p className="rounded-lg bg-background-base/30 p-4 text-sm text-content-muted">
                    Ainda não houve entrada de dinheiro neste mês.
                </p>
            ) : (
                <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center">
                    <div
                        role="img"
                        aria-label={`${formatPercentage(currentIncomeUsedPercentage)}% da renda foi gasta`}
                        className="relative size-44 shrink-0 sm:size-48 [&_*:focus]:outline-none"
                    >
                        <PieChart
                            className="size-full overflow-visible outline-none focus:outline-none"
                            data={chartData}
                            startAngle={-90}
                            radius={chartRadius}
                            lineWidth={chartLineWidth}
                            paddingAngle={segmentPaddingPieChart(
                                visibleSegmentCount,
                                chartRadius,
                                chartLineWidth,
                            )}
                            rounded
                            animate
                            animationDuration={500}
                        />
                        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                            <strong className={exceededIncome
                                ? "text-2xl font-semibold tabular-nums text-content-danger"
                                : "text-2xl font-semibold tabular-nums text-content-primary"
                            }>
                                {formatPercentage(currentIncomeUsedPercentage)}%
                            </strong>
                            <span className="text-xs text-content-muted">da renda</span>
                        </div>
                    </div>

                    <div className="w-full space-y-3 text-center sm:text-left">
                        <p className="text-sm leading-6 text-content-primary">
                            De cada <strong>R$ 100</strong> que entrou, você gastou aproximadamente{" "}
                            <strong className={exceededIncome ? "text-content-danger" : "text-content-accent"}>
                                R$ {Math.round(currentIncomeUsedPercentage)}
                            </strong>
                            .
                        </p>
                        {exceededIncome ? (
                            <p className="rounded-lg bg-background-danger/10 px-3 py-2 text-sm text-content-danger">
                                Seus gastos ultrapassaram a renda em{" "}
                                <strong>{formatPercentage(currentIncomeUsedPercentage - 100)}%</strong>.
                            </p>
                        ) : (
                            <p className="text-sm text-content-muted">
                                Ainda restam{" "}
                                <strong className="text-content-primary">
                                    {formatPercentage(100 - currentIncomeUsedPercentage)}%
                                </strong>{" "}
                                da renda.
                            </p>
                        )}
                    </div>
                </div>
            )}

            <p className="mt-5 border-t border-brd-subtle pt-4 text-center text-sm text-content-muted sm:text-left">
                {incomeUsageStatistics.previous == null
                    ? "No mês passado não houve entrada de dinheiro."
                    : `No mês passado, você gastou ${formatPercentage(incomeUsageStatistics.previous)}% da renda.`}
            </p>
        </section>
    );
}
