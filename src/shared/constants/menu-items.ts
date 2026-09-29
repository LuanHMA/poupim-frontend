import { BarChartIcon, HomeIcon, ListIcon, UserIcon } from "lucide-react";

export const menuItems = [
    { Icon: HomeIcon, href: "/dashboard", label: "Dashboard", value: "dashboard" },
    { Icon: ListIcon, href: "/transactions", label: "Transações", value: "transactions" },
    { Icon: BarChartIcon, href: "/statistics", label: "Estatísticas", value: "statistics" },
    { Icon: UserIcon, href: "/profile", label: "Perfil", value: "profile" },

] as const;