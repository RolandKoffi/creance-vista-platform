
import { User, PME, Investor, Claim, Investment, Transaction, Notification, SystemSettings } from '../types';

// Génération d'ID uniquement pour les mocks
const generateId = () => Math.random().toString(36).substring(2, 15);

// Users
export const mockUsers: User[] = [
  {
    id: 'admin-1',
    email: 'admin@creances.com',
    name: 'Admin Principal',
    role: 'admin',
    createdAt: new Date('2023-01-01'),
    profileCompleted: true
  },
  {
    id: 'pme-1',
    email: 'contact@entreprise1.com',
    name: 'Entreprise Alpha',
    role: 'pme',
    createdAt: new Date('2023-02-15'),
    profileCompleted: true
  },
  {
    id: 'pme-2',
    email: 'contact@entreprise2.com',
    name: 'Entreprise Beta',
    role: 'pme',
    createdAt: new Date('2023-03-10'),
    profileCompleted: true
  },
  {
    id: 'pme-3',
    email: 'contact@entreprise3.com',
    name: 'Entreprise Gamma',
    role: 'pme',
    createdAt: new Date('2023-04-05'),
    profileCompleted: false
  },
  {
    id: 'investor-1',
    email: 'investisseur1@mail.com',
    name: 'Jean Dupont',
    role: 'investor',
    createdAt: new Date('2023-02-20'),
    profileCompleted: true
  },
  {
    id: 'investor-2',
    email: 'investisseur2@mail.com',
    name: 'Marie Martin',
    role: 'investor',
    createdAt: new Date('2023-03-15'),
    profileCompleted: true
  },
  {
    id: 'investor-3',
    email: 'investisseur3@mail.com',
    name: 'Pierre Leroy',
    role: 'investor',
    createdAt: new Date('2023-04-10'),
    profileCompleted: false
  }
];

// PMEs
export const mockPMEs: PME[] = [
  {
    id: 'pme-1',
    userId: 'pme-1',
    companyName: 'Entreprise Alpha SARL',
    siret: '12345678901234',
    address: '123 Avenue des Affaires, 75001 Paris',
    contactPerson: 'Michel Directeur',
    phone: '0123456789',
    isVerified: true,
    createdAt: new Date('2023-02-15'),
    documents: [
      {
        id: generateId(),
        name: 'Kbis',
        type: 'pdf',
        url: '/documents/kbis-alpha.pdf',
        uploadedAt: new Date('2023-02-15'),
        status: 'verified'
      },
      {
        id: generateId(),
        name: 'Pièce d\'identité',
        type: 'jpg',
        url: '/documents/id-alpha.jpg',
        uploadedAt: new Date('2023-02-15'),
        status: 'verified'
      }
    ]
  },
  {
    id: 'pme-2',
    userId: 'pme-2',
    companyName: 'Entreprise Beta SAS',
    siret: '98765432109876',
    address: '456 Rue du Commerce, 69002 Lyon',
    contactPerson: 'Sophie Manager',
    phone: '0987654321',
    isVerified: true,
    createdAt: new Date('2023-03-10'),
    documents: [
      {
        id: generateId(),
        name: 'Kbis',
        type: 'pdf',
        url: '/documents/kbis-beta.pdf',
        uploadedAt: new Date('2023-03-10'),
        status: 'verified'
      },
      {
        id: generateId(),
        name: 'Pièce d\'identité',
        type: 'jpg',
        url: '/documents/id-beta.jpg',
        uploadedAt: new Date('2023-03-10'),
        status: 'verified'
      }
    ]
  },
  {
    id: 'pme-3',
    userId: 'pme-3',
    companyName: 'Entreprise Gamma EURL',
    siret: '45678901234567',
    address: '789 Boulevard des Entreprises, 33000 Bordeaux',
    contactPerson: 'Thomas Gérant',
    phone: '0567890123',
    isVerified: false,
    createdAt: new Date('2023-04-05'),
    documents: [
      {
        id: generateId(),
        name: 'Kbis',
        type: 'pdf',
        url: '/documents/kbis-gamma.pdf',
        uploadedAt: new Date('2023-04-05'),
        status: 'pending'
      }
    ]
  }
];

