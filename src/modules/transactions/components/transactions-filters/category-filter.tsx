import { CategoriesService } from "@/modules/categories/categories.service";
import { CategoryIcon } from "@/modules/categories/components/category-icon";
import { sortCategoriesByName } from "@/modules/categories/utils/sort-categories";
import { cn } from "@/shared/utils/cn";
import { useQuery } from "@tanstack/react-query";
import { useTransactionFilters } from "../../hooks/use-transaction-filters";

type TransactionsCategoryFilterProps = {
    categoryIds?: number[];
    onChange: (categoryIds: number[]) => void;
};

export function TransactionsCategoryFilter({ categoryIds = [], onChange }: TransactionsCategoryFilterProps) {
    const { filters } = useTransactionFilters();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["categories"],
        queryFn: () => CategoriesService.getCategories(),
    });

    const categories = sortCategoriesByName(data?.categories ?? []).filter((category) =>
        category.name.toLowerCase().includes(filters.search?.trim().toLowerCase() ?? ""),
    );

    return (
        <section className="space-y-3">
            <p className="text-sm font-medium text-content-primary">Categoria</p>

            {isLoading ? (
                <p className="py-8 text-center text-sm text-content-muted">Carregando categorias...</p>
            ) : isError ? (
                <p className="py-8 text-center text-sm text-content-danger">Não foi possível carregar as categorias.</p>
            ) : categories.length === 0 ? (
                <p className="py-8 text-center text-sm text-content-muted">Nenhuma categoria encontrada.</p>
            ) : (
                <div className="drawer-scroll max-h-92 overflow-y-auto bg-background-elevated rounded-xl p-6">
                    <div className="grid grid-cols-4 gap-3">
                        {categories.map((category) => {
                            const isSelected = categoryIds.includes(category.id);

                            return (
                                <button
                                    key={category.id}
                                    type="button"
                                    aria-pressed={isSelected}
                                    onClick={() => {
                                        const nextIds = isSelected
                                            ? categoryIds.filter((id) => id !== category.id)
                                            : [...categoryIds, category.id];

                                        onChange(nextIds);
                                    }}
                                    className={cn(
                                        "flex h-24.5 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-transparent px-1 transition-all hover:bg-background-surface/50",
                                        isSelected && "border-brd-accent bg-background-surface/50",
                                    )}
                                >
                                    <span
                                        className="grid size-12 place-items-center rounded-full"
                                        style={{ backgroundColor: `${category.color}33` }}
                                    >
                                        <CategoryIcon category={category} className="size-6" />
                                    </span>
                                    <span className="w-full truncate text-center text-xs text-content-primary">
                                        {category.name}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </section>
    );
}
