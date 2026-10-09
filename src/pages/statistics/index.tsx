import { CategoryComparison } from "@/modules/statistics/components/category-comparison";
import { IncomeUsage } from "@/modules/statistics/components/income-usage";
import { MonthlyComparison } from "@/modules/statistics/components/monthly-comparison";
import { MonthlyStatisticsSkeleton } from "@/modules/statistics/components/monthly-statistics-skeleton";
import { MonthlyVerdict } from "@/modules/statistics/components/monthly-verdict";
import { SameDayComparison } from "@/modules/statistics/components/same-day-comparison";
import { SelectPeriod } from "@/modules/statistics/components/select-period";
import { ThreeMonthHistory } from "@/modules/statistics/components/three-month-history";
import { useMonthlyStatistics } from "@/modules/statistics/hooks/use-monthly-statistics";
import { Button } from "@/shared/components/ui";
import { CircleAlert } from "lucide-react";
import { useSearchParams } from "react-router-dom";

export function StatisticsPage() {
    const [searchParams] = useSearchParams();
    const currentDate = new Date();
    const monthParam = Number(searchParams.get("month"));
    const yearParam = Number(searchParams.get("year"));
    const currentMonth = monthParam >= 1 && monthParam <= 12
        ? monthParam
        : currentDate.getMonth() + 1;
    const currentYear = yearParam > 0 ? yearParam : currentDate.getFullYear();
    const { data, isLoading, isError, refetch } = useMonthlyStatistics(currentMonth, currentYear);
    const monthlyStatistics = data?.monthly;

    return (
        <main className="space-y-4 sm:space-y-6">
            <header className="flex items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-content-primary">Estatísticas</h1>
                    <p className="hidden text-sm text-content-muted sm:block">Entenda a evolução das suas finanças.</p>
                </div>
                <SelectPeriod currentMonth={currentMonth} currentYear={currentYear} navigateTo="statistics" />
            </header>

            {isLoading ? <MonthlyStatisticsSkeleton /> : null}

            {isError || (data && !data.success) ? (
                <section role="alert" className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-brd-default bg-background-surface px-6 py-12 text-center">
                    <CircleAlert className="size-8 text-content-danger" />
                    <div className="space-y-1">
                        <p className="font-medium text-content-primary">Não foi possível carregar as estatísticas</p>
                        <p className="text-sm text-content-muted">Tente novamente para ver a análise deste período.</p>
                    </div>
                    <Button type="button" variant="link" size="sm" onClick={() => refetch()}>
                        Tentar novamente
                    </Button>
                </section>
            ) : null}

            {monthlyStatistics ? (
                <>
                    <MonthlyVerdict verdict={monthlyStatistics.verdict} hasTransactions={monthlyStatistics.has_transactions} />
                    <MonthlyComparison monthlyComparison={monthlyStatistics.versus_previous} />

                    <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
                        {monthlyStatistics.same_day ? (
                            <SameDayComparison sameDayComparison={monthlyStatistics.same_day} />
                        ) : null}
                        <IncomeUsage incomeUsageStatistics={monthlyStatistics.income_used_percentage} />
                    </div>

                    <div className="grid items-start gap-4 lg:grid-cols-2 lg:gap-6">
                        <CategoryComparison categoryStatistics={monthlyStatistics.top_categories} />
                        <ThreeMonthHistory monthlyHistory={monthlyStatistics.last_three_months} />
                    </div>
                </>
            ) : null}
        </main>
    );
}
