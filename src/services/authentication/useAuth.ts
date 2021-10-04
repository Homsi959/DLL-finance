import { useContext } from 'react';
import { AuthContext, AuthContextProps } from './types';

export const useAuth = () => {
  return useContext<AuthContextProps | null>(AuthContext);
};
