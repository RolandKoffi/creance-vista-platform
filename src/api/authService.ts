import { apiPost } from './apiClient';
import { API_URLS } from './config';
import { User } from '@/types';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  role: 'admin' | 'pme' | 'investisseur';
}

export interface FinalisationData {
  // PME data
  nom_entreprise?: string;
  secteur_activite?: string;
  telephone?: string;
  adresse?: string;
  pays?: string;
  compte_bancaire?: string;
  
  // Investisseur data
  nom_complet?: string;
  genre?: string;
  ville?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await apiPost<AuthResponse>(API_URLS.LOGIN, credentials);
  
  if (response.token) {
    localStorage.setItem('auth_token', response.token);
  }
  
  return response;
};

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await apiPost<AuthResponse>(API_URLS.REGISTER, data);
  
  if (response.token) {
    localStorage.setItem('auth_token', response.token);
  }
  
  return response;
};

export const finaliserInscription = async (data: FinalisationData): Promise<AuthResponse> => {
  const response = await apiPost<AuthResponse>(API_URLS.FINALISER, data);
  return response;
};

export const logout = async (): Promise<void> => {
  localStorage.removeItem('auth_token');
  window.location.href = '/login';
};

export const getCurrentUser = async (): Promise<User> => {
  const token = localStorage.getItem('auth_token');
  if (!token) {
    throw new Error('No authentication token found');
  }
  
  // For now, decode user info from token or make a profile request
  // This depends on your backend implementation
  throw new Error('getCurrentUser not implemented');
};