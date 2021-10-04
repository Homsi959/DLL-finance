import { Redirect, Route, RouteProps } from 'react-router';
import { useUserAuth } from 'services';
import { LoadingLinearIndicator, PageLayout } from 'components';
import { RoleName } from 'schema';

type PrivateRouteProps = Omit<RouteProps, 'component'> & {
  component: React.ElementType;
  role?: RoleName | RoleName[];
};

export const PrivateRoute = ({ component: Component, role, ...rest }: PrivateRouteProps) => {
  const { isLoading, user } = useUserAuth();

  if (isLoading) {
    return <PageLayout pageContent={<LoadingLinearIndicator />} />;
  }

  if (user === null) {
    return <Redirect to="/login" />;
  }

  const userRole: RoleName | undefined = user.profile.role as RoleName;

  if (role !== undefined) {
    if (Array.isArray(role) && !role.includes(userRole)) {
      return null;
    }
    if (role !== userRole) {
      return null;
    }
  }

  return (
    <Route
      {...rest}
      render={(props) => {
        return <Component {...props} />;
      }}
    />
  );
};
