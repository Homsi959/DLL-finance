import { useQuotasDictionaryBackendQuery } from 'services';
import { Cof } from 'schema/serverTypes';

const LastUpdatedCurrency = 'cofs';

export const useCofsQuery = () => {
  return useQuotasDictionaryBackendQuery<Cof[]>(LastUpdatedCurrency);
};
