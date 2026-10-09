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
    Cell,
    LabelList,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

type SameDayComparisonData = NonNullable<MonthlyStatistics["same_day"]>;

export function SameDayComparison({
    sameDayComparison,
}: {
    sameDayComparison: SameDayComparisonData;
}) {
    const {
        current_expense: currentExpense,
        previous_expense: previousExpense,
        difference: expenseDifference,
    } = sameDayComparison;
    const DifferenceIcon = expenseDifference > 0
        ? ArrowUpRight
        : expenseDifference < 0
            ? ArrowDownRight
            : Minus;
    const chartData = [
        { period: "Este mês", amount: currentExpense, color: statisticsChartColors.primary },
        { period: "Mês passado", amount: previousExpense, color: statisticsChartColors.secondary },
    ];

    return (
        <section className="rounded-xl bg-background-surface p-4 sm:p-5">
            <div className="mb-5">
                <h2 className="text-lg font-semibold text-content-primary">Gastos até hoje</h2>
                <p className="text-sm text-content-muted">
                    Comparação com os gastos do mês passado até o dia de hoje.
                </p>
            </div>

            <div className="h-36 rounded-lg bg-background-base/30 py-3 [&_.recharts-surface]:outline-none [&_*:focus]:outline-none">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        layout="vertical"
                        margin={{ top: 0, right: 92, left: 8, bottom: 0 }}
                    >
                        <CartesianGrid horizontal={false} stroke="var(--color-brd-subtle)" strokeDasharray="4 6" />
                        <XAxis type="number" hide />
                        <YAxis
                            type="category"
                            dataKey="period"
                            width={88}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "var(--color-content-muted)", fontSize: 12 }}
                        />
                        <Tooltip
                            formatter={(value) => [
                                <span style={{ color: "var(--color-content-primary)" }}>
                                    {formatations.currency(Number(value))}
                                </span>,
                                "Gastos",
                            ]}
                            {...statisticsChartTooltipStyles}
                        />
                        <Bar dataKey="amount" radius={[0, 8, 8, 0]} maxBarSize={18}>
                            {chartData.map(({ period, color }) => <Cell key={period} fill={color} />)}
                            <LabelList
                                dataKey="amount"
                                position="right"
                                formatter={(value) => formatations.currency(Number(value ?? 0))}
                                fill="var(--color-content-primary)"
                                fontSize={12}
                            />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className={cn(
                "mt-5 flex items-center gap-1 text-sm font-medium",
                expenseDifference > 0
                    ? "text-content-danger"
                    : expenseDifference < 0
                        ? "text-content-success"
                        : "text-content-muted",
            )}>
                <DifferenceIcon className="size-4" />
                {expenseDifference === 0
                    ? "Você gastou o mesmo que no mês passado"
                    : `Você gastou ${formatations.currency(Math.abs(expenseDifference))} ${expenseDifference > 0 ? "a mais" : "a menos"} até este dia`}
            </div>
        </section>
    );
}
