import $api from "@/shared/http";
import { AxiosResponse } from "axios";
import { News } from "./types";

export default class NewsService {
    static async getNews(): Promise<AxiosResponse<News[]>> {
        return $api.get('/news/all')
    }
}