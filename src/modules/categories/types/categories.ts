export type Category = {
    id: number
    name: string
    icon: string
    color: string
    user_id: number
    created_at: string
}

export type GetCategoriesOutput = {
    categories: Category[]
    message: string
}