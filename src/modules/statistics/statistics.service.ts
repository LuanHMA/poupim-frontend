import { api } from "@/shared/api";
import type { GetTopExpenseCategoriesInput, GetTopExpenseCategoriesOutput } from "../transactions/types/transactions";
import type { AvaiblePeriodsOutput, CashFlowInput, CashFlowOutput } from "./types/statistics";

export class StatisticsService {
    static async getCashFlow(params: CashFlowInput) {
        return api.get<CashFlowOutput>("/stats/cash-flow", { params });
    }

    static async getAvailablePeriods() {
        return api.get<AvaiblePeriodsOutput>("/stats/periods");
    }

    static async getTopExpenseCategories(params?: GetTopExpenseCategoriesInput) {
        return api.get<GetTopExpenseCategoriesOutput>("/stats/top-expense-categories", { params });
    }
}
