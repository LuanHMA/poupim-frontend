import { Input } from "@/shared/components/ui";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import { useTransactionFilters } from "../../hooks/use-transaction-filters";

const SEARCH_DEBOUNCE_MS = 400;

export function TransactionsSearchFilter() {
    const { filters, setFilter } = useTransactionFilters();
    const [search, setSearch] = useState(filters.search ?? "");
    const [debouncedSearch] = useDebounce(search, SEARCH_DEBOUNCE_MS);
    const writtenSearch = useRef(filters.search ?? "");

    useEffect(() => {
        const urlSearch = filters.search ?? "";
        if (urlSearch === writtenSearch.current) return;
        writtenSearch.current = urlSearch;
        setSearch(urlSearch);
    }, [filters.search]);

    useEffect(() => {
        const nextSearch = debouncedSearch.trim();
        if (nextSearch === (filters.search ?? "")) return;
        writtenSearch.current = nextSearch;
        setFilter("search", nextSearch || null);
    }, [debouncedSearch, filters.search, setFilter]);

    return (
        <Input
            placeholder="Buscar por descrição ou observação"
            icon={<Search className="size-4 text-content-muted" />}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
        />
    );
}
