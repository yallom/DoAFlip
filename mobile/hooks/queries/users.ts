import { client } from '@/lib/api';

export interface User {
  id: string;
  email: string;
  name: string;
  age: number;
  height: number;
  weight: number;
  gender: 'Masculine' | 'Feminine';
  goal: 'weight_loss' | 'muscle_gain' | 'maintenance';
  created_at: string;
  updated_at: string;
}

interface MeApiResponse {
  success: boolean;
  data: User;
}

export const getMeRequest = async (): Promise<User> => {
  const response = await client.get<MeApiResponse>('/api/users/me');
  return response.data.data;
};
