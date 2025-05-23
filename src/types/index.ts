
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'pme' | 'investor';
  createdAt: Date;
  isVerified: boolean;
  lastLoginAt?: Date;
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
  description: string;
  isVerified: boolean;
  verificationDate?: Date;
  status: 'pending' | 'verified' | 'rejected' | 'suspended';
  createdAt: Date;
  updatedAt: Date;
  documents: Document[];
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
  riskProfile: 'conservative' | 'moderate' | 'aggressive';
  isVerified: boolean;
  verificationDate?: Date;
  status: 'pending' | 'verified' | 'rejected';
  totalInvested: number;
  portfolioValue: number;
  createdAt: Date;
  updatedAt: Date;
  preferences: {
    notifyNewOpportunities: boolean;
    notifyPayments: boolean;
    marketingEmails: boolean;
  };
  documents: Document[];
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
  status: 'pending' | 'approved' | 'rejected' | 'funded' | 'closed';
  riskLevel: 'low' | 'medium' | 'high';
  expectedReturn: number;
  totalParts: number;
  availableParts: number;
  partPrice: number;
  submissionDate: Date;
  approvalDate?: Date;
  documents: Document[];
  investments: Investment[];
}

export interface Investment {
  id: string;
  investorId: string;
  investor: {
    name: string;
  };
  claimId: string;
  claim: {
    title: string;
    pmeName: string;
  };
  amount: number;
  parts: number;
  date: Date;
  status: 'pending' | 'confirmed' | 'paid' | 'completed';
  expectedReturn: number;
  actualReturn?: number;
  paymentMethod: 'card' | 'mobile_money' | 'bank_transfer';
}

export interface Transaction {
  id: string;
  userId?: string;
  type: 'investment' | 'payment' | 'refund' | 'fee';
  amount: number;
  date: Date;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  from: string;
  to: string;
  description: string;
  reference: string;
  notes?: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadDate: Date;
  status: 'pending' | 'verified' | 'rejected';
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  date: Date;
  actionUrl?: string;
}

export interface DashboardStats {
  totalPMEs: number;
  totalInvestors: number;
  totalClaims: number;
  totalInvestments: number;
  totalAmount: number;
  pendingVerifications: number;
}
