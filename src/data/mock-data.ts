
import { User, PME, Investor, Claim, Investment, Transaction, Notification } from "@/types";

// Mock Utilisateurs
export const mockUsers: User[] = [
  {
    id: "user-1",
    name: "Admin Principal",
    email: "admin@fincredibl.com",
    role: "admin",
    password: "admin123"
  },
  {
    id: "user-2",
    name: "Entreprise Tech",
    email: "contact@techpme.com",
    role: "pme",
    password: "pme123"
  },
  {
    id: "user-3",
    name: "Industrie Solutions",
    email: "contact@industrie-solutions.com",
    role: "pme",
    password: "pme123"
  },
  {
    id: "user-4",
    name: "Logistique Express",
    email: "contact@logistique-express.com",
    role: "pme",
    password: "pme123"
  },
  {
    id: "user-5",
    name: "Jean Dupont",
    email: "jean.dupont@investisseur.com",
    role: "investor",
    password: "invest123"
  },
  {
    id: "user-6",
    name: "Sophie Martin",
    email: "sophie.martin@investisseur.com",
    role: "investor",
    password: "invest123"
  },
  {
    id: "user-7",
    name: "Pierre Leroy",
    email: "pierre.leroy@investisseur.com",
    role: "investor",
    password: "invest123"
  }
];

// Mock PMEs
export const mockPMEs: PME[] = [
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
    createdAt: new Date("2023-01-15"),
    documents: [
      {
        id: "doc-1",
        name: "KYC_TechPME.pdf",
        type: "KYC",
        url: "/documents/kyc_techpme.pdf",
        uploadedAt: new Date("2023-01-15"),
        status: "verified"
      },
      {
        id: "doc-2",
        name: "Balance_Sheet_TechPME_2023.pdf",
        type: "Financial",
        url: "/documents/balance_techpme.pdf",
        uploadedAt: new Date("2023-01-16"),
        status: "verified"
      }
    ]
  },
  {
    id: "pme-2",
    userId: "user-3",
    companyName: "Industrie Solutions",
    siret: "98765432109876",
    address: "456 Avenue de l'Industrie, 69002 Lyon",
    contactPerson: "Marie Durand",
    phone: "+33987654321",
    contactEmail: "contact@industrie-solutions.com",
    contactPhone: "+33987654321",
    description: "Solutions industrielles pour les PME",
    isVerified: true,
    createdAt: new Date("2023-02-20"),
    documents: [
      {
        id: "doc-3",
        name: "KYC_IndustrieSolutions.pdf",
        type: "KYC",
        url: "/documents/kyc_industrie.pdf",
        uploadedAt: new Date("2023-02-20"),
        status: "verified"
      },
      {
        id: "doc-4",
        name: "Balance_Sheet_IndustrieSolutions_2023.pdf",
        type: "Financial",
        url: "/documents/balance_industrie.pdf",
        uploadedAt: new Date("2023-02-21"),
        status: "verified"
      }
    ]
  },
  {
    id: "pme-3",
    userId: "user-4",
    companyName: "Logistique Express",
    siret: "45678901234567",
    address: "789 Boulevard de la Logistique, 33000 Bordeaux",
    contactPerson: "Thomas Petit",
    phone: "+33765432198",
    contactEmail: "contact@logistique-express.com",
    contactPhone: "+33765432198",
    description: "Services de logistique rapides et fiables",
    isVerified: false,
    createdAt: new Date("2023-03-10"),
    documents: [
      {
        id: "doc-5",
        name: "KYC_LogistiqueExpress.pdf",
        type: "KYC",
        url: "/documents/kyc_logistique.pdf",
        uploadedAt: new Date("2023-03-10"),
        status: "pending"
      }
    ]
  }
];

