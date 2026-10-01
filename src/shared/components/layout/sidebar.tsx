import { useSession } from "@/modules/auth/context/session-context";
import { PoupimLogo } from "@/shared/components/brand/poupim-logo";
import { Button } from "@/shared/components/ui";
import { menuItems } from "@/shared/constants/menu-items";
import { cn } from "@/shared/utils/cn";
import { LogOutIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function Sidebar() {
    const { pathname } = useLocation();
    const { logout } = useSession();

    const isActive = (href: string) => pathname === href;

    return (
        <aside className="hidden sm:flex fixed inset-y-0 left-0 z-40 w-64 flex-col border-r border-brd-default bg-background-elevated px-4 pt-6 pb-4">
            <Link to="/dashboard" className="mb-8 flex px-3">
                <PoupimLogo />
            </Link>

            <nav className="flex flex-1 flex-col gap-1">
                {menuItems.map(({ Icon, href, label, value }) => {
                    const active = isActive(href);

                    return (
                        <Link
                            key={value}
                            to={href}
                            className={cn(
                                "relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                                active
                                    ? "bg-background-base text-content-accent"
                                    : "text-content-muted hover:bg-background-base hover:text-content-primary",
                            )}
                        >
                            <span
                                className={cn(
                                    "absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-full bg-content-accent transition-opacity",
                                    active ? "opacity-100" : "opacity-0",
                                )}
                            />
                            <Icon className="size-5" />
                            <span>{label}</span>
                        </Link>
                    );
                })}
            </nav>

            <Button
                variant="outline"
                className="mt-4 w-full justify-start"
                leftIcon={<LogOutIcon />}
                onClick={() => void logout()}
            >
                Deslogar
            </Button>
        </aside>
    );
}
