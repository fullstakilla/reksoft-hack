import { createAsyncThunk } from "@reduxjs/toolkit";
import { JwtPayload } from "./types";
import { jwtDecode } from "jwt-decode";
import { AuthService, LoginRequest } from "@/entities/session";

export const login = createAsyncThunk(
    'auth/login',
    async (credentials: LoginRequest) => {
        const response = await AuthService.login(credentials)

        const accessToken = response.data.token;
        localStorage.setItem('access_token', accessToken);

        const decodedToken = jwtDecode<JwtPayload>(accessToken);
        const userId = decodedToken.user_id;

        return { userId };
    }
);