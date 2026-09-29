import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardPage } from "@/pages/dashboard";
import { LoginPage } from "@/pages/login";
import { ProfilePage } from "@/pages/profile";
import { RegisterPage } from "@/pages/register";
import { StatisticsPage } from "@/pages/statistics";
import { TransactionsPage } from "@/pages/transactions";
import { PrivateLayout } from "@/routes/private-layout";
import { RouteGuard } from "@/routes/route-guard";

export function AppRoutes() {
    return (
        <Routes>
            <Route element={<RouteGuard />}>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route element={<PrivateLayout />}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/transactions" element={<TransactionsPage />} />
                    <Route path="/statistics" element={<StatisticsPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                </Route>

                <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Route>
        </Routes>
    );
}
