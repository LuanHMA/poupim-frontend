import type {
    ApiRequestConfig,
    ApiRequestOptions,
    HttpMethod,
    QueryParams,
} from "@/shared/types/api";
import { getAuthToken } from "@/shared/utils/auth-token.client";

export type { ApiRequestOptions, QueryParams } from "@/shared/types/api";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "";

export type GetAuthToken = () => Promise<string | undefined> | string | undefined;

export class ApiError extends Error {
    readonly status: number;
    readonly data: unknown;

    constructor(message: string, status: number, data: unknown) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.data = data;
    }
}

function buildUrl(endpoint: string, params?: QueryParams) {
    const url = `${API_BASE_URL.replace(/\/+$/, "")}/${endpoint.replace(/^\/+/, "")}`;

    if (!params) {
        return url;
    }

    const search = new URLSearchParams();

    for (const [key, value] of Object.entries(params)) {
        if (value != null) {
            search.set(key, String(value));
        }
    }

    const query = search.toString();
    return query ? `${url}?${query}` : url;
}

export function createApi(getAuthToken: GetAuthToken) {
    async function request<T>(
        method: HttpMethod,
        endpoint: string,
        { params, body, headers, signal, cache = "no-store" }: ApiRequestConfig = {},
    ): Promise<T> {
        const token = await getAuthToken();
        const requestHeaders = new Headers(headers);

        if (token) {
            requestHeaders.set("Authorization", `Bearer ${token}`);
        }

        let payload: BodyInit | undefined;

        if (body instanceof FormData) {
            payload = body;
        } else if (body != null) {
            payload = JSON.stringify(body);
            requestHeaders.set("Content-Type", "application/json");
        }

        const response = await fetch(buildUrl(endpoint, params), {
            method,
            headers: requestHeaders,
            body: payload,
            signal,
            cache,
        });

        const text = await response.text();
        const data = text ? JSON.parse(text) : undefined;

        if (!response.ok) {
            throw new ApiError(
                data?.message ?? `Request failed with status ${response.status}`,
                response.status,
                data,
            );
        }

        return data as T;
    }

    return {
        get<T>(endpoint: string, options?: ApiRequestOptions) {
            return request<T>("GET", endpoint, options);
        },
        post<T>(endpoint: string, body?: unknown, options?: ApiRequestOptions) {
            return request<T>("POST", endpoint, { ...options, body });
        },
        put<T>(endpoint: string, body?: unknown, options?: ApiRequestOptions) {
            return request<T>("PUT", endpoint, { ...options, body });
        },
        patch<T>(endpoint: string, body?: unknown, options?: ApiRequestOptions) {
            return request<T>("PATCH", endpoint, { ...options, body });
        },
        delete<T>(endpoint: string, options?: ApiRequestOptions) {
            return request<T>("DELETE", endpoint, options);
        },
    };
}

export type ApiClient = ReturnType<typeof createApi>;

export const api = createApi(getAuthToken);
