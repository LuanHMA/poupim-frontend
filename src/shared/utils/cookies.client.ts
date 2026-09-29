import Cookies from "js-cookie";
import { DEFAULT_COOKIE_OPTIONS, type CookieOptions } from "@/shared/utils/cookies";

function toClientOptions(options?: CookieOptions): Cookies.CookieAttributes {
    const merged = { ...DEFAULT_COOKIE_OPTIONS, ...options };

    return {
        path: merged.path,
        domain: merged.domain,
        secure: merged.secure,
        sameSite: merged.sameSite,
        expires: merged.expires ?? (merged.maxAge != null ? merged.maxAge / 86400 : undefined),
    };
}

export function getCookie(name: string) {
    return Cookies.get(name);
}

export function setCookie(name: string, value: string, options?: CookieOptions) {
    Cookies.set(name, value, toClientOptions(options));
}

export function removeCookie(name: string, options?: CookieOptions) {
    Cookies.remove(name, toClientOptions(options));
}
