
import { apiGet, apiPost, apiPut, apiPatch, uploadFile } from './apiClient';
import { API_URLS } from './config';
import { Investor, Document, Investment } from '@/types';

export interface InvestorRegistrationData {
  firstName: string;
  lastName: string;
  idNumber: string;
  email: string;
  phone: string;
  address: string;
  riskProfile: 'conservative' | 'moderate' | 'aggressive';
  preferences: {
    notifyNewOpportunities: boolean;
    notifyPayments: boolean;
    marketingEmails: boolean;
  };
}

export const getAllInvestors = async (): Promise<Investor[]> => {
  return await apiGet<Investor[]>(API_URLS.INVESTORS);
};

export const getInvestorById = async (id: string): Promise<Investor> => {
  return await apiGet<Investor>(API_URLS.INVESTOR_DETAILS(id));
};

export const createInvestor = async (investorData: InvestorRegistrationData): Promise<Investor> => {
  return await apiPost<Investor>(API_URLS.INVESTORS, investorData);
};

export const updateInvestor = async (id: string, investorData: Partial<InvestorRegistrationData>): Promise<Investor> => {
  return await apiPut<Investor>(API_URLS.INVESTOR_DETAILS(id), investorData);
};

export const verifyInvestor = async (id: string): Promise<Investor> => {
  return await apiPatch<Investor>(API_URLS.INVESTOR_VERIFY(id), {});
};

export const rejectInvestor = async (id: string, reason?: string): Promise<Investor> => {
  return await apiPatch<Investor>(API_URLS.INVESTOR_REJECT(id), { reason });
};

export const uploadInvestorDocument = async (investorId: string, file: File, documentType: string): Promise<Document> => {
  return await uploadFile<Document>(API_URLS.DOCUMENT_UPLOAD, file, {
    entityId: investorId,
    entityType: 'investor',
    documentType
  });
};

export const getInvestorInvestments = async (investorId: string): Promise<Investment[]> => {
  return await apiGet<Investment[]>(API_URLS.INVESTOR_INVESTMENTS(investorId));
};
