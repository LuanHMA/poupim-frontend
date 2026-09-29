import { NewTransactionDrawer } from "@/modules/transactions/components/new-transaction-drawer";
import { BottomNavigation } from "@/shared/components/layout/bottom-navigation";
import { Sidebar } from "@/shared/components/layout/sidebar";
import { Outlet } from "react-router-dom";

export function PrivateLayout() {
    return (
        <div className="min-h-screen w-full relative">
            <Sidebar />
            <div className="pt-4 px-4 pb-40 sm:ml-64 sm:px-8 sm:pt-8 sm:pb-10">
                <Outlet />
            </div>
            <BottomNavigation />
            <NewTransactionDrawer />
        </div>
    );
}
