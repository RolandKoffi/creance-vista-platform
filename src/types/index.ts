
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'pme' | 'investor';
  password?: string;
}

export type UserRole = 'admin' | 'pme' | 'investor';

export interface PME {
  id: string;
  userId: string;
  companyName: string;
  siret: string;
  address: string;
  contactPerson: string;
  phone: string;
  contactEmail: string;
  contactPhone: string;
  description: string;
  isVerified: boolean;
  createdAt: Date;
  documents?: Document[];
  verifiedAt?: Date;
}

export interface Investor {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  riskProfile: 'conservative' | 'moderate' | 'aggressive';
  preferences: string[];
  isVerified: boolean;
  createdAt: Date;
  idNumber?: string;
  documents?: Document[];
}

export interface Claim {
  id: string;
  pmeId: string;
  pmeName: string;
  title: string;
  amount: number;
  dueDate: Date;
  description: string;
  clientName: string;
  status: 'pending' | 'active' | 'funded' | 'completed' | 'repaid';
  createdAt: Date;
  riskLevel: 'low' | 'medium' | 'high';
  expectedReturn: number;
  partPrice: number;
  totalParts: number;
  soldParts: number;
  fundingProgress: number;
  documents?: Document[];
  investors?: string[];
  fundsWithdrawn?: boolean;
  repaidAt?: Date;
  yield?: number;
}

export interface Investment {
  id: string;
  investorId: string;
  claimId: string;
  pmeId: string;
  amount: number;
  parts: number;
  expectedReturn: number;
  expectedPaymentDate: Date;
  status: 'active' | 'completed' | 'cancelled';
  createdAt: Date;
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'investment' | 'disbursement' | 'repayment';
  amount: number;
  date: Date;
  status: 'pending' | 'completed' | 'failed';
  from: string;
  to: string;
  description: string;
  reference: string;
  notes?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: Date;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: Date;
}
