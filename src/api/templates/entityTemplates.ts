
import { BaseApiService, ApiResponse } from './baseTemplate';
import { PME, Investor, Claim, Investment, Transaction, Notification } from '@/types';
import { API_URLS } from '../config';

// PME Service Template
export class PMEService extends BaseApiService<PME> {
  constructor() {
    super(API_URLS.PMES);
  }

  async verify(id: string): Promise<ApiResponse<PME>> {
    return this.patch(id, { status: 'verified' } as any);
  }

  async reject(id: string, reason?: string): Promise<ApiResponse<PME>> {
    return this.patch(id, { status: 'rejected', rejectionReason: reason } as any);
  }

  async suspend(id: string, reason?: string): Promise<ApiResponse<PME>> {
    return this.patch(id, { status: 'suspended', suspensionReason: reason } as any);
  }

  async getByUserId(userId: string): Promise<ApiResponse<PME>> {
    return this.apiRequest(`${this.baseUrl}/user/${userId}`, 'GET');
  }

  private apiRequest = async <T>(url: string, method: string, data?: any): Promise<T> => {
    const { apiRequest } = await import('../apiClient');
    return apiRequest<T>(url, method, data);
  };
}

// Investor Service Template
export class InvestorService extends BaseApiService<Investor> {
  constructor() {
    super(API_URLS.INVESTORS);
  }

  async verify(id: string): Promise<ApiResponse<Investor>> {
    return this.patch(id, { status: 'verified' } as any);
  }

  async reject(id: string, reason?: string): Promise<ApiResponse<Investor>> {
    return this.patch(id, { status: 'rejected', rejectionReason: reason } as any);
  }

  async getByUserId(userId: string): Promise<ApiResponse<Investor>> {
    return this.apiRequest(`${this.baseUrl}/user/${userId}`, 'GET');
  }

  async getInvestments(id: string): Promise<ApiResponse<Investment[]>> {
    return this.apiRequest(`${this.baseUrl}/${id}/investments`, 'GET');
  }

  private apiRequest = async <T>(url: string, method: string, data?: any): Promise<T> => {
    const { apiRequest } = await import('../apiClient');
    return apiRequest<T>(url, method, data);
  };
}

// Claim Service Template
export class ClaimService extends BaseApiService<Claim> {
  constructor() {
    super(API_URLS.CLAIMS);
  }

  async approve(id: string): Promise<ApiResponse<Claim>> {
    return this.patch(id, { status: 'approved' } as any);
  }

  async reject(id: string, reason?: string): Promise<ApiResponse<Claim>> {
    return this.patch(id, { status: 'rejected', rejectionReason: reason } as any);
  }

  async getByPME(pmeId: string): Promise<ApiResponse<Claim[]>> {
    return this.apiRequest(`${this.baseUrl}/pme/${pmeId}`, 'GET');
  }

  async getAvailableForInvestment(): Promise<ApiResponse<Claim[]>> {
    return this.apiRequest(`${this.baseUrl}/available`, 'GET');
  }

  private apiRequest = async <T>(url: string, method: string, data?: any): Promise<T> => {
    const { apiRequest } = await import('../apiClient');
    return apiRequest<T>(url, method, data);
  };
}

// Investment Service Template
export class InvestmentService extends BaseApiService<Investment> {
  constructor() {
    super(API_URLS.INVESTMENTS);
  }

  async getByInvestor(investorId: string): Promise<ApiResponse<Investment[]>> {
    return this.apiRequest(`${this.baseUrl}/investor/${investorId}`, 'GET');
  }

  async getByClaim(claimId: string): Promise<ApiResponse<Investment[]>> {
    return this.apiRequest(`${this.baseUrl}/claim/${claimId}`, 'GET');
  }

  async confirm(id: string): Promise<ApiResponse<Investment>> {
    return this.patch(id, { status: 'confirmed' } as any);
  }

  private apiRequest = async <T>(url: string, method: string, data?: any): Promise<T> => {
    const { apiRequest } = await import('../apiClient');
    return apiRequest<T>(url, method, data);
  };
}

// Transaction Service Template
export class TransactionService extends BaseApiService<Transaction> {
  constructor() {
    super(API_URLS.TRANSACTIONS);
  }

  async getByUser(userId: string): Promise<ApiResponse<Transaction[]>> {
    return this.apiRequest(`${this.baseUrl}/user/${userId}`, 'GET');
  }

  async getByType(type: string): Promise<ApiResponse<Transaction[]>> {
    return this.apiRequest(`${this.baseUrl}/type/${type}`, 'GET');
  }

  private apiRequest = async <T>(url: string, method: string, data?: any): Promise<T> => {
    const { apiRequest } = await import('../apiClient');
    return apiRequest<T>(url, method, data);
  };
}

// Notification Service Template
export class NotificationService extends BaseApiService<Notification> {
  constructor() {
    super(API_URLS.NOTIFICATIONS);
  }

  async markAsRead(id: string): Promise<ApiResponse<Notification>> {
    return this.patch(id, { read: true } as any);
  }

  async markAllAsRead(userId: string): Promise<ApiResponse<void>> {
    return this.apiRequest(`${this.baseUrl}/user/${userId}/mark-all-read`, 'POST');
  }

  async getByUser(userId: string): Promise<ApiResponse<Notification[]>> {
    return this.apiRequest(`${this.baseUrl}/user/${userId}`, 'GET');
  }

  private apiRequest = async <T>(url: string, method: string, data?: any): Promise<T> => {
    const { apiRequest } = await import('../apiClient');
    return apiRequest<T>(url, method, data);
  };
}
