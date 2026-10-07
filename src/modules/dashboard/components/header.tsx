import { useSession } from "@/modules/auth/context/session-context";
import { getGreeting } from "@/modules/dashboard/utils/get-greeting";
import { Skeleton } from "@/shared/components/ui";
import { SelectPeriod } from "../../statistics/components/select-period";

export function DashboardHeader({ currentMonth, currentYear }: { currentMonth: number, currentYear: number }) {
    const { user, isLoading } = useSession();
    const username = user?.name.split(" ")[0] ?? "";

    return (
        <header className="flex items-center justify-between gap-6 w-full">
            {isLoading ? (
                <div role="status" aria-live="polite" className="flex flex-col items-start gap-2">
                    <span className="sr-only">Carregando saudação</span>
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-9 w-36" />
                </div>
            ) : (
                <div className="flex items-start flex-col">
                    <p className="text-sm text-content-muted">{getGreeting()},</p>
                    <h1 className="text-3xl text-content-primary">{username}</h1>
                </div>
            )}

            <SelectPeriod currentMonth={currentMonth} currentYear={currentYear} navigateTo="dashboard" />
        </header>
    )
}