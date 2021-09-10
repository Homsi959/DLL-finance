import { useCallback } from 'react';
import { useQuery } from 'react-query';
import { useUserAuth } from 'services/authentication';

const createProfileQueryKey = (key: string) => {
  return `profile-${key}`;
};

const MeQueryKey = createProfileQueryKey('me');

type MeQueryResult = {
  id: string;
  name: string;
  role?: string;
  email: string;
};

function getParsedJwt<T extends object = { [k: string]: string | number }>(
  token: string
): T | undefined {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return undefined;
  }
}

export const useMeQuery = () => {
  const { userManager } = useUserAuth();

  const getUser = useCallback(async () => {
    const user = await userManager.getUser();
    if (!user || !user.access_token || !user.profile.email) {
      throw new Error('Invalid user');
    }

    const claims = getParsedJwt<{ role: string | undefined }>(user.access_token);

    const me: MeQueryResult = {
      id: user.profile.sub,
      name: user.profile.name ?? user.profile.email,
      role: claims?.role,
      email: user.profile.email,
    };

    return me;
  }, [userManager]);

  return useQuery(MeQueryKey, getUser);
};
