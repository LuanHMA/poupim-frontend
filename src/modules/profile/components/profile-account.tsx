import { useSession } from "@/modules/auth/context/session-context"
import { Skeleton } from "@/shared/components/ui"
import { formatations } from "@/shared/utils/formatations"

export function ProfileAccount() {
    const { user, isLoading } = useSession()

    if (isLoading || !user) {
        return (
            <section aria-busy="true" aria-label="Carregando dados da conta" className="rounded-2xl bg-background-surface">
                {Array.from({ length: 3 }, (_, index) => (
                    <div key={index} className="flex flex-col gap-2 px-4 py-3">
                        <Skeleton className="h-3 w-16" />
                        <Skeleton className="h-4 w-40" />
                    </div>
                ))}
            </section>
        )
    }

    const fields = [
        { label: "Nome", value: user.name },
        { label: "Email", value: user.email },
        { label: "Conta criada em", value: formatations.date(user.createdAt) },
    ]

    return (
        <section className="rounded-xl">
            <dl className="flex flex-col gap-4">
                {fields.map(({ label, value }) => (
                    <div key={label} className="flex flex-col gap-1 rounded-xl p-4  bg-background-surface">
                        <dt className="text-sm text-content-muted">{label}</dt>
                        <dd className="text-base font-medium break-all text-content-primary">{value}</dd>
                    </div>
                ))}
            </dl>
        </section>
    )
}
