
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as authService from "@/api/authService";
import * as pmeService from "@/api/pmeService";
import * as investorService from "@/api/investorService";
import * as claimService from "@/api/claimService";
import * as investmentService from "@/api/investmentService";
import * as transactionService from "@/api/transactionService";
import * as notificationService from "@/api/notificationService";
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
    onError: (error) => {
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
    onError: (error) => {
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
    onError: (error) => {
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
export const usePMEs = () => {
  return useQuery({
    queryKey: ['pmes'],
    queryFn: pmeService.getAllPMEs,
  });
};

export const usePME = (id: string) => {
  return useQuery({
    queryKey: ['pmes', id],
    queryFn: () => pmeService.getPMEById(id),
    enabled: !!id,
  });
};

export const useCreatePME = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: pmeService.createPME,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pmes'] });
      toast.success('PME créée avec succès');
    },
  });
};

export const useUpdatePME = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<pmeService.PMERegistrationData> }) => 
      pmeService.updatePME(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['pmes'] });
      queryClient.invalidateQueries({ queryKey: ['pmes', data.id] });
      toast.success('PME mise à jour avec succès');
    },
  });
};

export const useVerifyPME = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: pmeService.verifyPME,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['pmes'] });
      queryClient.invalidateQueries({ queryKey: ['pmes', data.id] });
      toast.success('PME vérifiée avec succès');
    },
  });
};

// Similar hooks for Investors, Claims, Investments, etc. follow the same pattern
export const useInvestors = () => {
  return useQuery({
    queryKey: ['investors'],
    queryFn: investorService.getAllInvestors,
  });
};

export const useClaims = () => {
  return useQuery({
    queryKey: ['claims'],
    queryFn: claimService.getAllClaims,
  });
};

export const usePMEClaims = (pmeId: string) => {
  return useQuery({
    queryKey: ['pmes', pmeId, 'claims'],
    queryFn: () => claimService.getPMEClaims(pmeId),
    enabled: !!pmeId,
  });
};

export const useSubmitClaim = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: claimService.submitClaim,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['claims'] });
      queryClient.invalidateQueries({ queryKey: ['pmes', data.pmeId, 'claims'] });
      toast.success('Créance soumise avec succès');
    },
  });
};

export const useTransactions = () => {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: transactionService.getAllTransactions,
  });
};

export const useNotifications = () => {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: notificationService.getAllNotifications,
  });
};

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: notificationService.markNotificationAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};