// Mock Investisseurs
export const mockInvestors: Investor[] = [
  {
    id: "inv-1",
    userId: "user-5",
    firstName: "Jean",
    lastName: "Dupont",
    idNumber: "1234567890",
    phone: "+33612345678",
    address: "101 Rue des Investisseurs, 75008 Paris",
    email: "jean.dupont@investisseur.com",
    riskProfile: "moderate",
    preferences: ["tech", "industry"],
    isVerified: true,
    createdAt: new Date("2023-01-20"),
    documents: [
      {
        id: "doc-6",
        name: "ID_JeanDupont.pdf",
        type: "ID",
        url: "/documents/id_jean.pdf",
        uploadedAt: new Date("2023-01-20"),
        status: "verified"
      },
      {
        id: "doc-7",
        name: "KYC_JeanDupont.pdf",
        type: "KYC",
        url: "/documents/kyc_jean.pdf",
        uploadedAt: new Date("2023-01-21"),
        status: "verified"
      }
    ]
  },
  {
    id: "inv-2",
    userId: "user-6",
    firstName: "Sophie",
    lastName: "Martin",
    idNumber: "0987654321",
    phone: "+33623456789",
    address: "202 Avenue des Financiers, 75016 Paris",
    email: "sophie.martin@investisseur.com",
    riskProfile: "aggressive",
    preferences: ["tech", "retail"],
    isVerified: true,
    createdAt: new Date("2023-02-15"),
    documents: [
      {
        id: "doc-8",
        name: "ID_SophieMartin.pdf",
        type: "ID",
        url: "/documents/id_sophie.pdf",
        uploadedAt: new Date("2023-02-15"),
        status: "verified"
      },
      {
        id: "doc-9",
        name: "KYC_SophieMartin.pdf",
        type: "KYC",
        url: "/documents/kyc_sophie.pdf",
        uploadedAt: new Date("2023-02-16"),
        status: "verified"
      }
    ]
  },
  {
    id: "inv-3",
    userId: "user-7",
    firstName: "Pierre",
    lastName: "Leroy",
    idNumber: "5678901234",
    phone: "+33634567890",
    address: "303 Boulevard des Capitaux, 69003 Lyon",
    email: "pierre.leroy@investisseur.com",
    riskProfile: "conservative",
    preferences: ["logistics", "food"],
    isVerified: false,
    createdAt: new Date("2023-03-05"),
    documents: [
      {
        id: "doc-10",
        name: "ID_PierreLeroy.pdf",
        type: "ID",
        url: "/documents/id_pierre.pdf",
        uploadedAt: new Date("2023-03-05"),
        status: "pending"
      }
    ]
  }
];

// Mock Créances
export const mockClaims: Claim[] = [
  {
    id: "claim-1",
    pmeId: "pme-1",
    pmeName: "Tech PME",
    title: "Financement projet IoT",
    amount: 50000,
    dueDate: new Date("2024-01-15"),
    description: "Financement pour le développement d'une solution IoT pour l'industrie",
    clientName: "Industrie Connect SA",
    documents: [
      {
        id: "doc-11",
        name: "Facture_IoT.pdf",
        type: "Invoice",
        url: "/documents/facture_iot.pdf",
        uploadedAt: new Date("2023-06-15"),
        status: "verified"
      }
    ],
    status: "active",
    createdAt: new Date("2023-06-15"),
    riskLevel: "low",
    expectedReturn: 8,
    partPrice: 100,
    totalParts: 500,
    soldParts: 350,
    fundingProgress: 70,
    investors: [
      {
        investorId: "inv-1",
        amount: 20000,
        parts: 200,
        date: new Date("2023-07-01")
      },
      {
        investorId: "inv-2",
        amount: 15000,
        parts: 150,
        date: new Date("2023-07-15")
      }
    ]
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
    documents: [
      {
        id: "doc-12",
        name: "Facture_AppMobile.pdf",
        type: "Invoice",
        url: "/documents/facture_app.pdf",
        uploadedAt: new Date("2023-08-01"),
        status: "verified"
      }
    ],
    status: "active",
    createdAt: new Date("2023-08-01"),
    riskLevel: "low",
    expectedReturn: 7,
    partPrice: 50,
    totalParts: 600,
    soldParts: 600,
    fundingProgress: 100,
    investors: [
      {
        investorId: "inv-1",
        amount: 10000,
        parts: 200,
        date: new Date("2023-08-15")
      },
      {
        investorId: "inv-2",
        amount: 20000,
        parts: 400,
        date: new Date("2023-08-20")
      }
    ]
  },
  {
    id: "claim-3",
    pmeId: "pme-2",
    pmeName: "Industrie Solutions",
    title: "Équipement industriel",
    amount: 75000,
    dueDate: new Date("2024-03-30"),
    description: "Financement pour l'achat d'équipements industriels de pointe",
    clientName: "Usine Moderne Inc.",
    documents: [
      {
        id: "doc-13",
        name: "Facture_Equipement.pdf",
        type: "Invoice",
        url: "/documents/facture_equipement.pdf",
        uploadedAt: new Date("2023-09-01"),
        status: "verified"
      }
    ],
    status: "active",
    createdAt: new Date("2023-09-01"),
    riskLevel: "medium",
    expectedReturn: 9,
    partPrice: 250,
    totalParts: 300,
    soldParts: 210,
    fundingProgress: 70,
    investors: [
      {
        investorId: "inv-2",
        amount: 50000,
        parts: 200,
        date: new Date("2023-09-15")
      },
      {
        investorId: "inv-1",
        amount: 2500,
        parts: 10,
        date: new Date("2023-09-20")
      }
    ]
  },
  {
    id: "claim-4",
    pmeId: "pme-2",
    pmeName: "Industrie Solutions",
    title: "Expansion internationale",
    amount: 100000,
    dueDate: new Date("2024-06-30"),
    description: "Financement pour l'expansion des activités en Europe",
    clientName: "European Market Ventures",
    documents: [
      {
        id: "doc-14",
        name: "Contrat_Expansion.pdf",
        type: "Contract",
        url: "/documents/contrat_expansion.pdf",
        uploadedAt: new Date("2023-10-01"),
        status: "verified"
      }
    ],
    status: "active",
    createdAt: new Date("2023-10-01"),
    riskLevel: "high",
    expectedReturn: 12,
    partPrice: 500,
    totalParts: 200,
    soldParts: 80,
    fundingProgress: 40,
    investors: [
      {
        investorId: "inv-2",
        amount: 30000,
        parts: 60,
        date: new Date("2023-10-15")
      },
      {
        investorId: "inv-1",
        amount: 10000,
        parts: 20,
        date: new Date("2023-10-20")
      }
    ]
  },
  {
    id: "claim-5",
    pmeId: "pme-3",
    pmeName: "Logistique Express",
    title: "Flotte de véhicules",
    amount: 60000,
    dueDate: new Date("2024-05-15"),
    description: "Financement pour l'acquisition de nouveaux véhicules de livraison",
    clientName: "Auto Fleet Services",
    documents: [
      {
        id: "doc-15",
        name: "Devis_Vehicules.pdf",
        type: "Quote",
        url: "/documents/devis_vehicules.pdf",
        uploadedAt: new Date("2023-11-01"),
        status: "pending"
      }
    ],
    status: "pending",
    createdAt: new Date("2023-11-01"),
    riskLevel: "medium",
    expectedReturn: 8.5,
    partPrice: 200,
    totalParts: 300,
    soldParts: 0,
    fundingProgress: 0,
    investors: []
  }
];

