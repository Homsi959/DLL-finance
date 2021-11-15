import { RoleName } from 'schema/RoleName';
import { useUserAuth } from './useUserAuth';

export const useUserRole = () => {
  const { user } = useUserAuth();

  if (user === null) {
    return {
      role: undefined,
      isAdmin: false,
      isSuperSalesManager: false,
      isSalesManager: false,
      isSalesSupport: false,
    };
  }

  const role = user.profile.role as RoleName;

  return {
    role,
    isAdmin: role === 'admin',
    isSuperSalesManager: role === 'super_sales_manager',
    isSalesManager: role === 'sales_manager',
    isSalesSupport: role === 'sales_support',
  };
};
