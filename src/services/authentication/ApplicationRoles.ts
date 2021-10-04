import { RoleName } from 'schema';

const roles = ['admin', 'super_sales_manager', 'sales_manager', 'sales_support'] as const;

type ApplicationRoleNames = {
  [P in RoleName]: string;
} & {
  getRoleName(role: string | undefined): string | undefined;
};

export const ApplicationRoles: ApplicationRoleNames = {
  admin: 'Administrator',
  super_sales_manager: 'Super Sales Manager',
  sales_manager: 'Sales Manager',
  sales_support: 'Sales Support',

  getRoleName: (role: string | undefined) => {
    if (!role) {
      return undefined;
    }

    const existingRole = roles.find((r) => r === role);
    if (existingRole) {
      return ApplicationRoles[existingRole];
    }

    return undefined;
  },
};
