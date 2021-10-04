import { useCallback } from 'react';
import { useQuery } from 'react-query';
import { useUserAuth } from 'services/authentication';
import { IDENTITY_CONFIG } from 'services/authentication/AuthenticationConfig';
import { GroupUserViewModel } from './types';

export const useUserSearchQuery = (name: string | null, exceptUserIds: string[] | null) => {
  const { user } = useUserAuth();
  const accessToken = user?.access_token;

  const getGroup = useCallback(async () => {
    let requestUrl = `${IDENTITY_CONFIG.authority}/api/v1/users/search/`;

    if (name || (exceptUserIds ?? []).length > 0) {
      const searchParams = new URLSearchParams();
      if (name || name === '') {
        searchParams.set('name', name);
      }

      (exceptUserIds ?? []).forEach((exceptUserId) =>
        searchParams.append('exceptUserIds', exceptUserId)
      );

      requestUrl += `?${searchParams}`;
    }

    const response = await fetch(requestUrl, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const group: GroupUserViewModel[] = await response.json();
    return group;
  }, [accessToken, name, exceptUserIds]);

  const query = useQuery(['user_search', name, exceptUserIds], getGroup, {
    enabled: !!accessToken,
    keepPreviousData: true,
    refetchInterval: false,
  });

  const { data, ...rest } = query;

  return {
    ...rest,
    users: data ?? [],
  };
};
