import { Box, Grid } from '@material-ui/core';
import { Pagination, Button } from 'components';
import { GroupFilterForm } from './GroupFilterForm';
import { GroupTable } from './GroupTable';
import { useGroupsQuery } from './useGroupsQuery';
import { useTranslation } from 'react-i18next';

export const GroupList = () => {
  const { groups, loading, paging, filter, sorting } = useGroupsQuery();

  const { t } = useTranslation();

  return (
    <>
      <Box display="flex" justifyContent="space-between" mb={2.5} mt={1} alignItems="flex-end">
        <Box>
          <GroupFilterForm {...filter} />
        </Box>
        <Box>
          <Button color="primary" variant="contained2" to="/users/groups/create">
            {t('Buttons.NewGroup')}
          </Button>
        </Box>
      </Box>
      <Grid container direction="column">
        <Grid item>
          <GroupTable groups={groups} loading={loading} sorting={sorting} />
        </Grid>
        <Grid item>
          <Pagination {...paging} />
        </Grid>
      </Grid>
    </>
  );
};
