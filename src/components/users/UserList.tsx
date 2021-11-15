import { Grid, Box } from '@material-ui/core';
import { Pagination } from 'components';
import { UserFilterForm } from './UserFilterForm';
import { UserTable } from './UserTable';
import { useUsersQuery } from './useUsersQuery';

export const UserList = () => {
  const { paging, filter, users, loading, sorting } = useUsersQuery();

  return (
    <Grid container direction="column">
      <Box display="flex" justifyContent="space-between" mb={2.5} mt={1} alignItems="flex-end">
        <UserFilterForm {...filter} />
      </Box>
      <Grid container item direction="column">
        <Grid item>
          <UserTable users={users} loading={loading} sorting={sorting} />
        </Grid>
        <Grid item>
          <Pagination {...paging} />
        </Grid>
      </Grid>
    </Grid>
  );
};
