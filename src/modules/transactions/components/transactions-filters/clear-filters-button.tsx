import { Button } from "@/shared/components/ui";
import { useTransactionFilters } from "../../hooks/use-transaction-filters";

export function TransactionsClearFiltersButton() {
    const { clearFilters, hasFilters } = useTransactionFilters();

    if (!hasFilters) return null;

    return (
        <div className="flex justify-end">
            <Button type="button" variant="outline" size="md" onClick={clearFilters}>
                Limpar filtros
            </Button>
        </div>
    );
}
