import { menuItems } from "@/shared/constants/menu-items";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export function BottomNavigation() {
    const { pathname } = useLocation();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const isActive = (href: string) => pathname === href;

    const onChangePage = (href: string) => {
        const month = searchParams.get("month");
        const year = searchParams.get("year");

        if (month && year) {
            const nextParams = new URLSearchParams(searchParams);
            nextParams.set("month", String(month));
            nextParams.set("year", String(year));
            navigate(`${href}?${nextParams.toString()}`);
        } else {
            navigate(href);
        }
    }

    return (
        <div className="sm:hidden fixed bottom-0 left-0 right-0 h-20 bg-background-elevated grid place-items-center border-t border-t-brd-default">
            <div className="flex items-center justify-between w-full px-6">
                {menuItems.map(({ Icon, href, label, value }) => (
                    <button onClick={() => onChangePage(href)} key={value} className="flex flex-col items-center justify-center gap-1 relative cursor-pointer group">
                        <span className={`absolute -bottom-5 left-1/2 -translate-x-1/2 w-1/2 h-10 blur-2xl bg-content-accent/40 rounded-full group-hover:opacity-100 group-hover:duration-300 group-hover:scale-105 transition-all duration-300 group-hover:blur-3xl ${isActive(href) ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}></span>
                        <Icon className={`size-6 group-hover:scale-110 group-hover:text-content-accent transition-all duration-300 ${isActive(href) ? 'text-content-accent' : 'text-content-muted'}`} />
                        <span className={`text-[11px] uppercase font-medium group-hover:text-content-accent transition-colors duration-300 ${isActive(href) ? 'text-content-accent' : 'text-content-muted'} `}>{label}</span>
                    </button>
                ))}

            </div>
        </div>
    )
}