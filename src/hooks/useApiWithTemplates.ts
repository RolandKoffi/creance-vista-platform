
import { usePMEHooks, useInvestisseurHooks, useCreanceHooks, useAchatPartsHooks, useNotificationHooks, usePMEActions, useCreanceActions } from '@/api/templates/hookTemplates';

// Export all hooks for easy access
export const useApi = () => {
  const pmeHooks = usePMEHooks();
  const investisseurHooks = useInvestisseurHooks();
  const creanceHooks = useCreanceHooks();
  const achatPartsHooks = useAchatPartsHooks();
  const notificationHooks = useNotificationHooks();
  
  const pmeActions = usePMEActions();
  const creanceActions = useCreanceActions();

  return {
    // CRUD operations
    pmes: pmeHooks,
    investisseurs: investisseurHooks,
    creances: creanceHooks,
    achats: achatPartsHooks,
    notifications: notificationHooks,
    
    // Specific actions
    actions: {
      pme: pmeActions,
      creance: creanceActions,
    }
  };
};

// Example usage hook
export const useEntityManager = <T>(entityType: 'pmes' | 'investisseurs' | 'creances' | 'achats' | 'notifications') => {
  const api = useApi();
  
  return {
    getAll: api[entityType].useGetAll,
    getById: api[entityType].useGetById,
    create: api[entityType].useCreate,
    update: api[entityType].useUpdate,
    delete: api[entityType].useDelete,
  };
};
