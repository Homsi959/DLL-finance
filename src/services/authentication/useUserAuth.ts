import { useAuth } from './useAuth';

export const useUserAuth = () => {
  const context = useAuth();

  if (!context) {
    throw new Error(
      'UserManagerProvider context is undefined, please verify you are calling useUserAuth() as child of a <UserManagerProvider> component.'
    );
  }

  return context;
};
