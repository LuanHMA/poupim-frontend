import { Skeleton } from "@/shared/components/ui";

function TransactionCardSkeleton() {
    return (
        <div className="rounded-2xl bg-background-surface p-4">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Skeleton className="size-10 rounded-md" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-5 w-16 rounded-full" />
                    </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-3 w-14" />
                </div>
            </div>
        </div>
    );
}

function TransactionsCardsSkeleton() {
    return (
        <div className="md:hidden">
            {[0, 1].map((group) => (
                <div key={group} className="space-y-5 pb-6">
                    <Skeleton className="h-4 w-16" />
                    <div className="flex flex-col gap-4">
                        <TransactionCardSkeleton />
                        <TransactionCardSkeleton />
                    </div>
                </div>
            ))}
        </div>
    );
}

function TransactionsTableSkeleton() {
    return (
        <div className="hidden overflow-hidden rounded-xl border border-brd-default bg-background-surface md:block">
            <table className="w-full text-left text-sm">
                <thead>
                    <tr className="border-b border-brd-subtle text-content-muted">
                        <th className="px-4 py-3 font-medium">Data</th>
                        <th className="px-4 py-3 font-medium">Descrição</th>
                        <th className="px-4 py-3 font-medium">Categoria</th>
                        <th className="px-4 py-3 font-medium">Valor</th>
                        <th className="px-4 py-3 font-medium">Status</th>
                        <th className="px-4 py-3 text-right font-medium">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: 6 }, (_, index) => (
                        <tr key={index} className="border-b border-brd-subtle last:border-b-0">
                            <td className="px-4 py-3"><Skeleton className="h-4 w-28" /></td>
                            <td className="px-4 py-3"><Skeleton className="h-4 w-40" /></td>
                            <td className="px-4 py-3"><Skeleton className="h-4 w-24" /></td>
                            <td className="px-4 py-3"><Skeleton className="h-4 w-20" /></td>
                            <td className="px-4 py-3"><Skeleton className="h-4 w-16" /></td>
                            <td className="px-4 py-3">
                                <div className="flex justify-end gap-2">
                                    <Skeleton className="size-8 rounded-xl" />
                                    <Skeleton className="size-8 rounded-xl" />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export function TransactionsListSkeleton() {
    return (
        <div role="status" aria-live="polite" className="space-y-6">
            <span className="sr-only">Carregando transações</span>
            <TransactionsCardsSkeleton />
            <TransactionsTableSkeleton />
            <div className="flex items-center justify-center gap-2">
                <Skeleton className="size-9 rounded-xl" />
                <Skeleton className="size-9 rounded-xl" />
                <Skeleton className="size-9 rounded-xl" />
            </div>
        </div>
    );
}
