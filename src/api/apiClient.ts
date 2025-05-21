
import { DEFAULT_HEADERS, REQUEST_TIMEOUT } from './config';
import { toast } from "sonner";

// Error handling
export class ApiError extends Error {
  status: number;
  data: any;
  
  constructor(status: number, message: string, data?: any) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = 'ApiError';
  }
}

// Timeout promise
const timeoutPromise = (ms: number) => {
  return new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new ApiError(408, `Request timed out after ${ms}ms`));
    }, ms);
  });
};

// Get auth token from storage
const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

// Generate headers including auth token
const getHeaders = (customHeaders = {}): HeadersInit => {
  const token = getAuthToken();
  
  return {
    ...DEFAULT_HEADERS,
    ...(token && { Authorization: `Bearer ${token}` }),
    ...customHeaders,
  };
};

// Generic API request function
export const apiRequest = async<T>(
  url: string,
  method: string,
  body?: any,
  customHeaders: Record<string, string> = {}
): Promise<T> => {
  try {
    const fetchPromise = fetch(url, {
      method,
      headers: getHeaders(customHeaders),
      body: body ? JSON.stringify(body) : undefined,
      credentials: 'include', // Include cookies for potential session-based auth
    });
    
    // Race fetch with timeout
    const response = await Promise.race([
      fetchPromise,
      timeoutPromise(REQUEST_TIMEOUT)
    ]) as Response;

    const data = await response.json();

    // Handle errors based on HTTP status
    if (!response.ok) {
      throw new ApiError(
        response.status,
        data.message || `Request failed with status ${response.status}`,
        data
      );
    }

    return data as T;
  } catch (error) {
    // Handle ApiError that was explicitly thrown
    if (error instanceof ApiError) {
      // Handle specific status codes
      if (error.status === 401) {
        // Clear token and redirect to login if unauthorized
        localStorage.removeItem('authToken');
        window.location.href = '/auth/login';
      }
      
      toast.error(error.message || 'An error occurred');
      throw error;
    }
    
    // Handle other errors
    const message = (error as Error).message || 'Network error occurred';
    toast.error(message);
    throw new ApiError(500, message);
  }
};

// Convenience methods for common HTTP verbs
export const apiGet = <T>(url: string, headers?: Record<string, string>): Promise<T> => {
  return apiRequest<T>(url, 'GET', undefined, headers);
};

export const apiPost = <T>(url: string, body: any, headers?: Record<string, string>): Promise<T> => {
  return apiRequest<T>(url, 'POST', body, headers);
};

export const apiPut = <T>(url: string, body: any, headers?: Record<string, string>): Promise<T> => {
  return apiRequest<T>(url, 'PUT', body, headers);
};

export const apiPatch = <T>(url: string, body: any, headers?: Record<string, string>): Promise<T> => {
  return apiRequest<T>(url, 'PATCH', body, headers);
};

export const apiDelete = <T>(url: string, headers?: Record<string, string>): Promise<T> => {
  return apiRequest<T>(url, 'DELETE', undefined, headers);
};

// Upload file utility
export const uploadFile = async<T>(url: string, file: File, additionalData?: Record<string, any>): Promise<T> => {
  const token = getAuthToken();
  const formData = new FormData();
  
  formData.append('file', file);
  
  if (additionalData) {
    Object.entries(additionalData).forEach(([key, value]) => {
      formData.append(key, String(value));
    });
  }
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
      credentials: 'include',
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new ApiError(
        response.status,
        data.message || `File upload failed with status ${response.status}`,
        data
      );
    }
    
    return data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      toast.error(error.message || 'File upload failed');
      throw error;
    }
    
    const message = (error as Error).message || 'Network error during file upload';
    toast.error(message);
    throw new ApiError(500, message);
  }
};
