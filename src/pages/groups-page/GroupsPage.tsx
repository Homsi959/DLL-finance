import { Route, Switch } from 'react-router-dom';
import { GroupList, GroupEditFormPanel, GroupCreateFormPanel } from 'components';

export const GroupsPage = () => {
  const groupPath = `/users/groups/:id(\\d+)`;
  const addGroupPath = `/users/groups/create`;

  return (
    <Route path="/users/groups">
      <GroupList />
      <Switch>
        <Route exact path={addGroupPath} component={GroupCreateFormPanel} />
        <Route exact path={groupPath} component={GroupEditFormPanel} />
      </Switch>
    </Route>
  );
};
