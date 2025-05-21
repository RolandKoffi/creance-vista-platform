
import { apiGet, apiPost, apiPut, apiPatch, uploadFile } from './apiClient';
import { API_URLS } from './config';
import { Claim, Document } from '@/types';

export interface ClaimSubmissionData {
  pmeId: string;
  title: string;
  clientName: string;
  amount: number;
  dueDate: Date | string;
  description: string;
  totalParts: number;
  partPrice: number;
  riskLevel: 'low' | 'medium' | 'high';
  expectedReturn: number;
}

export const getAllClaims = async (): Promise<Claim[]> => {
  return await apiGet<Claim[]>(API_URLS.CLAIMS);
};

export const getClaimById = async (id: string): Promise<Claim> => {
  return await apiGet<Claim>(API_URLS.CLAIM_DETAILS(id));
};

export const getPMEClaims = async (pmeId: string): Promise<Claim[]> => {
  return await apiGet<Claim[]>(API_URLS.PME_CLAIMS(pmeId));
};

export const submitClaim = async (claimData: ClaimSubmissionData): Promise<Claim> => {
  return await apiPost<Claim>(API_URLS.CLAIM_SUBMIT, claimData);
};

export const updateClaim = async (id: string, claimData: Partial<ClaimSubmissionData>): Promise<Claim> => {
  return await apiPut<Claim>(API_URLS.CLAIM_DETAILS(id), claimData);
};

export const approveClaim = async (id: string): Promise<Claim> => {
  return await apiPatch<Claim>(API_URLS.CLAIM_APPROVE(id), {});
};

export const rejectClaim = async (id: string, reason?: string): Promise<Claim> => {
  return await apiPatch<Claim>(API_URLS.CLAIM_REJECT(id), { reason });
};

export const uploadClaimDocument = async (claimId: string, file: File, documentType: string): Promise<Document> => {
  return await uploadFile<Document>(API_URLS.DOCUMENT_UPLOAD, file, {
    entityId: claimId,
    entityType: 'claim',
    documentType
  });
};
