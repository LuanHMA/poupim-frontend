import type { MonthlyStatistics } from "@/modules/statistics/types/statistics";
import {
    statisticsChartColors,
    statisticsChartTooltipStyles,
} from "@/modules/statistics/utils/chart-styles";
import { cn } from "@/shared/utils/cn";
import { formatations } from "@/shared/utils/formatations";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
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

type MonthlyComparisonData = MonthlyStatistics["versus_previous"];
type MonthlyMetricKey = keyof MonthlyComparisonData["difference"];

const monthlyMetrics: {
    key: MonthlyMetricKey;
    label: string;
    chartLabel: string;
}[] = [
    {
        key: "total_income",
        label: "Dinheiro que entrou",
        chartLabel: "Entrou",
    },
    {
        key: "total_expense",
        label: "Dinheiro que saiu",
        chartLabel: "Saiu",
    },
    {
        key: "balance",
        label: "Saldo do mês",
        chartLabel: "Saldo",
    },
];

function formatPeriod(month: number, year: number) {
    const monthName = new Date(year, month - 1)
        .toLocaleDateString("pt-BR", { month: "short" })
        .replace(".", "");

    return `${monthName}/${String(year).slice(-2)}`;
}

function MetricDifference({
    difference,
    metricKey,
}: {
    difference: number;
    metricKey: MonthlyMetricKey;
}) {
    const DifferenceIcon = difference > 0 ? ArrowUpRight : difference < 0 ? ArrowDownRight : Minus;
    const isPositiveChange = metricKey === "total_expense" ? difference < 0 : difference > 0;
    const sentenceSubject = metricKey === "total_income"
        ? "Entrou"
        : metricKey === "total_expense"
            ? "Você gastou"
            : "Seu saldo ficou";

    return (
        <p className={cn(
            "mt-3 flex items-center gap-1 text-sm font-medium",
            difference === 0 ? "text-content-muted" : isPositiveChange ? "text-content-success" : "text-content-danger",
        )}>
            <DifferenceIcon className="size-4 shrink-0" />
            {difference === 0
                ? "Igual ao mês passado"
                : `${sentenceSubject} ${formatations.currency(Math.abs(difference))} ${difference > 0 ? "a mais" : "a menos"}`}
        </p>
    );
}

export function MonthlyComparison({
    monthlyComparison,
}: {
    monthlyComparison: MonthlyComparisonData;
}) {
    const {
        current: currentMonthStatistics,
        previous: previousMonthStatistics,
        difference: monthlyDifference,
    } = monthlyComparison;
    const previousPeriodLabel = formatPeriod(previousMonthStatistics.month, previousMonthStatistics.year);
    const currentPeriodLabel = formatPeriod(currentMonthStatistics.month, currentMonthStatistics.year);
    const chartData = monthlyMetrics.map(({ key, chartLabel }) => ({
        metric: chartLabel,
        previous: previousMonthStatistics[key],
        current: currentMonthStatistics[key],
    }));

    return (
        <section className="rounded-xl bg-background-surface p-4 sm:p-5">
            <div className="mb-5">
                <h2 className="text-lg font-semibold text-content-primary">Comparação com o mês anterior</h2>
                <p className="text-sm text-content-muted">Acompanhe como entradas, saídas e saldo mudaram.</p>
            </div>

            <div
                className="h-64 overflow-hidden rounded-xl border border-brd-subtle bg-background-base/30 px-2 pt-4 [&_.recharts-surface]:outline-none [&_*:focus]:outline-none"
                role="img"
                aria-label="Gráfico de barras comparando entradas, saídas e saldo com o mês anterior"
            >
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
                        <defs>
                            <linearGradient id="previous-period-gradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={statisticsChartColors.secondary} />
                                <stop offset="100%" stopColor={statisticsChartColors.secondaryBackground} />
                            </linearGradient>
                            <linearGradient id="current-period-gradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={statisticsChartColors.primary} />
                                <stop offset="100%" stopColor={statisticsChartColors.primarySecondary} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid
                            vertical={false}
                            stroke="var(--color-brd-subtle)"
                            strokeDasharray="4 6"
                        />
                        <XAxis
                            dataKey="metric"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "var(--color-content-muted)", fontSize: 12 }}
                            dy={8}
                        />
                        <YAxis hide />
                        <Tooltip
                            itemSorter={(item) => item.dataKey === "previous" ? 0 : 1}
                            formatter={(value, name, item) => {
                                const metricLabel = item.payload.metric;
                                const metricKey = monthlyMetrics.find(
                                    ({ chartLabel }) => chartLabel === metricLabel,
                                )?.key;
                                const numericValue = Number(value);
                                const valueColor = metricKey === "total_expense"
                                    ? statisticsChartColors.negative
                                    : metricKey === "balance" && numericValue < 0
                                        ? statisticsChartColors.negative
                                        : statisticsChartColors.positive;

                                return [
                                    <span style={{ color: valueColor }}>
                                        {formatations.currency(numericValue)}
                                    </span>,
                                    name === "current" ? currentPeriodLabel : previousPeriodLabel,
                                ];
                            }}
                            {...statisticsChartTooltipStyles}
                        />
                        <Legend
                            formatter={(value) => value === "current" ? currentPeriodLabel : previousPeriodLabel}
                            wrapperStyle={{ color: "var(--color-content-muted)", fontSize: 12 }}
                        />
                        <Bar
                            dataKey="previous"
                            fill="url(#previous-period-gradient)"
                            radius={[6, 6, 0, 0]}
                            maxBarSize={42}
                        />
                        <Bar
                            dataKey="current"
                            fill="url(#current-period-gradient)"
                            radius={[6, 6, 0, 0]}
                            maxBarSize={42}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {monthlyMetrics.map(({ key, label }) => (
                    <article key={key} className="rounded-lg border border-brd-subtle p-3">
                        <h3 className="text-sm text-content-muted">{label}</h3>
                        <p className="mt-2 text-lg font-semibold tabular-nums text-content-primary">
                            {formatations.currency(currentMonthStatistics[key])}
                        </p>
                        <p className="text-xs text-content-muted">
                            Mês passado: {formatations.currency(previousMonthStatistics[key])}
                        </p>
                        <MetricDifference difference={monthlyDifference[key]} metricKey={key} />
                    </article>
                ))}
            </div>
        </section>
    );
}
