import { DashboardHeader } from "@/modules/dashboard/components/header";
import { RecentTransactions } from "@/modules/dashboard/components/recent-transactions";
import { TopCategories } from "@/modules/dashboard/components/top-categories";
import { Balance } from "@/modules/statistics/components/balance";
import { useSearchParams } from "react-router-dom";

export function DashboardPage() {
    const [searchParams] = useSearchParams();
    const month = Number(searchParams.get("month"));
    const year = Number(searchParams.get("year"));

    const currentMonth = month || new Date().getMonth() + 1;
    const currentYear = year || new Date().getFullYear();

    return (
        <main className="space-y-6">
            <DashboardHeader currentMonth={currentMonth} currentYear={currentYear} />
            <Balance currentMonth={currentMonth} currentYear={currentYear} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TopCategories currentMonth={currentMonth} currentYear={currentYear} />
                <RecentTransactions currentMonth={currentMonth} currentYear={currentYear} />
            </div>
        </main>
    )
}
