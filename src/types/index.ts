
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'pme' | 'investor';
}

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
  status: 'pending' | 'active' | 'funded' | 'completed';
  createdAt: Date;
  riskLevel: 'low' | 'medium' | 'high';
  expectedReturn: number;
  partPrice: number;
  totalParts: number;
  soldParts: number;
  fundingProgress: number;
}
