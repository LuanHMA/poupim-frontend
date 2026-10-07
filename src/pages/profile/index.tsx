import { LogoutButton } from "@/modules/profile/components/logout-button"
import { ProfileAccount } from "@/modules/profile/components/profile-account"
import { ProfileSummary } from "@/modules/profile/components/profile-summary"

export function ProfilePage() {
    return (
        <main className="mx-auto w-full max-w-lg space-y-6">
            <h1 className="text-2xl font-semibold text-content-primary">Perfil</h1>
            <ProfileSummary />
            <ProfileAccount />
            <LogoutButton />
        </main>
    )
}
