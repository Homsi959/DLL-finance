import { useCallback } from 'react';
import { useQuery } from 'react-query';
import { GroupUsersViewModel } from 'schema/serverTypes';
import { useUserAuth } from 'services/authentication';
import { IDENTITY_CONFIG } from 'services/authentication/AuthenticationConfig';

export const useGroupQuery = (id: number) => {
  const { user } = useUserAuth();
  const accessToken = user?.access_token;

  const getGroup = useCallback(async () => {
    const requestUrl = `${IDENTITY_CONFIG.authority}/api/v1/groups/${id}`;
    const response = await fetch(requestUrl, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const group: GroupUsersViewModel = await response.json();
    return group;
  }, [accessToken, id]);

  const query = useQuery(['group', id], getGroup, {
    enabled: !!accessToken,
    keepPreviousData: true,
    refetchInterval: false,
  });

  const { data: group, ...rest } = query;

  return {
    ...rest,
    group,
  };
};

export type UseGroupQueryReturn = ReturnType<typeof useGroupQuery>;
