import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Pagination } from 'components';
import { QuotaFilterForm } from './QuotaFilterForm';
import { Tabs, useTabs } from 'components/Tabs';
import { useQuotaData } from './useQuotaData';
import { ButtonCustomVariant } from 'components';
import { useTranslation } from 'react-i18next';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { QuotasTable } from './QuotasTable';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      '& .MuiTableCell-body': {
        color: theme.palette.secondary.main,
        '& a': {
          color: theme.palette.secondary.main,
        },
      },
    },
  })
);

export const QuotaDataGrid = () => {
  const classes = useStyles();

  const { t } = useTranslation();
  const mine = t('Mine');
  const all = t('All');

  const tabsProps = useTabs([mine, all]);
  const { tabIndex } = tabsProps;

  const { filter, paging, ...tableProps } = useQuotaData(tabIndex);
  const filterProps = {
    ...filter,
    tabIndex,
  };

  return (
    <Grid container spacing={1} direction="column">
      <Grid container item justify="space-between" alignItems="center">
        <Grid item>
          <Tabs {...tabsProps} />
        </Grid>
        <Grid item>
          <ButtonCustomVariant component={Link} to="/calculator">
            {t('Buttons.AddQuota')}
          </ButtonCustomVariant>
        </Grid>
      </Grid>
      <Grid item>
        <QuotaFilterForm {...filterProps} />
      </Grid>
      <Grid container item direction="column">
        <Grid className={classes.table} item>
          <QuotasTable {...tableProps} />
        </Grid>
        <Grid item>
          <Pagination {...paging} />
        </Grid>
      </Grid>
    </Grid>
  );
};
