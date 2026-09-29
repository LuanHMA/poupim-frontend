import { Balance } from "@/modules/statistics/components/balance";
import { SelectPeriod } from "@/modules/statistics/components/select-period";
import { TransactionsList } from "@/modules/transactions/components/transactions-list";
import { useSearchParams } from "react-router-dom";

export function TransactionsPage() {
    const [searchParams] = useSearchParams();
    const month = Number(searchParams.get("month"));
    const year = Number(searchParams.get("year"));

    const currentMonth = month || new Date().getMonth() + 1;
    const currentYear = year || new Date().getFullYear();

    return (
        <div className="space-y-6">
            <header className="flex items-center justify-between gap-6 w-full">
                <div className="flex items-start flex-col">
                    <h1 className="text-2xl font-semibold text-content-primary">Transações</h1>
                </div>

                <SelectPeriod currentMonth={currentMonth} currentYear={currentYear} navigateTo="transactions" />
            </header>

            <Balance currentMonth={currentMonth} currentYear={currentYear} visualEffects={false} />

            <TransactionsList month={currentMonth} year={currentYear} />
        </div>
    )
}
