export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type QueryParams = Record<string, string | number | boolean | null | undefined>;

export type ApiRequestOptions = {
    params?: QueryParams;
    headers?: HeadersInit;
    signal?: AbortSignal;
    cache?: RequestCache;
};

export type ApiRequestConfig = ApiRequestOptions & {
    body?: unknown;
};
