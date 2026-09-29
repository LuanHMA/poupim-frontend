import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSession } from "../context/session-context";
import { registerSchema, type RegisterSchemaType } from "../schemas/register-schema";
import { AuthService } from "../auth.service";
export function useRegister() {
    const navigate = useNavigate()
    const { setSession } = useSession()

    const { handleSubmit, control, formState: { isSubmitting } } = useForm<RegisterSchemaType>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
            name: "",
        }
    })

    async function onRegister(data: RegisterSchemaType) {
        try {
            const response = await AuthService.register({
                name: data.name,
                email: data.email,
                password: data.password,
            });

            if (response) {
                setSession(response.user)
                toast.success("Cadastro realizado com sucesso")
                navigate("/dashboard")
            }
        } catch {
            toast.error("Erro ao cadastrar")
        }
    }

    return {
        onRegister,
        handleSubmit,
        control,
        isSubmitting
    }
}