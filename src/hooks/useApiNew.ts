import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as authService from "@/api/authService";
import * as pmeService from "@/api/pmeService";
import * as investisseurService from "@/api/investisseurService";
import * as adminService from "@/api/adminService";
import { toast } from "sonner";

// Auth hooks
export const useLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      queryClient.setQueryData(['currentUser'], data.user);
      toast.success('Connexion réussie');
    },
    onError: (error: any) => {
      toast.error(`Échec de la connexion: ${error.message}`);
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      queryClient.setQueryData(['currentUser'], data.user);
      toast.success('Inscription réussie');
    },
    onError: (error: any) => {
      toast.error(`Échec de l'inscription: ${error.message}`);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      queryClient.clear();
      toast.success('Déconnexion réussie');
    },
    onError: (error: any) => {
      toast.error(`Échec de la déconnexion: ${error.message}`);
    },
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: authService.getCurrentUser,
    retry: false,
  });
};

// PME hooks
export const usePMECreances = () => {
  return useQuery({
    queryKey: ['pme-creances'],
    queryFn: pmeService.getPMECreances,
  });
};

export const useCreateCreance = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: pmeService.createCreance,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pme-creances'] });
      toast.success('Créance créée avec succès');
    },
    onError: (error: any) => {
      toast.error(`Erreur lors de la création: ${error.message}`);
    },
  });
};

// Investisseur hooks
export const useInvestisseurCreances = () => {
  return useQuery({
    queryKey: ['investisseur-creances'],
    queryFn: investisseurService.getCreancesDisponibles,
  });
};

export const useAcheterParts = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: investisseurService.acheterParts,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['investisseur-creances'] });
      queryClient.invalidateQueries({ queryKey: ['investissements'] });
      toast.success('Achat de parts effectué avec succès');
    },
    onError: (error: any) => {
      toast.error(`Erreur lors de l'achat: ${error.message}`);
    },
  });
};

export const useInvestissements = () => {
  return useQuery({
    queryKey: ['investissements'],
    queryFn: investisseurService.getInvestissements,
  });
};

export const useRemboursements = () => {
  return useQuery({
    queryKey: ['remboursements'],
    queryFn: investisseurService.getRemboursements,
  });
};

export const useReclamerRemboursement = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: investisseurService.reclamerRemboursement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['remboursements'] });
      toast.success('Remboursement réclamé avec succès');
    },
    onError: (error: any) => {
      toast.error(`Erreur: ${error.message}`);
    },
  });
};

// Admin hooks
export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: adminService.getDashboardStats,
  });
};

export const useAllPMEs = () => {
  return useQuery({
    queryKey: ['admin-pmes'],
    queryFn: adminService.getAllPMEs,
  });
};

export const useAllCreances = () => {
  return useQuery({
    queryKey: ['admin-creances'],
    queryFn: adminService.getAllCreances,
  });
};

export const useAllInvestisseurs = () => {
  return useQuery({
    queryKey: ['admin-investisseurs'],
    queryFn: adminService.getAllInvestisseurs,
  });
};

export const useValiderPME = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: adminService.validerPME,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-pmes'] });
      toast.success('PME validée avec succès');
    },
    onError: (error: any) => {
      toast.error(`Erreur: ${error.message}`);
    },
  });
};

export const useValiderCreance = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: adminService.validerCreance,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-creances'] });
      toast.success('Créance validée avec succès');
    },
    onError: (error: any) => {
      toast.error(`Erreur: ${error.message}`);
    },
  });
};