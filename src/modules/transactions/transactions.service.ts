import { api } from "@/shared/api";
import type { GetRecentTransactionsInput, GetRecentTransactionsOutput } from "./types/transactions";

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
}