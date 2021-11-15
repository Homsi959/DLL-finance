import { useQuotasDictionaryBackendQuery } from 'services/api';

export const useSalesPointsQuery = (name: string | null, exceptProducts: string[] | null) => {
  let requestUrl = 'salesPoints';
  const searchParams = new URLSearchParams();

  if (name) {
    searchParams.set('search', name);
  }

  const { data: salesPoints = [] } = useQuotasDictionaryBackendQuery<string[]>(requestUrl);

  console.log(searchParams.toString());

  return {
    salesPoints,
  };
};
