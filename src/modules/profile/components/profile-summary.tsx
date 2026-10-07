import { useSession } from "@/modules/auth/context/session-context"
import { Skeleton } from "@/shared/components/ui"
import { getUserInitials } from "../utils/get-user-initials"

export function ProfileSummary() {
    const { user, isLoading } = useSession()

    if (isLoading || !user) {
        return (
            <section aria-busy="true" aria-label="Carregando perfil" className="flex items-center gap-4 rounded-2xl bg-background-surface p-4">
                <Skeleton className="size-14 rounded-full" />
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-5 w-36" />
                    <Skeleton className="h-4 w-48" />
                </div>
            </section>
        )
    }

    return (
        <section className="flex items-center gap-4 rounded-xl bg-background-surface p-4">
            <span className="grid size-14 shrink-0 place-items-center rounded-full bg-background-accent text-lg font-semibold text-content-inverse">
                {getUserInitials(user.name)}
            </span>
            <div className="min-w-0">
                <h2 className="truncate text-lg font-semibold text-content-primary">{user.name}</h2>
                <p className="truncate text-sm text-content-muted">{user.email}</p>
            </div>
        </section>
    )
}
