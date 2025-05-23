
import { usePMEHooks, useInvestorHooks, useClaimHooks, useInvestmentHooks, useTransactionHooks, useNotificationHooks, usePMEActions, useInvestorActions } from '@/api/templates/hookTemplates';

// Export all hooks for easy access
export const useApi = () => {
  const pmeHooks = usePMEHooks();
  const investorHooks = useInvestorHooks();
  const claimHooks = useClaimHooks();
  const investmentHooks = useInvestmentHooks();
  const transactionHooks = useTransactionHooks();
  const notificationHooks = useNotificationHooks();
  
  const pmeActions = usePMEActions();
  const investorActions = useInvestorActions();

  return {
    // CRUD operations
    pmes: pmeHooks,
    investors: investorHooks,
    claims: claimHooks,
    investments: investmentHooks,
    transactions: transactionHooks,
    notifications: notificationHooks,
    
    // Specific actions
    actions: {
      pme: pmeActions,
      investor: investorActions,
    }
  };
};

// Example usage hook
export const useEntityManager = <T>(entityType: 'pmes' | 'investors' | 'claims' | 'investments' | 'transactions' | 'notifications') => {
  const api = useApi();
  
  return {
    getAll: api[entityType].useGetAll,
    getById: api[entityType].useGetById,
    create: api[entityType].useCreate,
    update: api[entityType].useUpdate,
    delete: api[entityType].useDelete,
  };
};
