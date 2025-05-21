
import { apiGet } from './apiClient';
import { API_URLS } from './config';
import { Transaction } from '@/types';

export const getAllTransactions = async (): Promise<Transaction[]> => {
  return await apiGet<Transaction[]>(API_URLS.TRANSACTIONS);
};

export const getTransactionById = async (id: string): Promise<Transaction> => {
  return await apiGet<Transaction>(API_URLS.TRANSACTION_DETAILS(id));
};
