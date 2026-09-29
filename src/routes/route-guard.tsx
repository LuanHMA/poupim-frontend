import { getAuthToken } from "@/shared/utils/auth-token.client";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AUTH_ROUTES = ["/login", "/register"];

function isAuthRoute(pathname: string) {
    return AUTH_ROUTES.includes(pathname);
}

export function RouteGuard() {
    const token = getAuthToken();
    const { pathname } = useLocation();

    if (!token && !isAuthRoute(pathname)) {
        return <Navigate to="/login" replace />;
    }

    if (token && isAuthRoute(pathname)) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
}
