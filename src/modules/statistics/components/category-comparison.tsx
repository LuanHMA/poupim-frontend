import { CategoriesService } from "@/modules/categories/categories.service";
import { CategoryIcon } from "@/modules/categories/components/category-icon";
import type { MonthlyStatistics } from "@/modules/statistics/types/statistics";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/shared/utils/cn";
import { formatations } from "@/shared/utils/formatations";
import { ArrowDownRight, ArrowUpRight, Minus, Tag } from "lucide-react";

type CategoryStatistics = MonthlyStatistics["top_categories"][number];

function CategoryDifference({ amountDifference }: { amountDifference: number }) {
    const DifferenceIcon = amountDifference > 0
        ? ArrowUpRight
        : amountDifference < 0
            ? ArrowDownRight
            : Minus;

    return (
        <p className={cn(
            "flex items-center gap-1 text-xs font-medium",
            amountDifference > 0
                ? "text-content-danger"
                : amountDifference < 0
                    ? "text-content-success"
                    : "text-content-muted",
        )}>
            <DifferenceIcon className="size-3.5" />
            {amountDifference === 0
                ? "Mesmo gasto do mês passado"
                : `Você gastou ${formatations.currency(Math.abs(amountDifference))} ${amountDifference > 0 ? "a mais" : "a menos"} que no mês passado`}
        </p>
    );
}

export function CategoryComparison({
    categoryStatistics,
}: {
    categoryStatistics: CategoryStatistics[];
}) {
    const { data: categoriesData } = useQuery({
        queryKey: ["categories"],
        queryFn: () => CategoriesService.getCategories(),
    });
    const highestCategoryAmount = Math.max(
        ...categoryStatistics.map((category) => category.total_amount),
        1,
    );

    return (
        <section className="rounded-xl bg-background-surface p-4 sm:p-5">
            <div className="mb-5">
                <h2 className="text-lg font-semibold text-content-primary">Onde você mais gastou</h2>
                <p className="text-sm text-content-muted">Da categoria com maior gasto para a menor.</p>
            </div>

            {categoryStatistics.length === 0 ? (
                <p className="text-sm text-content-muted">Nenhum gasto registrado neste mês.</p>
            ) : (
                <ul className="space-y-5">
                    {categoryStatistics.map((category) => {
                        const categoryDetails = categoriesData?.categories.find(
                            ({ name }) => name === category.category,
                        );

                        return <li key={category.category} className="flex items-start gap-3">
                            <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-background-elevated">
                                {categoryDetails?.icon ? (
                                    <CategoryIcon category={categoryDetails} className="size-6" />
                                ) : (
                                    <Tag className="size-6 text-content-muted" aria-hidden />
                                )}
                            </span>

                            <div className="min-w-0 flex-1">
                                <div className="mb-2 flex items-center justify-between gap-3">
                                    <span className="truncate text-sm font-medium text-content-primary">
                                        {category.category}
                                    </span>
                                    <span className="shrink-0 text-sm font-semibold tabular-nums text-content-primary">
                                        {formatations.currency(category.total_amount)}
                                    </span>
                                </div>
                                <div className="h-2.5 overflow-hidden rounded-full bg-background-elevated">
                                    <div
                                        className="h-full rounded-full bg-background-accent"
                                        style={{ width: `${category.total_amount / highestCategoryAmount * 100}%` }}
                                    />
                                </div>
                                <div className="mt-2.5">
                                    <CategoryDifference amountDifference={category.difference} />
                                </div>
                            </div>
                        </li>
                    })}
                </ul>
            )}
        </section>
    );
}
