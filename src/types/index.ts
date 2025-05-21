
export type UserRole = 'admin' | 'pme' | 'investor';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  profileCompleted: boolean;
}

export interface PME {
  id: string;
  userId: string;
  companyName: string;
  siret: string;
  address: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  phone: string;
  isVerified: boolean;
  verifiedAt?: Date;
  createdAt: Date;
  documents: Document[];
  description: string;
}

export interface Investor {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  idNumber: string;
  email: string;
  phone: string;
  address: string;
  isVerified: boolean;
  riskProfile: 'conservative' | 'moderate' | 'aggressive';
  createdAt: Date;
  documents: Document[];
  preferences: {
    notifyNewOpportunities: boolean;
    notifyPayments: boolean;
    marketingEmails: boolean;
  };
}

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: Date;
  status: 'pending' | 'verified' | 'rejected';
}

export interface Claim {
  id: string;
  pmeId: string;
  pmeName: string;
  title: string;
  clientName: string;
  amount: number;
  dueDate: Date;
  description: string;
  documents: Document[];
  status: 'pending' | 'active' | 'rejected' | 'completed' | 'expired' | 'repaid';
  createdAt: Date;
  repaidAt?: Date;
  totalParts: number;
  soldParts: number;
  partPrice: number;
  riskLevel: 'low' | 'medium' | 'high';
  expectedReturn: number;
  yield?: number;
  fundingProgress: number;  // percentage funded
  fundsWithdrawn?: boolean;
  investors?: Array<{
    id: string;
    amount: number;
    investorId: string;
    investorName: string;
  }>;
}

export interface Investment {
  id: string;
  investorId: string;
  claimId: string;
  pmeId: string;
  amount: number;
  parts: number;
  date: Date;
  status: 'pending' | 'completed' | 'refunded';
  paymentMethod: 'card' | 'mobile_money' | 'bank_transfer';
  expectedReturn: number;
  expectedPaymentDate: Date;
}

export interface Transaction {
  id: string;
  type: 'investment' | 'disbursement' | 'repayment';
  amount: number;
  date: Date;
  status: 'pending' | 'completed' | 'failed';
  userId: string;
  claimId?: string;
  investmentId?: string;
  notes?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  date: Date;
  link?: string;
}

export interface SystemSettings {
  platformFees: number; // percentage
  minimumInvestment: number;
  minimumClaimAmount: number;
  defaultDiscount: number; // percentage
  paymentMethods: string[];
}
