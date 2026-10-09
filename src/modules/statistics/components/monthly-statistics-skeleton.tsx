import { Skeleton } from "@/shared/components/ui";

function CardSkeleton({ tall = false }: { tall?: boolean }) {
    return (
        <div className="rounded-xl bg-background-surface p-4 sm:p-5">
            <Skeleton className="h-6 w-44" />
            <Skeleton className="mt-2 h-4 w-64 max-w-full" />
            <Skeleton className={tall ? "mt-6 h-48 w-full" : "mt-6 h-28 w-full"} />
        </div>
    );
}

export function MonthlyStatisticsSkeleton() {
    return (
        <div role="status" aria-live="polite" className="space-y-4 sm:space-y-6">
            <span className="sr-only">Carregando estatísticas do mês</span>
            <Skeleton className="h-24 w-full rounded-xl" />
            <CardSkeleton />
            <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
                <CardSkeleton />
                <CardSkeleton />
            </div>
            <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
                <CardSkeleton tall />
                <CardSkeleton tall />
            </div>
        </div>
    );
}
