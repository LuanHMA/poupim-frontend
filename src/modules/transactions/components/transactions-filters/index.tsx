import { Button } from "@/shared/components/ui";
import { cn } from "@/shared/utils/cn";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { useTransactionFilters } from "../../hooks/use-transaction-filters";
import { TransactionsSearchFilter } from "./search-filter";
import { TransactionsFiltersDrawer } from "./transactions-filters-drawer";

export function TransactionsFilters() {
    const { filters } = useTransactionFilters();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const hasAdvancedFilters = Boolean(filters.category_id?.length || filters.status || filters.type);

    return (
        <div className="flex items-center gap-2">
            <TransactionsSearchFilter />

            <Button
                variant="outline"
                aria-label="Filtros"
                aria-expanded={isDrawerOpen}
                className={cn(
                    "shrink-0",
                    hasAdvancedFilters && "border-content-accent text-content-accent",
                )}
                onClick={() => setIsDrawerOpen(true)}
            >
                <SlidersHorizontal
                    className={cn("size-5", hasAdvancedFilters ? "text-content-accent" : "text-content-muted")}
                />
            </Button>

            {isDrawerOpen ? (
                <TransactionsFiltersDrawer onClose={() => setIsDrawerOpen(false)} />
            ) : null}
        </div>
    );
}
