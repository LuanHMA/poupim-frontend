import { Construction } from "lucide-react";

export function StatisticsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-content-primary">Estatísticas</h1>
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-brd-default bg-background-surface px-6 py-12 text-center">
                <Construction className="size-8 text-content-muted" />
                <div className="space-y-1">
                    <p className="text-base font-medium text-content-primary">Página em construção</p>
                    <p className="text-sm text-content-muted">
                        Esta página está em construção. Por favor, tente novamente mais tarde.
                    </p>
                </div>

            </div>
        </div>
    )
}
