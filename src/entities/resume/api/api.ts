import $api from "@/shared/http";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { Resume } from "./types";
// import { LoginRequest, AuthResponse, RegisterRequest } from "./types";

export default class ResumeService {
    static async createResume(credentials: Resume): Promise<AxiosResponse> {
        return $api.post('/resume', credentials);
    }

    static async createFileResume(userId: number | undefined, resumeFile: FormData): Promise<AxiosResponse> {
        const resume = resumeFile
        return $api.post(`/resume/file/${userId}`, resume, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    static async getResume(userId: number | undefined): Promise<AxiosResponse> {
        return $api.get(`/resume/${userId}`);
    }

    static async getFileResume(userId: number | undefined, config?: AxiosRequestConfig): Promise<AxiosResponse> {
        return $api.get(`/resume/file/${userId}`, config);
    }
    
}