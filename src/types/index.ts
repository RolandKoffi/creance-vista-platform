
export interface User {
  id: number;
  email: string;
  role: 'admin' | 'pme' | 'investisseur';
  is_active: boolean;
  last_login?: Date;
  is_deleted: boolean;
  created_at: Date;
  updated_at?: Date;
}

export interface PME {
  id: number;
  user_id: number;
  nom_entreprise: string;
  secteur_activite?: string;
  telephone?: string;
  adresse?: string;
  pays?: string;
  compte_bancaire?: string;
  statut_validation?: 'en_attente' | 'valide' | 'rejete';
  raison_rejet?: string;
  is_deleted: boolean;
  created_at: Date;
  updated_at?: Date;
}

export interface Investisseur {
  id: number;
  user_id: number;
  nom_complet?: string;
  genre?: string;
  pays?: string;
  ville?: string;
  telephone?: string;
  is_deleted: boolean;
  created_at: Date;
  updated_at?: Date;
}

export interface Creance {
  id: number;
  pme_id: number;
  numero_compte?: string;
  client_nom?: string;
  email_client?: string;
  contact_client?: string;
  description?: string;
  montant_total: number;
  nombre_parts: number;
  montant_par_part: number;
  echeance: Date;
  statut?: 'attente' | 'valide' | 'rejetee' | 'annulee' | 'vendue';
  statut_retrait?: 'en_attente' | 'effectue';
  date_retrait?: Date;
  date_validation?: Date;
  date_annulation?: Date;
  is_deleted: boolean;
  created_at: Date;
  updated_at?: Date;
}

export interface AchatParts {
  id: number;
  investisseur_id: number;
  creance_id: number;
  nombre_parts: number;
  montant_total: number;
  methode_paiement?: string;
  statut_paiement?: 'en_attente' | 'valide' | 'echoue';
  url_recu?: string;
  date_achat: Date;
  is_deleted: boolean;
  created_at: Date;
  updated_at?: Date;
}

export interface Remboursement {
  id: number;
  creance_id: number;
  date_reception_fonds?: Date;
  montant_total_recu?: number;
  statut_distribution?: string;
  date_distribution?: Date;
  created_at: Date;
  updated_at?: Date;
}

export interface RemboursementInvestisseur {
  id: number;
  remboursement_id: number;
  investisseur_id: number;
  montant_envoye?: number;
  statut: 'en_attente' | 'reclame' | 'envoye';
  date_reclamation?: Date;
  date_envoi: Date;
  created_at: Date;
  updated_at?: Date;
}

export interface Notification {
  id: number;
  user_id?: number;
  contenu?: string;
  type?: string;
  vue: boolean;
  created_at: Date;
}

export interface Fichier {
  id: number;
  owner_id?: number;
  creance_id?: number;
  nom_fichier?: string;
  url?: string;
  type_fichier?: string;
  owner_profil?: 'pme' | 'investisseur';
  created_at: Date;
  updated_at?: Date;
  is_deleted: boolean;
}

export interface LogUtilisateur {
  id: number;
  user_id: number;
  action: string;
  timestamp: Date;
}

// Legacy interfaces for backward compatibility
export interface Investment extends AchatParts {}
export interface Claim extends Creance {}
export interface Investor extends Investisseur {}
export interface Document extends Fichier {}
export interface Transaction extends LogUtilisateur {}

export interface DashboardStats {
  totalPMEs: number;
  totalInvestors: number;
  totalClaims: number;
  totalInvestments: number;
  totalAmount: number;
  pendingVerifications: number;
}
