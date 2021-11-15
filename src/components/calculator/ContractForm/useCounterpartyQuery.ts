import { useDebounce } from 'use-debounce';
import { useQuotasDictionaryBackendQuery } from 'services';
import { CounterpartyType, CounterpartyAutocompleteOption } from './types';

const Counterparties = 'counterparties';

export type CounterpartyQueryOptions = {
  type: CounterpartyType;
  inputValue?: string;
};

export const useCounterpartyQuery = (props: CounterpartyQueryOptions) => {
  const { type, inputValue } = props;

  const [input] = useDebounce(inputValue, 500);

  var requestUrl = Counterparties;
  const searchParams = new URLSearchParams();

  searchParams.set('type', type);
  searchParams.set('includeHeads', 'true');

  if (input) {
    searchParams.set('name', input);
  }
  requestUrl += `?${searchParams}`;

  const { data: options = [], refetch } =
    useQuotasDictionaryBackendQuery<CounterpartyAutocompleteOption[]>(requestUrl);

  return {
    options,
    refetch,
  };
};
