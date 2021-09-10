import { useDebounce } from 'use-debounce';
import { CounterpartyOption, CounterpartyType } from 'schema';
import { useQuotasDictionaryBackendQuery } from 'services';

const Counterparties = 'counterparties';

export const useCounterpartyQuery = (type: CounterpartyType, inputValue?: string) => {
  const [input] = useDebounce(inputValue, 500);

  var requestUrl = Counterparties;
  const searchParams = new URLSearchParams();

  searchParams.set('type', type);

  if (input) {
    searchParams.set('name', input);
  }
  requestUrl += `?${searchParams}`;

  const { data: options = [], refetch } = useQuotasDictionaryBackendQuery<CounterpartyOption[]>(
    requestUrl,
    {
      enabled: (input?.length ?? 0) > 0,
    }
  );

  return {
    options,
    refetch,
  };
};
