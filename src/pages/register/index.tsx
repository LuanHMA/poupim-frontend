import { RegisterForm } from "@/modules/auth/components/register-form";

export function RegisterPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-t from-background-base to-background-elevated sm:items-center px-6 sm:p-0">
            <main className="flex flex-col item-start gap-10 w-full max-w-md sm:border sm:rounded-xl sm:p-10 sm:min-h-110 sm:border-brd-default sm:justify-center sm:relative sm:z-20 sm:overflow-hidden sm:gap-8">
                <div className="hidden sm:block absolute -left-5 top-1/2 h-20 w-20 blur-[80px] -z-1 bg-background-accent/50" />
                <div className="hidden sm:block absolute top-0 left-0 h-16 w-16 blur-[100px] -z-1 bg-background-inverse" />
                <div className="hidden sm:block absolute h-16 w-16 top-0 right-0 blur-[100px] -z-1 bg-background-inverse" />

                <div className="flex flex-col items-start gap-1 z-10">
                    <h1 className="text-3xl font-semibold text-content-primary">Criar conta</h1>
                    <p className="text-content-muted text-sm">Preencha o formulário para continuar</p>
                </div>

                <RegisterForm />
            </main>
        </div>
    )
}
