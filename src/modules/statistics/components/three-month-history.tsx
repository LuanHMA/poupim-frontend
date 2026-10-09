import type { MonthlyStatistics } from "@/modules/statistics/types/statistics";
import {
    statisticsChartColors,
    statisticsChartTooltipStyles,
} from "@/modules/statistics/utils/chart-styles";
import { formatations } from "@/shared/utils/formatations";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

type MonthlyHistory = MonthlyStatistics["last_three_months"];

function monthLabel(month: number, year: number) {
    return new Date(year, month - 1).toLocaleDateString("pt-BR", { month: "short" }).replace(".", "");
}

export function ThreeMonthHistory({
    monthlyHistory,
}: {
    monthlyHistory: MonthlyHistory;
}) {
    const chartData = monthlyHistory.map((monthStatistics) => ({
        period: monthLabel(monthStatistics.month, monthStatistics.year),
        totalIncome: monthStatistics.total_income,
        totalExpense: monthStatistics.total_expense,
    }));

    return (
        <section className="rounded-xl bg-background-surface p-4 sm:p-5">
            <div className="mb-5">
                <h2 className="text-lg font-semibold text-content-primary">Resumo dos últimos três meses</h2>
                <p className="text-sm text-content-muted">Quanto entrou, quanto saiu e o resultado de cada mês.</p>
            </div>

            <div className="h-60 [&_.recharts-surface]:outline-none [&_*:focus]:outline-none">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 8, right: 0, left: 0, bottom: 0 }}>
                        <CartesianGrid vertical={false} stroke="var(--color-brd-subtle)" strokeDasharray="4 6" />
                        <XAxis
                            dataKey="period"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "var(--color-content-muted)", fontSize: 12 }}
                        />
                        <YAxis hide />
                        <Tooltip
                            itemSorter={(item) => item.dataKey === "totalIncome" ? 0 : 1}
                            formatter={(value, name) => {
                                const isIncome = name === "totalIncome";

                                return [
                                    <span style={{
                                        color: isIncome
                                            ? statisticsChartColors.positive
                                            : statisticsChartColors.negative,
                                    }}>
                                        {formatations.currency(Number(value))}
                                    </span>,
                                    isIncome ? "Entrou" : "Saiu",
                                ];
                            }}
                            {...statisticsChartTooltipStyles}
                        />
                        <Legend
                            formatter={(value) => value === "totalIncome" ? "Entrou" : "Saiu"}
                            wrapperStyle={{ color: "var(--color-content-muted)", fontSize: 12 }}
                        />
                        <Bar
                            dataKey="totalIncome"
                            fill={statisticsChartColors.primary}
                            radius={[6, 6, 0, 0]}
                            maxBarSize={32}
                        />
                        <Bar
                            dataKey="totalExpense"
                            fill={statisticsChartColors.secondary}
                            radius={[6, 6, 0, 0]}
                            maxBarSize={32}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-3">
                {monthlyHistory.map((monthStatistics) => (
                    <article
                        key={`${monthStatistics.month}-${monthStatistics.year}`}
                        className="rounded-lg border border-brd-subtle bg-background-base/30 p-3"
                    >
                        <div className="flex items-center justify-between gap-2">
                            <h3 className="text-sm font-medium capitalize text-content-primary">
                                {monthLabel(monthStatistics.month, monthStatistics.year)} de {monthStatistics.year}
                            </h3>
                            {monthStatistics.in_progress ? (
                                <span className="rounded-full bg-background-accent/15 px-2 py-1 text-[0.625rem] font-medium text-content-accent">
                                    Mês atual
                                </span>
                            ) : null}
                        </div>
                        <div className="mt-2 text-sm">
                            <span className="text-content-muted">
                                {monthStatistics.balance >= 0 ? "Sobrou " : "Faltou "}
                            </span>
                            <strong className={monthStatistics.balance >= 0 ? "text-content-success" : "text-content-danger"}>
                                {formatations.currency(Math.abs(monthStatistics.balance))}
                            </strong>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
