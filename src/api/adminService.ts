import { apiGet, apiPost, uploadFile } from './apiClient';
import { API_URLS } from './config';
import { PME, Creance, Investisseur, LogUtilisateur, Notification, Fichier } from '@/types';

export interface DashboardStats {
  totalPMEs: number;
  totalInvestisseurs: number;
  totalCreances: number;
  totalInvestissements: number;
  totalMontant: number;
  validationsEnAttente: number;
}

export interface NotificationData {
  user_id?: number;
  contenu: string;
  type: string;
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  return await apiGet<DashboardStats>(API_URLS.ADMIN_DASHBOARD);
};

// PME Management
export const getAllPMEs = async (): Promise<PME[]> => {
  return await apiGet<PME[]>(API_URLS.ADMIN_PMES);
};

export const validerPME = async (pmeId: string): Promise<PME> => {
  return await apiPost<PME>(API_URLS.ADMIN_PME_VALIDER(pmeId), {});
};

export const rejeterPME = async (pmeId: string, raison?: string): Promise<PME> => {
  return await apiPost<PME>(API_URLS.ADMIN_PME_REJETER(pmeId), { raison });
};

export const suspendrePME = async (pmeId: string, raison?: string): Promise<PME> => {
  return await apiPost<PME>(API_URLS.ADMIN_PME_SUSPENDRE(pmeId), { raison });
};

export const reactiverPME = async (pmeId: string): Promise<PME> => {
  return await apiPost<PME>(API_URLS.ADMIN_PME_REACTIVER(pmeId), {});
};

// Creances Management
export const getAllCreances = async (): Promise<Creance[]> => {
  return await apiGet<Creance[]>(API_URLS.ADMIN_CREANCES);
};

export const validerCreance = async (creanceId: string): Promise<Creance> => {
  return await apiPost<Creance>(API_URLS.ADMIN_CREANCE_VALIDER(creanceId), {});
};

export const rejeterCreance = async (creanceId: string, raison?: string): Promise<Creance> => {
  return await apiPost<Creance>(API_URLS.ADMIN_CREANCE_REJETER(creanceId), { raison });
};

export const annulerCreance = async (creanceId: string): Promise<Creance> => {
  return await apiPost<Creance>(API_URLS.ADMIN_CREANCE_ANNULER(creanceId), {});
};

export const debloquerFonds = async (creanceId: string): Promise<Creance> => {
  return await apiPost<Creance>(API_URLS.ADMIN_CREANCE_DEBLOQUER(creanceId), {});
};

export const uploadCreanceDocument = async (creanceId: string, file: File, typeDocument?: string): Promise<Fichier> => {
  return await uploadFile<Fichier>(API_URLS.ADMIN_CREANCE_UPLOAD(creanceId), file, {
    type_fichier: typeDocument
  });
};

// Investisseurs Management
export const getAllInvestisseurs = async (): Promise<Investisseur[]> => {
  return await apiGet<Investisseur[]>(API_URLS.ADMIN_INVESTISSEURS);
};

export const getInvestisseurHistorique = async (investisseurId: string): Promise<LogUtilisateur[]> => {
  return await apiGet<LogUtilisateur[]>(API_URLS.ADMIN_INVESTISSEUR_HISTORIQUE(investisseurId));
};

// Notifications
export const sendNotification = async (notificationData: NotificationData): Promise<Notification> => {
  return await apiPost<Notification>(API_URLS.ADMIN_NOTIFICATIONS_SEND, notificationData);
};

// Logs
export const getLogs = async (): Promise<LogUtilisateur[]> => {
  return await apiGet<LogUtilisateur[]>(API_URLS.ADMIN_LOGS);
};

export const exportLogs = async (): Promise<Blob> => {
  return await apiGet<Blob>(API_URLS.ADMIN_LOGS_EXPORT);
};

// Parametres
export const getParametres = async (): Promise<any> => {
  return await apiGet<any>(API_URLS.ADMIN_PARAMETRES);
};