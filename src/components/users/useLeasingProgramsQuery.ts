import { useQuotasDictionaryBackendQuery } from 'services/api';

export const useLeasingProgramsQuery = (name: string | null, exceptProducts: string[] | null) => {
  let requestUrl = 'leasingProducts';
  const searchParams = new URLSearchParams();

  if (name) {
    searchParams.set('search', name);
  }

  const { data: programs = [] } = useQuotasDictionaryBackendQuery<string[]>(requestUrl);

  return {
    programs,
  };
};
