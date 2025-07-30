
import { BaseApiService, ApiResponse } from './baseTemplate';
import { PME, Investisseur, Creance, AchatParts, LogUtilisateur, Notification } from '@/types';
import { API_URLS } from '../config';

// PME Service Template
export class PMEService extends BaseApiService<PME> {
  constructor() {
    super(API_URLS.ADMIN_PMES);
  }

  async verify(id: string): Promise<ApiResponse<PME>> {
    return this.apiRequest(API_URLS.ADMIN_PME_VALIDER(id), 'POST');
  }

  async reject(id: string, reason?: string): Promise<ApiResponse<PME>> {
    return this.apiRequest(API_URLS.ADMIN_PME_REJETER(id), 'POST', { raison: reason });
  }

  async suspend(id: string, reason?: string): Promise<ApiResponse<PME>> {
    return this.apiRequest(API_URLS.ADMIN_PME_SUSPENDRE(id), 'POST', { raison: reason });
  }

  async reactivate(id: string): Promise<ApiResponse<PME>> {
    return this.apiRequest(API_URLS.ADMIN_PME_REACTIVER(id), 'POST');
  }

  private apiRequest = async <T>(url: string, method: string, data?: any): Promise<T> => {
    const { apiRequest } = await import('../apiClient');
    return apiRequest<T>(url, method, data);
  };
}

// Investisseur Service Template
export class InvestisseurService extends BaseApiService<Investisseur> {
  constructor() {
    super(API_URLS.ADMIN_INVESTISSEURS);
  }

  async getHistorique(id: string): Promise<ApiResponse<LogUtilisateur[]>> {
    return this.apiRequest(API_URLS.ADMIN_INVESTISSEUR_HISTORIQUE(id), 'GET');
  }

  private apiRequest = async <T>(url: string, method: string, data?: any): Promise<T> => {
    const { apiRequest } = await import('../apiClient');
    return apiRequest<T>(url, method, data);
  };
}

// Creance Service Template
export class CreanceService extends BaseApiService<Creance> {
  constructor() {
    super(API_URLS.ADMIN_CREANCES);
  }

  async valider(id: string): Promise<ApiResponse<Creance>> {
    return this.apiRequest(API_URLS.ADMIN_CREANCE_VALIDER(id), 'POST');
  }

  async rejeter(id: string, reason?: string): Promise<ApiResponse<Creance>> {
    return this.apiRequest(API_URLS.ADMIN_CREANCE_REJETER(id), 'POST', { raison: reason });
  }

  async annuler(id: string): Promise<ApiResponse<Creance>> {
    return this.apiRequest(API_URLS.ADMIN_CREANCE_ANNULER(id), 'POST');
  }

  async debloquer(id: string): Promise<ApiResponse<Creance>> {
    return this.apiRequest(API_URLS.ADMIN_CREANCE_DEBLOQUER(id), 'POST');
  }

  private apiRequest = async <T>(url: string, method: string, data?: any): Promise<T> => {
    const { apiRequest } = await import('../apiClient');
    return apiRequest<T>(url, method, data);
  };
}

// AchatParts Service Template
export class AchatPartsService extends BaseApiService<AchatParts> {
  constructor() {
    super(API_URLS.INVESTISSEUR_INVESTISSEMENTS);
  }

  async acheter(data: any): Promise<ApiResponse<AchatParts>> {
    return this.apiRequest(API_URLS.INVESTISSEUR_ACHAT, 'POST', data);
  }

  private apiRequest = async <T>(url: string, method: string, data?: any): Promise<T> => {
    const { apiRequest } = await import('../apiClient');
    return apiRequest<T>(url, method, data);
  };
}

// Notification Service Template
export class NotificationService extends BaseApiService<Notification> {
  constructor() {
    super(API_URLS.ADMIN_NOTIFICATIONS_SEND);
  }

  async send(data: any): Promise<ApiResponse<Notification>> {
    return this.apiRequest(API_URLS.ADMIN_NOTIFICATIONS_SEND, 'POST', data);
  }

  private apiRequest = async <T>(url: string, method: string, data?: any): Promise<T> => {
    const { apiRequest } = await import('../apiClient');
    return apiRequest<T>(url, method, data);
  };
}
