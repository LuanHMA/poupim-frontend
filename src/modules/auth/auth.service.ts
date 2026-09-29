import { api } from "@/shared/api";
import { setAuthToken } from "@/shared/utils/auth-token.client";
import type { GetUserOutput, LoginInput, LoginOutput, RegisterInput, RegisterOutput } from "./types/auth";

export class AuthService {
    static async login(data: LoginInput) {
        const response = await api.post<LoginOutput>("/auth/login", data);

        if (response.success) {
            setAuthToken(response.accessToken);
        }

        return response;
    }

    static async register(data: RegisterInput): Promise<LoginOutput | null> {
            const response = await api.post<RegisterOutput>("/auth/register", data);

        if (response.success) {
            const loginResponse = await this.login({
                email: data.email,
                password: data.password,
            })

            return loginResponse;
        }

        return null
    }

    static async getMe() {
        return api.get<GetUserOutput>("/auth/me");
    }
}
