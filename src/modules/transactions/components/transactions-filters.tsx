import { Button, Input } from "@/shared/components/ui";
import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

export function TransactionsFilters() {

    const [isOpen, setIsOpen] = useState(false);

    const handleToggleFilters = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="flex items-center gap-2">
            <Input placeholder="Buscar transação" icon={<Search className="size-4 text-content-muted" />} />
            <Button variant="outline" onClick={handleToggleFilters}>
                <SlidersHorizontal className="size-5 text-content-muted" />
            </Button>
          
        </div>
    )
}