// Mock Investissements
export const mockInvestments = mockClaims
  .flatMap(claim => 
    (claim.investors || []).map(investor => ({
      id: `investment-${claim.id}-${investor.investorId}`,
      investorId: investor.investorId,
      claimId: claim.id,
      pmeId: claim.pmeId,
      amount: investor.amount,
      parts: investor.parts,
      date: investor.date,
      expectedReturn: Math.round(investor.amount * claim.expectedReturn / 100),
      expectedPaymentDate: claim.dueDate
    }))
  );

// Mock Transactions
export const mockTransactions = [
  ...mockInvestments.map((investment, index) => ({
    id: `tx-investment-${index}`,
    type: "investment",
    amount: investment.amount,
    date: investment.date,
    status: "completed",
    from: investment.investorId,
    to: investment.pmeId,
    description: `Investissement dans ${mockClaims.find(c => c.id === investment.claimId)?.title}`,
    reference: `INV-${new Date().getFullYear()}-${1000 + index}`
  })),
  // Ajout de quelques remboursements simulés
  {
    id: "tx-repayment-1",
    type: "repayment",
    amount: 32500,
    date: new Date("2023-08-15"),
    status: "completed",
    from: "pme-1",
    to: "inv-1",
    description: "Remboursement Financement projet IoT avec intérêts",
    reference: "REP-2023-1001"
  },
  {
    id: "tx-repayment-2",
    type: "repayment",
    amount: 21400,
    date: new Date("2023-09-01"),
    status: "completed",
    from: "pme-1",
    to: "inv-2",
    description: "Remboursement Financement projet IoT avec intérêts",
    reference: "REP-2023-1002"
  }
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: "notif-1",
    userId: "user-5",
    title: "Nouvel investissement confirmé",
    message: "Votre investissement de 10,000€ dans 'Développement application mobile' a été confirmé.",
    date: new Date("2023-08-15T10:30:00"),
    read: true,
    type: "investment"
  },
  {
    id: "notif-2",
    userId: "user-5",
    title: "Paiement reçu",
    message: "Vous avez reçu un paiement de 32,500€ pour le remboursement de 'Financement projet IoT'.",
    date: new Date("2023-08-15T14:45:00"),
    read: false,
    type: "payment"
  },
  {
    id: "notif-3",
    userId: "user-2",
    title: "Financement complété",
    message: "Votre demande de financement 'Développement application mobile' a été entièrement financée.",
    date: new Date("2023-08-20T09:15:00"),
    read: true,
    type: "funding"
  },
  {
    id: "notif-4",
    userId: "user-6",
    title: "Opportunité d'investissement",
    message: "Une nouvelle opportunité d'investissement correspondant à vos préférences est disponible.",
    date: new Date("2023-09-05T16:20:00"),
    read: false,
    type: "opportunity"
  },
  {
    id: "notif-5",
    userId: "user-3",
    title: "Document vérifié",
    message: "Votre document 'Facture_Equipement.pdf' a été vérifié avec succès.",
    date: new Date("2023-09-02T11:10:00"),
    read: true,
    type: "document"
  },
  {
    id: "notif-6",
    userId: "user-1",
    title: "Nouvelle PME inscrite",
    message: "Logistique Express vient de s'inscrire sur la plateforme.",
    date: new Date("2023-03-10T15:30:00"),
    read: false,
    type: "admin"
  }
];
