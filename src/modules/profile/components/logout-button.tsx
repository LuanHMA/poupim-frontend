import { useSession } from "@/modules/auth/context/session-context"
import { Button } from "@/shared/components/ui"
import { LogOutIcon } from "lucide-react"

export function LogoutButton() {
    const { logout } = useSession()

    return (
        <Button
            variant="outline"
            size="full"
            leftIcon={<LogOutIcon />}
            onClick={() => void logout()}
        >
            Deslogar
        </Button>
    )
}
