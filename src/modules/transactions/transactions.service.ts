import { api } from "@/shared/api";
import type { CreateTransactionInput, CreateTransactionOutput, GetTransactionsInput, GetTransactionsOutput } from "./types/transactions";

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
            }
        });
    }

    static async createTransaction(data: CreateTransactionInput) {
        return api.post<CreateTransactionOutput>("/transactions", data);
    }
}