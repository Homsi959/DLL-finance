import { Grid } from '@material-ui/core';
import { Pagination } from 'components';
import { UserFilterForm } from './UserFilterForm';
import { UserTable } from './UserTable';
import { useUsersQuery } from './useUsersQuery';

export const UserList = () => {
  const { paging, filter, users, loading } = useUsersQuery();

  return (
    <Grid container spacing={2} direction="column">
      <Grid container item justify="space-between" alignItems="center">
        <Grid item>
          <UserFilterForm {...filter} />
        </Grid>
      </Grid>
      <Grid container item direction="column">
        <Grid item>
          <UserTable users={users} loading={loading} />
        </Grid>
        <Grid item>
          <Pagination {...paging} />
        </Grid>
      </Grid>
    </Grid>
  );
};
