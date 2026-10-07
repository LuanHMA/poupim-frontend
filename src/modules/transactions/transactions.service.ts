import { api } from "@/shared/api";
import type { CreateTransactionInput, CreateTransactionOutput, GetTransactionsInput, GetTransactionsOutput, UpdateTransactionInput, UpdateTransactionOutput } from "./types/transactions";

export class TransactionsService {
    static async getRecentTransactions(params: GetTransactionsInput) {
        return api.get<GetTransactionsOutput>("/transactions", {
            params: {
                month: params.month,
                year: params.year,
                limit: 5
            }
        });
    }

    static async getTransactions(params: GetTransactionsInput) {
        return api.get<GetTransactionsOutput>("/transactions", {
            params: {
                month: params.month,
                year: params.year,
                page: params.page ?? 1,
                limit: params.limit ?? 20,
                category_id: params.category_id?.join(","),
                status: params.status,
                type: params.type,
                search: params.search,
            }
        });
        
    }

    static async createTransaction(data: CreateTransactionInput) {
        return api.post<CreateTransactionOutput>("/transactions", data);
    }

    static async updateTransaction(id: string, data: UpdateTransactionInput) {
        return api.put<UpdateTransactionOutput>(`/transactions/${id}`, data);
    }

    static async deleteTransaction(id: string) {
        return api.delete<void>(`/transactions/${id}`);
    }
}