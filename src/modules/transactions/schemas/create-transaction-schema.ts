import z from "zod";

export const createTransactionSchema = z.object({
    description: z
        .string("Insira uma descrição válida")
        .min(1, "A descrição é obrigatória"),
    categoryId: z
        .number("Insira um category_id válido")
        .min(1, "A categoria é obrigatória"),
    amount: z
        .number("Insira um amount válido")
        .refine((value) => value > 0, "O amount deve ser maior que zero"),
    type: z
        .enum(["INCOME", "EXPENSE"], "Insira um type válido"),
    status: z
        .enum(["PAID", "PENDING", "RECEIVED"], "Insira um status válido"),
    ignore: z
        .boolean("Insira um ignore válido"),
    fixed: z
        .boolean("Insira um fixed válido"),
    date: z.iso.date("Insira uma data válida"),
    observation: z
        .string("Insira uma observação válida")
        .optional(),
})

export type CreateTransactionSchemaType = z.infer<typeof createTransactionSchema>