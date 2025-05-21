
// API Base URLs and configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const API_URLS = {
  // Auth
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/register`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
  
  // User
  USER_PROFILE: `${API_BASE_URL}/users/profile`,
  
  // PME
  PMES: `${API_BASE_URL}/pmes`,
  PME_DETAILS: (id: string) => `${API_BASE_URL}/pmes/${id}`,
  PME_VERIFY: (id: string) => `${API_BASE_URL}/pmes/${id}/verify`,
  PME_REJECT: (id: string) => `${API_BASE_URL}/pmes/${id}/reject`,
  PME_SUSPEND: (id: string) => `${API_BASE_URL}/pmes/${id}/suspend`,
  
  // Investors
  INVESTORS: `${API_BASE_URL}/investors`,
  INVESTOR_DETAILS: (id: string) => `${API_BASE_URL}/investors/${id}`,
  INVESTOR_VERIFY: (id: string) => `${API_BASE_URL}/investors/${id}/verify`,
  INVESTOR_REJECT: (id: string) => `${API_BASE_URL}/investors/${id}/reject`,
  
  // Claims
  CLAIMS: `${API_BASE_URL}/claims`,
  CLAIM_DETAILS: (id: string) => `${API_BASE_URL}/claims/${id}`,
  CLAIM_SUBMIT: `${API_BASE_URL}/claims/submit`,
  CLAIM_APPROVE: (id: string) => `${API_BASE_URL}/claims/${id}/approve`,
  CLAIM_REJECT: (id: string) => `${API_BASE_URL}/claims/${id}/reject`,
  PME_CLAIMS: (pmeId: string) => `${API_BASE_URL}/pmes/${pmeId}/claims`,
  
  // Investments
  INVESTMENTS: `${API_BASE_URL}/investments`,
  INVESTMENT_DETAILS: (id: string) => `${API_BASE_URL}/investments/${id}`,
  INVESTOR_INVESTMENTS: (investorId: string) => `${API_BASE_URL}/investors/${investorId}/investments`,
  INVESTMENT_CREATE: `${API_BASE_URL}/investments`,
  
  // Transactions
  TRANSACTIONS: `${API_BASE_URL}/transactions`,
  TRANSACTION_DETAILS: (id: string) => `${API_BASE_URL}/transactions/${id}`,
  
  // Notifications
  NOTIFICATIONS: `${API_BASE_URL}/notifications`,
  NOTIFICATION_READ: (id: string) => `${API_BASE_URL}/notifications/${id}/read`,
  
  // Documents
  DOCUMENT_UPLOAD: `${API_BASE_URL}/documents/upload`,
  DOCUMENT_DOWNLOAD: (id: string) => `${API_BASE_URL}/documents/${id}/download`,
};

// Default request headers
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

// Request timeout in milliseconds
export const REQUEST_TIMEOUT = 30000;
