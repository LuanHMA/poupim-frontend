import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import z from "zod";
import type { TransactionFilters } from "../types/transactions";

const categoryIdSchema = z.coerce.number().int().positive();
const transactionStatusSchema = z.enum(["PENDING", "PAID", "RECEIVED"]);
const transactionTypeSchema = z.enum(["INCOME", "EXPENSE"]);
const searchSchema = z.string().trim().min(1);

export const getFiltersFromSearchParams = (searchParams: URLSearchParams): TransactionFilters => {
    const categoryId = categoryIdSchema.safeParse(searchParams.get("category_id"));
    const status = transactionStatusSchema.safeParse(searchParams.get("status"));
    const type = transactionTypeSchema.safeParse(searchParams.get("type"));
    const search = searchSchema.safeParse(searchParams.get("search"));
    return {
        ...(categoryId.success && { category_id: categoryId.data }),
        ...(status.success && { status: status.data }),
        ...(type.success && { type: type.data }),
        ...(search.success && { search: search.data }),
    }
}

export function useTransactionFilters() {
    const [searchParams, setSearchParams] = useSearchParams();

    const filters = useMemo(() => getFiltersFromSearchParams(searchParams), [searchParams]);

    const setFilter = useCallback(<K extends keyof TransactionFilters>(
        key: K,
        value: TransactionFilters[K] | null,
    ) => {
        setSearchParams((current) => {
            const next = new URLSearchParams(current);

            if (value == null || value === "") {
                next.delete(key);
            } else {
                next.set(key, String(value));
            }

            return next;
        }, { replace: true });
    }, [setSearchParams]);

    const clearFilters = useCallback(() => {
        setSearchParams((current) => {
            const next = new URLSearchParams(current);

            const filterParams = ["category_id", "status", "type", "search"];

            for (const key of filterParams) {
                next.delete(key);
            }

            return next;
        }, { replace: true });
    }, [setSearchParams]);

    const hasFilters = Boolean(
        filters.category_id || filters.status || filters.type || filters.search,
    );

    return { filters, setFilter, clearFilters, hasFilters };
}
