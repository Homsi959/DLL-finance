import { Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Pagination } from 'components';
import { GroupFilterForm } from './GroupFilterForm';
import { GroupDataGrid } from './GroupDataGrid';
import { useGroupsQuery } from './useGroupsQuery';
import { useTranslation } from 'react-i18next';

export const GroupList = () => {
  const { groups, loading, paging, filter } = useGroupsQuery();

  const { t } = useTranslation();

  return (
    <Grid container spacing={2} direction="column">
      <Grid container item justify="space-between" alignItems="center">
        <Grid item>
          <GroupFilterForm {...filter} />
        </Grid>
        <Grid item>
          <Button color="primary" variant="contained" component={Link} to="/users/groups/create">
            {t('Buttons.NewGroup')}
          </Button>
        </Grid>
      </Grid>
      <Grid container item direction="column">
        <Grid item>
          <GroupDataGrid groups={groups} loading={loading} />
        </Grid>
        <Grid item>
          <Pagination {...paging} />
        </Grid>
      </Grid>
    </Grid>
  );
};
