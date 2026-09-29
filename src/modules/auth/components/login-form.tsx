import { Button, Input } from "@/shared/components/ui";
import { LogInIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/use-login";

export function LoginForm() {
    const { onLogin, control, isSubmitting, handleSubmit } = useLogin()

    return (
        <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit(onLogin)}>
            <div className="flex flex-col gap-4">
                <Input
                    type="email"
                    placeholder="exemplo@email.com"
                    label="Email"
                    control={control}
                    name="email"
                />
                <Input
                    type="password"
                    placeholder="**********"
                    label="Senha"
                    control={control}
                    name="password"
                />
            </div>

            <Button
                type="submit"
                variant={"highlight"}
                disabled={isSubmitting}
                isLoading={isSubmitting}
                leftIcon={<LogInIcon className="size-4" />}
            >
                Entrar
            </Button>

            <Link to="/register" className="text-sm text-content-muted text-center">
              Não possui uma conta? <span className="text-content-accent hover:underline ">Cadastre-se</span>
            </Link>
        </form>
    )
}