import { SessionProvider } from "@/modules/auth/context/session-context";
import { QueryProvider } from "./query-provider";
import { ToastifyProvider } from "./toastify-provider";

export function PublicProviders({ children }: { children: React.ReactNode }) {
    return (
        <QueryProvider>
            <SessionProvider>
                <ToastifyProvider />
                {children}
            </SessionProvider>
        </QueryProvider>
    )
}
