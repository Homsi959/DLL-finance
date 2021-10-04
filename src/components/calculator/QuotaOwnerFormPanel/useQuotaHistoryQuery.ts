import { QuotaHistoryWithAvailableOwners } from 'schema';
import { useQuotasBackendQuery } from 'services';

export const useQuotaHistoryQuery = (quotaId: string) => {
  const { data: quota, ...rest } = useQuotasBackendQuery<QuotaHistoryWithAvailableOwners>(
    `${quotaId}/history`,
    ['quotas', quotaId]
  );

  return { quota, ...rest };
};
