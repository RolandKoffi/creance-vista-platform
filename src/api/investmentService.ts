
import { apiGet, apiPost } from './apiClient';
import { API_URLS } from './config';
import { Investment } from '@/types';

export interface InvestmentCreationData {
  investorId: string;
  claimId: string;
  pmeId: string;
  amount: number;
  parts: number;
  paymentMethod: 'card' | 'mobile_money' | 'bank_transfer';
}

export const getAllInvestments = async (): Promise<Investment[]> => {
  return await apiGet<Investment[]>(API_URLS.INVESTMENTS);
};

export const getInvestmentById = async (id: string): Promise<Investment> => {
  return await apiGet<Investment>(API_URLS.INVESTMENT_DETAILS(id));
};

export const createInvestment = async (investmentData: InvestmentCreationData): Promise<Investment> => {
  return await apiPost<Investment>(API_URLS.INVESTMENT_CREATE, investmentData);
};
