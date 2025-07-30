
import { ApiError, apiRequest } from '../apiClient';

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  status?: string;
  [key: string]: any;
}

// Generic CRUD operations template
export class BaseApiService<T, CreateT = Partial<T>, UpdateT = Partial<T>> {
  constructor(protected baseUrl: string) {}

  async getAll(params?: QueryParams): Promise<PaginatedResponse<T>> {
    const queryString = params ? new URLSearchParams(params as any).toString() : '';
    const url = queryString ? `${this.baseUrl}?${queryString}` : this.baseUrl;
    return apiRequest<PaginatedResponse<T>>(url, 'GET');
  }

  async getById(id: string): Promise<ApiResponse<T>> {
    return apiRequest<ApiResponse<T>>(`${this.baseUrl}/${id}`, 'GET');
  }

  async create(data: CreateT): Promise<ApiResponse<T>> {
    return apiRequest<ApiResponse<T>>(this.baseUrl, 'POST', data);
  }

  async update(id: string, data: UpdateT): Promise<ApiResponse<T>> {
    return apiRequest<ApiResponse<T>>(`${this.baseUrl}/${id}`, 'PUT', data);
  }

  async delete(id: string): Promise<ApiResponse<void>> {
    return apiRequest<ApiResponse<void>>(`${this.baseUrl}/${id}`, 'DELETE');
  }

  async patch(id: string, data: Partial<T>): Promise<ApiResponse<T>> {
    return apiRequest<ApiResponse<T>>(`${this.baseUrl}/${id}`, 'PATCH', data);
  }
}

// Error handling utility
export const handleApiError = (error: any): string => {
  if (error instanceof ApiError) {
    return error.message;
  }
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  return error.message || 'Une erreur inattendue s\'est produite';
};

// Request interceptor template
export const createAuthenticatedRequest = (token: string) => {
  return {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };
};
