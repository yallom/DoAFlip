import { client } from '@/lib/axios.config'

export interface LoginPayload {
    email: string;
    password: string;
}

export type AuthGender = 'Masculine' | 'Feminine';

export type AuthGoal = 'weight_loss' | 'muscle_gain' | 'maintenance';

export interface RegisterPayload {
    email: string;
    password: string;
    name: string;
    age: number;
    height: number;
    weight: number;
    gender: AuthGender;
    goal: AuthGoal;
}

type AuthApiResponse = {
    data?: {
        token?: string;
    };
    token?: string;
};

const getTokenFromResponse = (responseData: AuthApiResponse): string | undefined => {
    return responseData?.data?.token ?? responseData?.token;
};

export const loginRequest = async (payload: LoginPayload): Promise<string | undefined> => {
    const response = await client.post<AuthApiResponse>('/api/auth/login', payload);
    return getTokenFromResponse(response.data);
};

export const logoutRequest = async () => {
    return client.post('/api/auth/logout');
};

export const registerRequest = async (payload: RegisterPayload): Promise<string | undefined> => {
    const response = await client.post<AuthApiResponse>('/api/auth/register', payload);
    return getTokenFromResponse(response.data);
};
