import { useDebounce } from 'use-debounce';
import { useQuotasBackendQuery } from 'services';
import { UserViewModel } from 'schema/serverTypes';

const QuotaUsers = 'users';

export const useQuotaOwnersQuery = (inputValue?: string) => {
  const [input] = useDebounce(inputValue, 500);

  var requestUrl = QuotaUsers;
  const searchParams = new URLSearchParams();

  if (input) {
    searchParams.set('name', input);
  }
  requestUrl += `?${searchParams}`;

  const { data: options = [], refetch } = useQuotasBackendQuery<UserViewModel[]>(
    requestUrl,
    ['quotas', 'users'],
    {
      enabled: (input?.length ?? 0) > 0,
    }
  );

  return {
    options,
    refetch,
  };
};
