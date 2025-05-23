
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { PMEService, InvestorService, ClaimService, InvestmentService, TransactionService, NotificationService } from './entityTemplates';

// Service instances
const pmeService = new PMEService();
const investorService = new InvestorService();
const claimService = new ClaimService();
const investmentService = new InvestmentService();
const transactionService = new TransactionService();
const notificationService = new NotificationService();

// Generic hook template for CRUD operations
export const createCrudHooks = <T>(
  service: any,
  entityName: string,
  queryKey: string
) => {
  const useGetAll = (params?: any) => {
    return useQuery({
      queryKey: [queryKey, params],
      queryFn: () => service.getAll(params),
    });
  };

  const useGetById = (id: string) => {
    return useQuery({
      queryKey: [queryKey, id],
      queryFn: () => service.getById(id),
      enabled: !!id,
    });
  };

  const useCreate = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
      mutationFn: (data: any) => service.create(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
        toast.success(`${entityName} créé(e) avec succès`);
      },
      onError: (error: any) => {
        toast.error(`Erreur lors de la création: ${error.message}`);
      },
    });
  };

  const useUpdate = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
      mutationFn: ({ id, data }: { id: string; data: any }) => service.update(id, data),
      onSuccess: (data: any) => {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
        queryClient.setQueryData([queryKey, data.id], data);
        toast.success(`${entityName} mis(e) à jour avec succès`);
      },
      onError: (error: any) => {
        toast.error(`Erreur lors de la mise à jour: ${error.message}`);
      },
    });
  };

  const useDelete = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
      mutationFn: (id: string) => service.delete(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
        toast.success(`${entityName} supprimé(e) avec succès`);
      },
      onError: (error: any) => {
        toast.error(`Erreur lors de la suppression: ${error.message}`);
      },
    });
  };

  return {
    useGetAll,
    useGetById,
    useCreate,
    useUpdate,
    useDelete,
  };
};

// Specific hooks for each entity
export const usePMEHooks = () => createCrudHooks(pmeService, 'PME', 'pmes');
export const useInvestorHooks = () => createCrudHooks(investorService, 'Investisseur', 'investors');
export const useClaimHooks = () => createCrudHooks(claimService, 'Créance', 'claims');
export const useInvestmentHooks = () => createCrudHooks(investmentService, 'Investissement', 'investments');
export const useTransactionHooks = () => createCrudHooks(transactionService, 'Transaction', 'transactions');
export const useNotificationHooks = () => createCrudHooks(notificationService, 'Notification', 'notifications');

// Custom hooks for specific operations
export const usePMEActions = () => {
  const queryClient = useQueryClient();

  const verify = useMutation({
    mutationFn: (id: string) => pmeService.verify(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pmes'] });
      toast.success('PME vérifiée avec succès');
    },
  });

  const reject = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason?: string }) => pmeService.reject(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pmes'] });
      toast.success('PME rejetée');
    },
  });

  return { verify, reject };
};

export const useInvestorActions = () => {
  const queryClient = useQueryClient();

  const verify = useMutation({
    mutationFn: (id: string) => investorService.verify(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['investors'] });
      toast.success('Investisseur vérifié avec succès');
    },
  });

  const reject = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason?: string }) => investorService.reject(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['investors'] });
      toast.success('Investisseur rejeté');
    },
  });

  return { verify, reject };
};
