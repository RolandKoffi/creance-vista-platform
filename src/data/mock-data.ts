import { User, PME, Investisseur, Creance, AchatParts, Notification } from '@/types';

// Mock users data
export const mockUsers: User[] = [
  {
    id: 1,
    email: "admin@creditbourse.com",
    role: "admin",
    is_active: true,
    is_deleted: false,
    created_at: new Date("2024-01-15"),
  },
  {
    id: 2,
    email: "pme@example.com",
    role: "pme",
    is_active: true,
    is_deleted: false,
    created_at: new Date("2024-02-01"),
  },
  {
    id: 3,
    email: "investor@example.com",
    role: "investisseur",
    is_active: true,
    is_deleted: false,
    created_at: new Date("2024-02-10"),
  },
];

// Mock PMEs data
export const mockPMEs: PME[] = [
  {
    id: 1,
    user_id: 2,
    nom_entreprise: "TechCorp SARL",
    secteur_activite: "Technologie",
    telephone: "+225 07 00 00 00",
    adresse: "Abidjan, Côte d'Ivoire",
    pays: "Côte d'Ivoire",
    compte_bancaire: "CI123456789",
    statut_validation: "valide",
    is_deleted: false,
    created_at: new Date("2024-02-01"),
  },
];

// Mock Investisseurs data  
export const mockInvestisseurs: Investisseur[] = [
  {
    id: 1,
    user_id: 3,
    nom_complet: "Jean Kouassi",
    genre: "M",
    pays: "Côte d'Ivoire",
    ville: "Abidjan",
    telephone: "+225 05 00 00 00",
    is_deleted: false,
    created_at: new Date("2024-02-10"),
  },
];

// Mock Creances data
export const mockCreances: Creance[] = [
  {
    id: 1,
    pme_id: 1,
    numero_compte: "FAC-2024-001",
    client_nom: "Entreprise ABC",
    email_client: "abc@example.com",
    contact_client: "+225 07 11 11 11",
    description: "Facture de prestations informatiques",
    montant_total: 5000000,
    nombre_parts: 100,
    montant_par_part: 50000,
    echeance: new Date("2024-12-31"),
    statut: "valide",
    statut_retrait: "en_attente",
    is_deleted: false,
    created_at: new Date("2024-03-01"),
  },
];

// Mock AchatParts data
export const mockAchatParts: AchatParts[] = [
  {
    id: 1,
    investisseur_id: 1,
    creance_id: 1,
    nombre_parts: 10,
    montant_total: 500000,
    methode_paiement: "mobile_money",
    statut_paiement: "valide",
    url_recu: "/recu/1",
    date_achat: new Date("2024-03-15"),
    is_deleted: false,
    created_at: new Date("2024-03-15"),
  },
];

// Mock Notifications data
export const mockNotifications: Notification[] = [
  {
    id: 1,
    user_id: 3,
    contenu: "Votre investissement a été confirmé",
    type: "investment",
    vue: false,
    created_at: new Date("2024-03-15"),
  },
  {
    id: 2,
    user_id: 2,
    contenu: "Votre créance a été validée",
    type: "validation",
    vue: false,
    created_at: new Date("2024-03-01"),
  },
];

// Utility functions for compatibility
export const getUsers = () => mockUsers;
export const getPMEs = () => mockPMEs;
export const getInvestors = () => mockInvestisseurs;
export const getClaims = () => mockCreances;
export const getInvestments = () => mockAchatParts;
export const getTransactions = () => mockAchatParts; // Using AchatParts as transactions
export const getNotifications = () => mockNotifications;