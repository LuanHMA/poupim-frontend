import { ApiError } from "@/shared/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSession } from "../context/session-context";
import { loginSchema, type LoginSchemaType } from "../schemas/login.schema";
import { AuthService } from "../auth.service";

export function useLogin() {
    const { setSession } = useSession()
    const navigate = useNavigate()

    const { handleSubmit, control, formState: { isSubmitting } } = useForm<LoginSchemaType>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    async function onLogin(data: LoginSchemaType) {
        try {
            const response = await AuthService.login(data);

            if (response.success) {
                setSession(response.user)
                navigate("/dashboard")
            }
        } catch (error) {
            const status = error instanceof ApiError ? error.status : undefined;

            if (status === 400) {
                toast.error("Credenciais inválidas")
            } else {
                toast.error("Erro ao fazer login")
            }

        }
    }

    return {
        onLogin,
        handleSubmit,
        control,
        isSubmitting
    }
}