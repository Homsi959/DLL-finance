import { Requisite } from 'schema/serverTypes';
import { useCounterpartiesBackendQuery } from 'services';
import { useDebounce } from 'use-debounce';

export const useBankSearchQuery = (input?: string) => {
  const [bic] = useDebounce(input ?? '', 500);

  const searchParams = new URLSearchParams();
  if (bic.length > 0) {
    searchParams.set('bic', bic);
  }
  const requestUrl = `search/banks?${searchParams}`;

  return useCounterpartiesBackendQuery<Requisite[]>(requestUrl, requestUrl, {
    enabled: bic.length > 0,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};
