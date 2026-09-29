import { AUTH_COOKIE_NAME } from "@/shared/utils/cookies";
import { getCookie, removeCookie, setCookie } from "@/shared/utils/cookies.client";

export function getAuthToken() {
    return getCookie(AUTH_COOKIE_NAME);
}

export function setAuthToken(token: string) {
    setCookie(AUTH_COOKIE_NAME, token);
}

export function removeAuthToken() {
    removeCookie(AUTH_COOKIE_NAME);
}
