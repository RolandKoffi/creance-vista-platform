import { apiGet, apiPost, uploadFile } from './apiClient';
import { API_URLS } from './config';
import { Creance, Fichier } from '@/types';

export interface CreanceCreationData {
  numero_compte?: string;
  client_nom: string;
  email_client?: string;
  contact_client?: string;
  description?: string;
  montant_total: number;
  nombre_parts: number;
  montant_par_part: number;
  echeance: Date | string;
}

export const createCreance = async (creanceData: CreanceCreationData): Promise<Creance> => {
  return await apiPost<Creance>(API_URLS.PME_CREANCE_CREATE, creanceData);
};

export const getPMECreances = async (): Promise<Creance[]> => {
  return await apiGet<Creance[]>(API_URLS.PME_CREANCES);
};

export const uploadPMECreanceDocument = async (creanceId: string, file: File, typeDocument?: string): Promise<Fichier> => {
  return await uploadFile<Fichier>(API_URLS.PME_CREANCE_UPLOAD(creanceId), file, {
    type_fichier: typeDocument
  });
};

export const getCreanceFiles = async (creanceId: string): Promise<Fichier[]> => {
  return await apiGet<Fichier[]>(API_URLS.PME_CREANCE_FILES(creanceId));
};

export const getCreanceReceipt = async (creanceId: string): Promise<Blob> => {
  return await apiGet<Blob>(API_URLS.PME_CREANCE_RECEIPT(creanceId));
};

export const retirerFonds = async (creanceId: string): Promise<any> => {
  return await apiPost<any>(API_URLS.PME_CREANCE_RETIRER(creanceId), {});
};