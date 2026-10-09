import type { MonthlyStatistics } from "@/modules/statistics/types/statistics";
import { cn } from "@/shared/utils/cn";
import { formatations } from "@/shared/utils/formatations";
import { CircleCheck, CircleGauge, TriangleAlert } from "lucide-react";
import type { ReactNode } from "react";

const verdictStyles = {
    tranquilo: {
        label: "Mês tranquilo",
        icon: CircleCheck,
        className: "border-content-success/30 bg-background-success/10 text-content-success",
        valueClassName: "text-content-success",
    },
    apertado: {
        label: "Atenção aos gastos",
        icon: CircleGauge,
        className: "border-content-warning/30 bg-content-warning/10 text-content-warning",
        valueClassName: "text-content-warning",
    },
    no_vermelho: {
        label: "Saldo no vermelho",
        icon: TriangleAlert,
        className: "border-content-danger/30 bg-background-danger/10 text-content-danger",
        valueClassName: "text-content-danger",
    },
} as const;

function HighlightedValue({
    children,
    className,
}: {
    children: ReactNode;
    className: string;
}) {
    return <strong className={cn("font-semibold tabular-nums", className)}>{children}</strong>;
}

export function MonthlyVerdict({
    verdict,
    hasTransactions,
}: {
    verdict: MonthlyStatistics["verdict"];
    hasTransactions: boolean;
}) {
    if (!hasTransactions || !verdict) {
        return (
            <section className="rounded-xl border border-dashed border-brd-default bg-background-surface p-5">
                <p className="text-sm font-medium text-content-primary">Sem movimentações neste período</p>
                <p className="mt-1 text-sm text-content-muted">
                    Registre entradas e saídas para receber uma análise do mês.
                </p>
            </section>
        );
    }

    const verdictStyle = verdictStyles[verdict.state];
    const VerdictIcon = verdictStyle.icon;
    const incomeUsedPercentage = verdict.income_used_percentage;
    const formattedPercentage = incomeUsedPercentage?.toLocaleString("pt-BR", { maximumFractionDigits: 2 });
    const formattedBalance = formatations.currency(Math.abs(verdict.balance));

    return (
        <section className={cn("flex items-start gap-3 rounded-xl border p-5", verdictStyle.className)}>
            <VerdictIcon className="mt-0.5 size-5 shrink-0" />
            <div>
                <h2 className="font-semibold">{verdictStyle.label}</h2>
                <p className="mt-1 text-sm leading-6 text-content-primary">
                    {verdict.state === "no_vermelho" ? (
                        incomeUsedPercentage == null ? (
                            <>
                                Não houve entradas e saíram{" "}
                                <HighlightedValue className={verdictStyle.valueClassName}>
                                    {formattedBalance}
                                </HighlightedValue>
                                .
                            </>
                        ) : (
                            <>
                                Você usou{" "}
                                <HighlightedValue className={verdictStyle.valueClassName}>
                                    {formattedPercentage}%
                                </HighlightedValue>{" "}
                                da renda e gastou{" "}
                                <HighlightedValue className={verdictStyle.valueClassName}>
                                    {formattedBalance}
                                </HighlightedValue>{" "}
                                a mais do que entrou.
                            </>
                        )
                    ) : (
                        <>
                            Você {verdict.state === "apertado" ? "já " : ""}usou{" "}
                            <HighlightedValue className={verdictStyle.valueClassName}>
                                {formattedPercentage ?? 0}%
                            </HighlightedValue>{" "}
                            do dinheiro que entrou e ainda tem{" "}
                            <HighlightedValue className={verdictStyle.valueClassName}>
                                {formattedBalance}
                            </HighlightedValue>
                            .
                        </>
                    )}
                </p>
            </div>
        </section>
    );
}
