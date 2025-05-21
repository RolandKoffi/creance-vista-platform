
import { apiPost, apiGet } from './apiClient';
import { API_URLS } from './config';
import { User } from '@/types';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'pme' | 'investor';
}

export interface AuthResponse {
  user: User;
  token: string;
}

export const login = async (credentials: LoginRequest): Promise<AuthResponse> => {
  const response = await apiPost<AuthResponse>(API_URLS.LOGIN, credentials);
  
  // Store auth token
  if (response.token) {
    localStorage.setItem('authToken', response.token);
  }
  
  return response;
};

export const register = async (userData: RegisterRequest): Promise<AuthResponse> => {
  const response = await apiPost<AuthResponse>(API_URLS.REGISTER, userData);
  
  // Store auth token
  if (response.token) {
    localStorage.setItem('authToken', response.token);
  }
  
  return response;
};

export const logout = async (): Promise<void> => {
  await apiGet(API_URLS.LOGOUT);
  localStorage.removeItem('authToken');
};

export const getCurrentUser = async (): Promise<User> => {
  return await apiGet<User>(API_URLS.USER_PROFILE);
};