// Investors
export const mockInvestors: Investor[] = [
  {
    id: 'investor-1',
    userId: 'investor-1',
    firstName: 'Jean',
    lastName: 'Dupont',
    idNumber: 'FR12345678',
    phone: '0612345678',
    address: '10 Rue des Investisseurs, 75008 Paris',
    isVerified: true,
    createdAt: new Date('2023-02-20'),
    documents: [
      {
        id: generateId(),
        name: 'Pièce d\'identité',
        type: 'jpg',
        url: '/documents/id-jean.jpg',
        uploadedAt: new Date('2023-02-20'),
        status: 'verified'
      },
      {
        id: generateId(),
        name: 'Justificatif de domicile',
        type: 'pdf',
        url: '/documents/address-jean.pdf',
        uploadedAt: new Date('2023-02-20'),
        status: 'verified'
      }
    ]
  },
  {
    id: 'investor-2',
    userId: 'investor-2',
    firstName: 'Marie',
    lastName: 'Martin',
    idNumber: 'FR87654321',
    phone: '0698765432',
    address: '20 Avenue des Placements, 69003 Lyon',
    isVerified: true,
    createdAt: new Date('2023-03-15'),
    documents: [
      {
        id: generateId(),
        name: 'Pièce d\'identité',
        type: 'jpg',
        url: '/documents/id-marie.jpg',
        uploadedAt: new Date('2023-03-15'),
        status: 'verified'
      },
      {
        id: generateId(),
        name: 'Justificatif de domicile',
        type: 'pdf',
        url: '/documents/address-marie.pdf',
        uploadedAt: new Date('2023-03-15'),
        status: 'verified'
      }
    ]
  },
  {
    id: 'investor-3',
    userId: 'investor-3',
    firstName: 'Pierre',
    lastName: 'Leroy',
    idNumber: 'FR56781234',
    phone: '0678901234',
    address: '30 Boulevard des Finances, 33000 Bordeaux',
    isVerified: false,
    createdAt: new Date('2023-04-10'),
    documents: [
      {
        id: generateId(),
        name: 'Pièce d\'identité',
        type: 'jpg',
        url: '/documents/id-pierre.jpg',
        uploadedAt: new Date('2023-04-10'),
        status: 'pending'
      }
    ]
  }
];

// Claims
export const mockClaims: Claim[] = [
  {
    id: 'claim-1',
    pmeId: 'pme-1',
    pmeName: 'Entreprise Alpha SARL',
    title: 'Facture Client Premium',
    amount: 50000,
    dueDate: new Date('2023-07-15'),
    description: 'Facture pour services fournis à notre client premium, échéance à 90 jours.',
    documents: [
      {
        id: generateId(),
        name: 'Facture',
        type: 'pdf',
        url: '/documents/facture-alpha1.pdf',
        uploadedAt: new Date('2023-04-15'),
        status: 'verified'
      },
      {
        id: generateId(),
        name: 'Bon de commande',
        type: 'pdf',
        url: '/documents/bc-alpha1.pdf',
        uploadedAt: new Date('2023-04-15'),
        status: 'verified'
      }
    ],
    status: 'active',
    createdAt: new Date('2023-04-15'),
    totalParts: 100,
    soldParts: 75,
    partPrice: 500,
    riskLevel: 'low',
    expectedReturn: 7,
    fundingProgress: 75
  },
  {
    id: 'claim-2',
    pmeId: 'pme-1',
    pmeName: 'Entreprise Alpha SARL',
    title: 'Contrat Annuel Services',
    amount: 30000,
    dueDate: new Date('2023-09-30'),
    description: 'Contrat de service annuel avec paiement différé, échéance à 120 jours.',
    documents: [
      {
        id: generateId(),
        name: 'Contrat',
        type: 'pdf',
        url: '/documents/contrat-alpha2.pdf',
        uploadedAt: new Date('2023-05-10'),
        status: 'verified'
      }
    ],
    status: 'active',
    createdAt: new Date('2023-05-10'),
    totalParts: 60,
    soldParts: 20,
    partPrice: 500,
    riskLevel: 'medium',
    expectedReturn: 8.5,
    fundingProgress: 33
  },
  {
    id: 'claim-3',
    pmeId: 'pme-2',
    pmeName: 'Entreprise Beta SAS',
    title: 'Projet Gouvernemental',
    amount: 80000,
    dueDate: new Date('2023-10-15'),
    description: 'Projet avec une institution gouvernementale, paiement sécurisé mais délai long.',
    documents: [
      {
        id: generateId(),
        name: 'Contrat Public',
        type: 'pdf',
        url: '/documents/contrat-beta1.pdf',
        uploadedAt: new Date('2023-05-20'),
        status: 'verified'
      },
      {
        id: generateId(),
        name: 'Attestation',
        type: 'pdf',
        url: '/documents/attestation-beta1.pdf',
        uploadedAt: new Date('2023-05-20'),
        status: 'verified'
      }
    ],
    status: 'active',
    createdAt: new Date('2023-05-20'),
    totalParts: 160,
    soldParts: 160,
    partPrice: 500,
    riskLevel: 'low',
    expectedReturn: 6,
    fundingProgress: 100
  },
  {
    id: 'claim-4',
    pmeId: 'pme-2',
    pmeName: 'Entreprise Beta SAS',
    title: 'Expansion Internationale',
    amount: 100000,
    dueDate: new Date('2023-11-30'),
    description: 'Facture pour un client international avec un délai de paiement de 120 jours.',
    documents: [
      {
        id: generateId(),
        name: 'Facture Export',
        type: 'pdf',
        url: '/documents/facture-beta2.pdf',
        uploadedAt: new Date('2023-06-01'),
        status: 'verified'
      },
      {
        id: generateId(),
        name: 'Contrat',
        type: 'pdf',
        url: '/documents/contrat-beta2.pdf',
        uploadedAt: new Date('2023-06-01'),
        status: 'verified'
      }
    ],
    status: 'pending',
    createdAt: new Date('2023-06-01'),
    totalParts: 200,
    soldParts: 0,
    partPrice: 500,
    riskLevel: 'high',
    expectedReturn: 10,
    fundingProgress: 0
  },
  {
    id: 'claim-5',
    pmeId: 'pme-3',
    pmeName: 'Entreprise Gamma EURL',
    title: 'Projet Innovation R&D',
    amount: 45000,
    dueDate: new Date('2023-08-30'),
    description: 'Subvention pour projet de recherche et développement avec paiement en fin de projet.',
    documents: [
      {
        id: generateId(),
        name: 'Convention',
        type: 'pdf',
        url: '/documents/convention-gamma1.pdf',
        uploadedAt: new Date('2023-06-05'),
        status: 'pending'
      }
    ],
    status: 'pending',
    createdAt: new Date('2023-06-05'),
    totalParts: 90,
    soldParts: 0,
    partPrice: 500,
    riskLevel: 'medium',
    expectedReturn: 9,
    fundingProgress: 0
  }
];

