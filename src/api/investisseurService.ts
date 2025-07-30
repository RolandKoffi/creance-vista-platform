import { apiGet, apiPost } from './apiClient';
import { API_URLS } from './config';
import { AchatParts, RemboursementInvestisseur } from '@/types';

export interface AchatPartsData {
  creance_id: number;
  nombre_parts: number;
  methode_paiement: string;
}

export const acheterParts = async (achatData: AchatPartsData): Promise<AchatParts> => {
  return await apiPost<AchatParts>(API_URLS.INVESTISSEUR_ACHAT, achatData);
};

export const getInvestissements = async (): Promise<AchatParts[]> => {
  return await apiGet<AchatParts[]>(API_URLS.INVESTISSEUR_INVESTISSEMENTS);
};

export const getInvestmentReceipt = async (investmentId: string): Promise<Blob> => {
  return await apiGet<Blob>(API_URLS.INVESTISSEUR_INVESTMENT_RECEIPT(investmentId));
};

export const getRemboursements = async (): Promise<RemboursementInvestisseur[]> => {
  return await apiGet<RemboursementInvestisseur[]>(API_URLS.INVESTISSEUR_REMBOURSEMENTS);
};

export const reclamerRemboursement = async (remboursementId: string): Promise<any> => {
  return await apiPost<any>(API_URLS.INVESTISSEUR_REMBOURSEMENT_RECLAMER(remboursementId), {});
};