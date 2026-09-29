import { menuItems } from "@/shared/constants/menu-items";
import { Link, useLocation } from "react-router-dom";

export function BottomNavigation() {
    const { pathname } = useLocation();

    const isActive = (href: string) => pathname === href;

    return (
        <div className="sm:hidden fixed bottom-0 left-0 right-0 h-20 bg-background-elevated grid place-items-center border-t border-t-brd-default">
            <div className="flex items-center justify-between w-full px-6">
                {menuItems.map(({ Icon, href, label, value }) => (
                    <Link to={href} key={value} className="flex flex-col items-center justify-center gap-1 relative">
                        <span className={`absolute -bottom-5 left-1/2 -translate-x-1/2 w-1/2 h-10 blur-2xl bg-content-accent/40 rounded-full ${isActive(href) ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}></span>
                        <Icon className={` ${isActive(href) ? 'text-content-accent' : 'text-content-muted'}`} />
                        <span className={`text-[11px] uppercase font-medium ${isActive(href) ? 'text-content-accent' : 'text-content-muted'} `}>{label}</span>
                    </Link>
                ))}

            </div>
        </div>
    )
}