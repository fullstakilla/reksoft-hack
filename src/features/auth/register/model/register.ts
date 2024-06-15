import { createAsyncThunk } from "@reduxjs/toolkit";
import { JwtPayload } from "./types";
import { jwtDecode } from "jwt-decode";
import { AuthService, RegisterRequest } from "@/entities/session";

export const registration = createAsyncThunk(
    'auth/register',
    async (credentials: RegisterRequest) => {
        const {roleId} = credentials
        const response = await AuthService.registration(credentials)

        const accessToken = response.data.token;
        localStorage.setItem('access_token', accessToken);

        const decodedToken = jwtDecode<JwtPayload>(accessToken);
        const userId = decodedToken.user_id;

        return { userId, roleId };
    }
);