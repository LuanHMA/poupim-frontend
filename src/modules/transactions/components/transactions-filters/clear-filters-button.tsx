import { Button } from "@/shared/components/ui";

export function TransactionsClearFiltersButton({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
    return (
        <Button type="button" variant="outline" size="md" className="flex-1" onClick={onClick} disabled={disabled}>
            Limpar filtros
        </Button>
    );
}
