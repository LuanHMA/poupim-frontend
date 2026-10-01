import { AuthShell } from "@/modules/auth/components/auth-shell";
import { RegisterForm } from "@/modules/auth/components/register-form";
import { PoupimLogo } from "@/shared/components/brand/poupim-logo";

export function RegisterPage() {
    return (
        <AuthShell>
            <main className="flex w-full max-w-md flex-col gap-10 sm:relative sm:z-20 sm:min-h-110 sm:justify-center sm:gap-8 sm:overflow-hidden sm:rounded-xl sm:border sm:border-brd-default sm:p-10">
                <div className="hidden sm:block absolute -left-5 top-1/2 h-20 w-20 blur-[80px] -z-1 bg-background-accent/50" />
                <div className="hidden sm:block absolute top-0 left-0 h-16 w-16 blur-[100px] -z-1 bg-background-inverse" />
                <div className="hidden sm:block absolute h-16 w-16 top-0 right-0 blur-[100px] -z-1 bg-background-inverse" />

                <div className="flex flex-col items-start gap-1 z-10">
                    <PoupimLogo className="mb-6" />
                    <h1 className="text-3xl font-semibold text-content-primary">Criar conta</h1>
                    <p className="text-content-muted text-sm">Preencha o formulário para continuar</p>
                </div>

                <RegisterForm />
            </main>
        </AuthShell>
    )
}
