import $api from "@/shared/http";
import { AxiosResponse } from "axios";
import { LoginRequest, AuthResponse, RegisterRequest } from "./types";

export default class AuthService {
    static async login(credentials: LoginRequest): Promise<AxiosResponse<AuthResponse>> {
        return $api.post('auth/login', credentials);
    }

    static async registration(credentials: RegisterRequest): Promise<AxiosResponse<AuthResponse>> {
        return $api.post('auth/register', credentials);
    }

    static async info(): Promise<AxiosResponse> {
        return $api.get('auth/info');
    }
}