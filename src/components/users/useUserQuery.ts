import { useCallback } from 'react';
import { useQuery } from 'react-query';
import { useUserAuth } from 'services/authentication';
import { IDENTITY_CONFIG } from 'services/authentication/AuthenticationConfig';
import { UserViewModel } from './types';

export const useUserQuery = (id: string) => {
  const { user } = useUserAuth();
  const accessToken = user?.access_token;

  const getUser = useCallback(async () => {
    const requestUrl = `${IDENTITY_CONFIG.authority}/api/v1/user/${id}`;
    const response = await fetch(requestUrl, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const user: UserViewModel = await response.json();
    return user;
  }, [accessToken, id]);

  const query = useQuery(['user', id], getUser, {
    enabled: !!accessToken,
    keepPreviousData: true,
    refetchInterval: false,
  });

  const { data, ...rest } = query;

  return {
    ...rest,
    user: data,
  };
};
