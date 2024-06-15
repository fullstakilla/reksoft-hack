import $api from "@/shared/http";
import { AxiosResponse } from "axios";
import { Vacancy } from "./types";

export default class VacanciesService {
    static async getVacancies(): Promise<AxiosResponse<Vacancy[]>> {
        return $api.get('/vacancy/all')
    }
    static async createVacancy(credentials: Vacancy): Promise<AxiosResponse> {
        return $api.post('/vacancy/create', credentials)
    }
    static async respondVacancy(userId: number | undefined, vacancyId: number): Promise<AxiosResponse> {
        const credentials = {
            user_id: userId,
            vacancy_id: vacancyId
        }
        return $api.post('/vacancy/respond', credentials)
    }
    static async getUserVacancies(userId: number | undefined): Promise<AxiosResponse> {
        return $api.get(`/vacancy/responses/user/${userId}`)
    }
}