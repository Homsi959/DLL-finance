import { useAuth } from 'oidc-react';
import { UserManagerContext } from './UserManagerContext';

export const UserManagerProvider = (props: React.PropsWithChildren<{}>) => {
  const { userManager, isLoading, userData, ...rest } = useAuth();

  return (
    <UserManagerContext.Provider
      value={{
        isLoading: isLoading,
        userManager,
        user: userData ?? null,
        ...rest,
      }}
    >
      {props.children}
    </UserManagerContext.Provider>
  );
};