// Investments
export const mockInvestments: Investment[] = [
  {
    id: 'investment-1',
    investorId: 'investor-1',
    claimId: 'claim-1',
    pmeId: 'pme-1',
    amount: 10000,
    parts: 20,
    date: new Date('2023-04-20'),
    status: 'completed',
    paymentMethod: 'card',
    expectedReturn: 700,
    expectedPaymentDate: new Date('2023-07-15')
  },
  {
    id: 'investment-2',
    investorId: 'investor-2',
    claimId: 'claim-1',
    pmeId: 'pme-1',
    amount: 15000,
    parts: 30,
    date: new Date('2023-04-22'),
    status: 'completed',
    paymentMethod: 'mobile_money',
    expectedReturn: 1050,
    expectedPaymentDate: new Date('2023-07-15')
  },
  {
    id: 'investment-3',
    investorId: 'investor-1',
    claimId: 'claim-2',
    pmeId: 'pme-1',
    amount: 5000,
    parts: 10,
    date: new Date('2023-05-15'),
    status: 'completed',
    paymentMethod: 'card',
    expectedReturn: 425,
    expectedPaymentDate: new Date('2023-09-30')
  },
  {
    id: 'investment-4',
    investorId: 'investor-2',
    claimId: 'claim-3',
    pmeId: 'pme-2',
    amount: 25000,
    parts: 50,
    date: new Date('2023-05-25'),
    status: 'completed',
    paymentMethod: 'bank_transfer',
    expectedReturn: 1500,
    expectedPaymentDate: new Date('2023-10-15')
  },
  {
    id: 'investment-5',
    investorId: 'investor-1',
    claimId: 'claim-3',
    pmeId: 'pme-2',
    amount: 20000,
    parts: 40,
    date: new Date('2023-05-26'),
    status: 'completed',
    paymentMethod: 'card',
    expectedReturn: 1200,
    expectedPaymentDate: new Date('2023-10-15')
  }
];

