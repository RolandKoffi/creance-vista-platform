
// API Base URLs and configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_URLS = {
  // Auth
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/register`,
  FINALISER: `${API_BASE_URL}/auth/finaliser`,
  
  // PME
  PME_CREANCE_CREATE: `${API_BASE_URL}/pme/creance`,
  PME_CREANCES: `${API_BASE_URL}/pme/creances`,
  PME_CREANCE_UPLOAD: (id: string) => `${API_BASE_URL}/pme/creance/${id}/upload`,
  PME_CREANCE_FILES: (id: string) => `${API_BASE_URL}/pme/creance/${id}/fichiers`,
  PME_CREANCE_RECEIPT: (id: string) => `${API_BASE_URL}/pme/creance/${id}/receipt`,
  PME_CREANCE_RETIRER: (id: string) => `${API_BASE_URL}/pme/creance/${id}/retirer`,
  
  // Investisseur
  INVESTISSEUR_ACHAT: `${API_BASE_URL}/investisseur/achat`,
  INVESTISSEUR_INVESTISSEMENTS: `${API_BASE_URL}/investisseur/investissements`,
  INVESTISSEUR_INVESTMENT_RECEIPT: (id: string) => `${API_BASE_URL}/investisseur/investissement/${id}/receipt`,
  INVESTISSEUR_REMBOURSEMENTS: `${API_BASE_URL}/investisseur/remboursements`,
  INVESTISSEUR_REMBOURSEMENT_RECLAMER: (id: string) => `${API_BASE_URL}/investisseur/remboursements/${id}/reclamer`,
  
  // Admin
  ADMIN_DASHBOARD: `${API_BASE_URL}/admin/dashboard`,
  ADMIN_PMES: `${API_BASE_URL}/admin/pmes`,
  ADMIN_PME_VALIDER: (id: string) => `${API_BASE_URL}/admin/pmes/${id}/valider`,
  ADMIN_PME_REJETER: (id: string) => `${API_BASE_URL}/admin/pmes/${id}/rejeter`,
  ADMIN_PME_SUSPENDRE: (id: string) => `${API_BASE_URL}/admin/pmes/${id}/suspendre`,
  ADMIN_PME_REACTIVER: (id: string) => `${API_BASE_URL}/admin/pmes/${id}/reactiver`,
  ADMIN_CREANCES: `${API_BASE_URL}/admin/creances`,
  ADMIN_CREANCE_VALIDER: (id: string) => `${API_BASE_URL}/admin/creances/${id}/valider`,
  ADMIN_CREANCE_REJETER: (id: string) => `${API_BASE_URL}/admin/creances/${id}/rejeter`,
  ADMIN_CREANCE_ANNULER: (id: string) => `${API_BASE_URL}/admin/creances/${id}/annuler`,
  ADMIN_CREANCE_DEBLOQUER: (id: string) => `${API_BASE_URL}/admin/creances/${id}/debloquer`,
  ADMIN_CREANCE_UPLOAD: (id: string) => `${API_BASE_URL}/admin/creances/${id}/upload`,
  ADMIN_INVESTISSEURS: `${API_BASE_URL}/admin/investisseurs`,
  ADMIN_INVESTISSEUR_HISTORIQUE: (id: string) => `${API_BASE_URL}/admin/investisseur/${id}/historique`,
  ADMIN_NOTIFICATIONS_SEND: `${API_BASE_URL}/admin/notifications/send`,
  ADMIN_LOGS: `${API_BASE_URL}/admin/logs`,
  ADMIN_LOGS_EXPORT: `${API_BASE_URL}/admin/logs/export`,
  ADMIN_PARAMETRES: `${API_BASE_URL}/admin/parametres`,
};

// Default request headers
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

// Request timeout in milliseconds
export const REQUEST_TIMEOUT = 30000;
