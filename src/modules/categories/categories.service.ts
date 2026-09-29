import { api } from "@/shared/api";
import type { GetCategoriesOutput } from "./types/categories";

export class CategoriesService {
    static async getCategories() {
        return api.get<GetCategoriesOutput>("/categories");
    }
}