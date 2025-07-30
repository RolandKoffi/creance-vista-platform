import { apiGet, apiPost } from './apiClient';
import { API_URLS } from './config';
import { AchatParts, RemboursementInvestisseur } from '@/types';

export interface AchatPartsData {
  creance_id: number;
  nombre_parts: number;
  methode_paiement: string;
  // Mobile money specific fields
  mobile_number?: string;
  mobile_provider?: 'orange' | 'mtn' | 'moov' | 'wave';
  transaction_reference?: string;
}

export const acheterParts = async (achatData: AchatPartsData): Promise<AchatParts> => {
  return await apiPost<AchatParts>(API_URLS.INVESTISSEUR_ACHAT, achatData);
};

export const getInvestissements = async (): Promise<AchatParts[]> => {
  return await apiGet<AchatParts[]>(API_URLS.INVESTISSEUR_INVESTISSEMENTS);
};

// Adaptées du backend Python
export const getCreancesDisponibles = async (): Promise<any[]> => {
  return await apiGet<any[]>('/investisseur/creances');
};

export const getDashboardKpis = async (): Promise<any> => {
  return await apiGet<any>('/investisseur/dashboard');
};

export const createInvestisseurProfile = async (data: any): Promise<any> => {
  return await apiPost<any>('/investisseur/profile', data);
};

export const getMesInvestissements = async (): Promise<any[]> => {
  return await apiGet<any[]>('/investisseur/mes-investissements');
};

export const getInvestmentReceipt = async (investmentId: string): Promise<Blob> => {
  return await apiGet<Blob>(`/investisseur/recu/${investmentId}`);
};

export const getRemboursements = async (): Promise<RemboursementInvestisseur[]> => {
  return await apiGet<RemboursementInvestisseur[]>('/investisseur/remboursements');
};

export const reclamerRemboursement = async (remboursementId: string): Promise<any> => {
  return await apiPost<any>(`/investisseur/remboursement/${remboursementId}/reclamer`, {});
};

export const acheterPartsWithMobileMoney = async (achatData: AchatPartsData): Promise<AchatParts> => {
  // Validation pour mobile money
  if (achatData.methode_paiement === 'mobile_money') {
    if (!achatData.mobile_number || !achatData.mobile_provider) {
      throw new Error('Numéro de téléphone et opérateur requis pour mobile money');
    }
  }
  
  return await apiPost<AchatParts>('/investisseur/acheter', achatData);
};