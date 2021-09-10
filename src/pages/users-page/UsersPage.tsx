import { Route, useRouteMatch } from 'react-router-dom';
import { UserList, UserEditFormPanel, PrivateRoute } from 'components';

export const UsersPage = () => {
  const { path } = useRouteMatch();
  const userPath = `/users/view/:id`;

  return (
    <Route path="/users">
      <PrivateRoute path={path} component={UserList} role="admin" />
      <PrivateRoute path={userPath} component={UserEditFormPanel} exact />
    </Route>
  );
};
