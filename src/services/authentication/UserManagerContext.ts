import { createContext } from 'react';
import { AuthContextProps, User } from 'oidc-react';
export interface UserManagerContextProps extends Omit<AuthContextProps, 'userData'> {
  user: User | null;
}

export const UserManagerContext = createContext<UserManagerContextProps | undefined>(undefined);
