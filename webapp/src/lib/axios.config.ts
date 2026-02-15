import axios from "axios";
import { message } from "antd";

export const client = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
})

const mergeCommonHeaders = (config: any) => {
    const token = localStorage.getItem('token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    config.headers = {
        ...(config.headers || {}),
        ...headers,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    };
    return config;
};

client.interceptors.request.use(mergeCommonHeaders);

client.interceptors.response.use(
    (response) => response,
    (error) => {
        const apiMessage = error?.response?.data?.message;
        message.error(apiMessage || 'Ocorreu um erro inesperado. Tenta novamente.');
        return Promise.reject(error);
    }
);