// Transactions
export const mockTransactions: Transaction[] = [
  {
    id: generateId(),
    type: 'investment',
    amount: 10000,
    date: new Date('2023-04-20'),
    status: 'completed',
    userId: 'investor-1',
    claimId: 'claim-1',
    investmentId: 'investment-1'
  },
  {
    id: generateId(),
    type: 'investment',
    amount: 15000,
    date: new Date('2023-04-22'),
    status: 'completed',
    userId: 'investor-2',
    claimId: 'claim-1',
    investmentId: 'investment-2'
  },
  {
    id: generateId(),
    type: 'disbursement',
    amount: 37500,
    date: new Date('2023-04-25'),
    status: 'completed',
    userId: 'pme-1',
    claimId: 'claim-1',
    notes: 'Financement partiel (75%)'
  },
  {
    id: generateId(),
    type: 'investment',
    amount: 5000,
    date: new Date('2023-05-15'),
    status: 'completed',
    userId: 'investor-1',
    claimId: 'claim-2',
    investmentId: 'investment-3'
  },
  {
    id: generateId(),
    type: 'investment',
    amount: 25000,
    date: new Date('2023-05-25'),
    status: 'completed',
    userId: 'investor-2',
    claimId: 'claim-3',
    investmentId: 'investment-4'
  },
  {
    id: generateId(),
    type: 'investment',
    amount: 20000,
    date: new Date('2023-05-26'),
    status: 'completed',
    userId: 'investor-1',
    claimId: 'claim-3',
    investmentId: 'investment-5'
  },
  {
    id: generateId(),
    type: 'disbursement',
    amount: 10000,
    date: new Date('2023-05-20'),
    status: 'completed',
    userId: 'pme-1',
    claimId: 'claim-2',
    notes: 'Financement partiel (33%)'
  },
  {
    id: generateId(),
    type: 'disbursement',
    amount: 80000,
    date: new Date('2023-05-27'),
    status: 'completed',
    userId: 'pme-2',
    claimId: 'claim-3',
    notes: 'Financement complet'
  }
];

// Notifications
export const mockNotifications: Notification[] = [
  {
    id: generateId(),
    userId: 'admin-1',
    title: 'Nouvelle PME inscrite',
    message: 'Entreprise Gamma EURL vient de s\'inscrire et nécessite une vérification.',
    type: 'info',
    read: false,
    date: new Date('2023-04-05')
  },
  {
    id: generateId(),
    userId: 'admin-1',
    title: 'Nouvelle créance à valider',
    message: 'Entreprise Beta SAS a soumis une nouvelle créance "Expansion Internationale" pour validation.',
    type: 'info',
    read: false,
    date: new Date('2023-06-01')
  },
  {
    id: generateId(),
    userId: 'pme-1',
    title: 'Créance validée',
    message: 'Votre créance "Facture Client Premium" a été approuvée et est maintenant disponible pour les investisseurs.',
    type: 'success',
    read: true,
    date: new Date('2023-04-16')
  },
  {
    id: generateId(),
    userId: 'pme-1',
    title: 'Financement à 75%',
    message: 'Votre créance "Facture Client Premium" est financée à 75%. Les fonds sont disponibles pour retrait.',
    type: 'success',
    read: false,
    date: new Date('2023-04-25')
  },
  {
    id: generateId(),
    userId: 'pme-2',
    title: 'Créance financée à 100%',
    message: 'Votre créance "Projet Gouvernemental" a été entièrement financée. Les fonds sont disponibles pour retrait.',
    type: 'success',
    read: true,
    date: new Date('2023-05-27')
  },
  {
    id: generateId(),
    userId: 'investor-1',
    title: 'Investissement confirmé',
    message: 'Votre investissement de 10 000€ dans "Facture Client Premium" a été confirmé.',
    type: 'success',
    read: true,
    date: new Date('2023-04-20')
  },
  {
    id: generateId(),
    userId: 'investor-2',
    title: 'Nouvelle opportunité d\'investissement',
    message: 'Une nouvelle créance à faible risque est disponible : "Projet Gouvernemental" avec un rendement de 6%.',
    type: 'info',
    read: true,
    date: new Date('2023-05-21')
  },
  {
    id: generateId(),
    userId: 'investor-2',
    title: 'Paiement attendu prochainement',
    message: 'Le remboursement de votre investissement dans "Facture Client Premium" est prévu pour le 15 juillet 2023.',
    type: 'info',
    read: false,
    date: new Date('2023-06-15')
  }
];

// System Settings
export const mockSystemSettings: SystemSettings = {
  platformFees: 3.5, // 3.5%
  minimumInvestment: 500, // 500€
  minimumClaimAmount: 5000, // 5000€
  defaultDiscount: 5, // 5%
  paymentMethods: ['card', 'mobile_money', 'bank_transfer']
};
