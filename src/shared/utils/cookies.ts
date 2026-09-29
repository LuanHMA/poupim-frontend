export const AUTH_COOKIE_NAME = "accessToken";

export const DEFAULT_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export type CookieOptions = {
    path?: string;
    maxAge?: number;
    expires?: Date;
    secure?: boolean;
    sameSite?: "lax" | "strict" | "none";
    domain?: string;
};

export const DEFAULT_COOKIE_OPTIONS: CookieOptions = {
    path: "/",
    maxAge: DEFAULT_COOKIE_MAX_AGE,
    sameSite: "lax",
    secure: import.meta.env.PROD,
};
