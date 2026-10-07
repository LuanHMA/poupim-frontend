import { ApiError } from "@/shared/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthService } from "../auth.service";
import { useSession } from "../context/session-context";
import { loginSchema, type LoginSchemaType } from "../schemas/login.schema";

export function useLogin() {
    const { setSession } = useSession()
    const navigate = useNavigate()

    const { handleSubmit, control, formState: { isSubmitting } } = useForm<LoginSchemaType>({
        resolver: zodResolver(loginSchema),
        mode: "onSubmit",
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
            if (status === 401) {
                toast.error("E-mail ou senha inválidos")
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