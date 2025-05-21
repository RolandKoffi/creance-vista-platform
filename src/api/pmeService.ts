
import { apiGet, apiPost, apiPut, apiPatch, uploadFile } from './apiClient';
import { API_URLS } from './config';
import { PME, Document } from '@/types';

export interface PMERegistrationData {
  companyName: string;
  siret: string;
  address: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  phone: string;
  description: string;
}

export const getAllPMEs = async (): Promise<PME[]> => {
  return await apiGet<PME[]>(API_URLS.PMES);
};

export const getPMEById = async (id: string): Promise<PME> => {
  return await apiGet<PME>(API_URLS.PME_DETAILS(id));
};

export const createPME = async (pmeData: PMERegistrationData): Promise<PME> => {
  return await apiPost<PME>(API_URLS.PMES, pmeData);
};

export const updatePME = async (id: string, pmeData: Partial<PMERegistrationData>): Promise<PME> => {
  return await apiPut<PME>(API_URLS.PME_DETAILS(id), pmeData);
};

export const verifyPME = async (id: string): Promise<PME> => {
  return await apiPatch<PME>(API_URLS.PME_VERIFY(id), {});
};

export const rejectPME = async (id: string, reason?: string): Promise<PME> => {
  return await apiPatch<PME>(API_URLS.PME_REJECT(id), { reason });
};

export const suspendPME = async (id: string, reason?: string): Promise<PME> => {
  return await apiPatch<PME>(API_URLS.PME_SUSPEND(id), { reason });
};

export const uploadPMEDocument = async (pmeId: string, file: File, documentType: string): Promise<Document> => {
  return await uploadFile<Document>(API_URLS.DOCUMENT_UPLOAD, file, {
    entityId: pmeId,
    entityType: 'pme',
    documentType
  });
};
