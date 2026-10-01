import type { ReactNode } from "react";

type AuthShellProps = {
    children: ReactNode;
};

export function AuthShell({ children }: AuthShellProps) {
    return (
        <div className="h-dvh overflow-y-auto">
            <div className="flex min-h-full items-center justify-center bg-linear-to-t from-background-base to-background-elevated px-6 sm:p-0">
                {children}
            </div>
        </div>
    );
}
