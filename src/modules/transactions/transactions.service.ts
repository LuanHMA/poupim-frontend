import { api } from "@/shared/api";
import type { CreateTransactionInput, CreateTransactionOutput, GetRecentTransactionsInput, GetRecentTransactionsOutput } from "./types/transactions";

export class TransactionsService {
    static async getRecentTransactions(params: GetRecentTransactionsInput) {
        return api.get<GetRecentTransactionsOutput>("/transactions", {
            params: {
                month: params.month,
                year: params.year,
                limit: 5
            }
        });
    }

    static async createTransaction(data: CreateTransactionInput) {
        return api.post<CreateTransactionOutput>("/transactions", data);
    }
}