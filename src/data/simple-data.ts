
import { User, PME, Investor, Claim } from "@/types";

// Utilisateurs simplifiés
export const simpleUsers: User[] = [
  {
    id: "user-1",
    name: "Admin Principal",
    email: "admin@fincredibl.com",
    role: "admin"
  },
  {
    id: "user-2",
    name: "Tech PME",
    email: "contact@techpme.com",
    role: "pme"
  },
  {
    id: "user-3",
    name: "Jean Dupont",
    email: "jean.dupont@investisseur.com",
    role: "investor"
  }
];

// PMEs simplifiées
export const simplePMEs: PME[] = [
  {
    id: "pme-1",
    userId: "user-2",
    companyName: "Tech PME",
    siret: "12345678901234",
    address: "123 Rue de l'Innovation, 75001 Paris",
    contactPerson: "Jean Dupont",
    phone: "+33123456789",
    contactEmail: "contact@techpme.com",
    contactPhone: "+33123456789",
    description: "Entreprise spécialisée dans les solutions technologiques",
    isVerified: true,
    createdAt: new Date("2023-01-15")
  }
];

// Investisseurs simplifiés
export const simpleInvestors: Investor[] = [
  {
    id: "inv-1",
    userId: "user-3",
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@investisseur.com",
    phone: "+33612345678",
    address: "101 Rue des Investisseurs, 75008 Paris",
    riskProfile: "moderate",
    preferences: ["tech", "industry"],
    isVerified: true,
    createdAt: new Date("2023-01-20")
  }
];

// Créances simplifiées
export const simpleClaims: Claim[] = [
  {
    id: "claim-1",
    pmeId: "pme-1",
    pmeName: "Tech PME",
    title: "Financement projet IoT",
    amount: 50000,
    dueDate: new Date("2024-01-15"),
    description: "Financement pour le développement d'une solution IoT pour l'industrie",
    clientName: "Industrie Connect SA",
    status: "active",
    createdAt: new Date("2023-06-15"),
    riskLevel: "low",
    expectedReturn: 8,
    partPrice: 100,
    totalParts: 500,
    soldParts: 350,
    fundingProgress: 70
  },
  {
    id: "claim-2",
    pmeId: "pme-1",
    pmeName: "Tech PME",
    title: "Développement application mobile",
    amount: 30000,
    dueDate: new Date("2024-02-28"),
    description: "Financement pour le développement d'une application mobile B2B",
    clientName: "Mobile Business Solutions",
    status: "funded",
    createdAt: new Date("2023-08-01"),
    riskLevel: "low",
    expectedReturn: 7,
    partPrice: 50,
    totalParts: 600,
    soldParts: 600,
    fundingProgress: 100
  }
];
