import { Button, Input } from "@/shared/components/ui";
import { Link } from "react-router-dom";
import { useRegister } from "../hooks/use-register";

export function RegisterForm() {
    const { onRegister, control, isSubmitting, handleSubmit } = useRegister()

    return (
        <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit(onRegister)}>
            <div className="flex flex-col gap-4">
                <Input
                    type="name"
                    placeholder="John Doe"
                    label="Nome"
                    control={control}
                    name="name"
                />
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
                <Input
                    type="password"
                    placeholder="**********"
                    label="Confirmar senha"
                    control={control}
                    name="confirmPassword"
                />
            </div>

            <Button
                type="submit"
                variant={"highlight"}
                disabled={isSubmitting}
                isLoading={isSubmitting}
            >
                Criar conta
            </Button>

            <Link to="/login" className="text-sm text-content-muted text-center">
                Já possui uma conta? <span className="text-content-accent hover:underline">Faça login</span>
            </Link>
        </form>
    )
}