import axios from 'axios';

export const API_URL = `http://91.224.87.67/api/v1`

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
    return config;
})

export default $api;