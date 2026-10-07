import { Skeleton } from "@/shared/components/ui";

export function BalanceSkeleton() {
    return (
        <div role="status" aria-live="polite">
            <span className="sr-only">Carregando saldo</span>

            <section className="space-y-4 rounded-xl bg-background-surface p-6 sm:hidden">
                <div className="flex flex-col items-center gap-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-10 w-48" />
                </div>

                <div className="flex items-center justify-evenly gap-6">
                    <div className="flex flex-col items-center gap-2">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-5 w-24" />
                    </div>
                    <div className="h-6 w-px bg-background-elevated" />
                    <div className="flex flex-col items-center gap-2">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-5 w-24" />
                    </div>
                </div>
            </section>

            <section className="hidden gap-4 sm:grid sm:grid-cols-1 lg:grid-cols-3">
                <div className="flex flex-col gap-3 rounded-xl bg-background-surface p-6">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-10 w-40" />
                </div>
                <div className="flex flex-col gap-3 rounded-xl border border-brd-default bg-background-surface p-6">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-8 w-32" />
                </div>
                <div className="flex flex-col gap-3 rounded-xl border border-brd-default bg-background-surface p-6">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-8 w-32" />
                </div>
            </section>
        </div>
    );
}
