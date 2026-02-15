import axios from 'axios';
import { Alert } from 'react-native';

import { getToken } from '@/lib/token';

export const client = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BACKEND_URL,
});

client.interceptors.request.use(async (config) => {
  const token = await getToken();
  const headers = {
    ...(config.headers ?? {}),
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  config.headers = headers;
  return config;
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiMessage = error?.response?.data?.message;
    Alert.alert('Erro', apiMessage || 'Ocorreu um erro inesperado. Tenta novamente.');
    return Promise.reject(error);
  },
);
