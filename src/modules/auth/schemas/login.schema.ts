import z from "zod";

export const loginSchema = z.object({
    email: z.string().email("Insira um e-mail válido"),
    password: z.string().min(8, "Insira uma senha válida")
})

export type LoginSchemaType = z.infer<typeof loginSchema>