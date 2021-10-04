import { RoleName } from 'schema';
import { useUserAuth } from 'services';

export type RoleProps = {
  role: RoleName | RoleName[];
  children: React.ReactNode;
};

export const Role = (props: RoleProps) => {
  const { role, children } = props;

  const { user, isLoading } = useUserAuth();

  if (user === null || isLoading) {
    return null;
  }

  const userRole: RoleName | undefined = user.profile.role as RoleName;

  if (Array.isArray(role) && !role.includes(userRole)) {
    return null;
  }
  if (role !== userRole) {
    return null;
  }

  return <>{children}</>;
};
