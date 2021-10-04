import { CounterpartyViewModel } from 'schema';
import { useCounterpartiesBackendQuery } from 'services';
import { useDebounce } from 'use-debounce';

export const useCounterpartySearchQuery = (input?: string) => {
  const [inn] = useDebounce(input ?? '', 500);

  const searchParams = new URLSearchParams();
  if (inn.length > 0) {
    searchParams.set('inn', inn);
  }
  const requestUrl = `search?${searchParams}`;

  return useCounterpartiesBackendQuery<CounterpartyViewModel[]>(requestUrl, requestUrl, {
    enabled: inn.length > 0,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};
