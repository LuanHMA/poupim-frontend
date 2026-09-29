/* eslint-disable react-refresh/only-export-components */
import { getAuthToken, removeAuthToken } from "@/shared/utils/auth-token.client"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { createContext, useCallback, useContext, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { AuthService } from "../auth.service"
import type { GetUserOutput, User } from "../types/auth"

const SESSION_QUERY_KEY = ["session"] as const

export type SessionContextType = {
    user: User | null
    isAuthenticated: boolean
    setSession: (session: User) => void
    isLoading: boolean,
    logout: () => Promise<void>
}

export const SessionContext = createContext<SessionContextType | null>(null)

export function SessionProvider({ children }: { children: React.ReactNode }) {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const isAuthPage = pathname === "/" || pathname === "/login" || pathname === "/register"
    const shouldLoadSession = Boolean(getAuthToken()) && !isAuthPage

    const { data, isLoading, isError } = useQuery({
        queryKey: SESSION_QUERY_KEY,
        queryFn: AuthService.getMe,
        enabled: shouldLoadSession,
        retry: false,
    });

    const user = data?.success ? data.user : null

    const setSession = useCallback((nextUser: User) => {
        queryClient.setQueryData<GetUserOutput>(SESSION_QUERY_KEY, {
            success: true,
            message: "",
            user: nextUser,
        })
    }, [queryClient])

    const logout = useCallback(async () => {
        removeAuthToken()
        queryClient.removeQueries({ queryKey: SESSION_QUERY_KEY })
        navigate("/login")
    }, [navigate, queryClient])

    useEffect(() => {
        if (!isError) return
        logout()
    }, [isError, logout])

    return (
        <SessionContext.Provider value={{
            user,
            isAuthenticated: Boolean(user),
            setSession,
            isLoading,
            logout
        }}>
            {children}
        </SessionContext.Provider>
    )
}

export function useSession() {
    const context = useContext(SessionContext)
    if (!context) {
        throw new Error("useSession must be used within a SessionProvider")
    }
    return context
}
