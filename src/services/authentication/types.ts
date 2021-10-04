import { createContext } from 'react';
import {
  AuthProviderProps as OidcAuthProviderProps,
  AuthContextProps as OidcAuthContextProps,
  User,
} from 'oidc-react';

export interface Error {
  errorCode: string | null;
  errorDescription: string | null;
  errorUri: string | null;
  state: string | null;
}

export type AuthProviderProps = OidcAuthProviderProps & {
  onSignInError?: (error: Error | null) => Promise<void> | void;
};

export type AuthContextProps = Omit<OidcAuthContextProps, 'userData'> & {
  user: User | null;
};

export const AuthContext = createContext<AuthContextProps | null>(null);
