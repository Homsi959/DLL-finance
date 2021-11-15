import { Box, Grid } from '@material-ui/core';
import { Button, Pagination, TabPanel } from 'components';
import { QuotaFilterForm } from './QuotaFilterForm';
import { Tabs, useTabs } from 'components/Tabs';
import { useQuotaData } from './useQuotaData';
import { useTranslation } from 'react-i18next';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { QuotasTable } from './QuotasTable';
import theme from '../../../theme';
import SwipeableViews from 'react-swipeable-views';

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
  const { tabIndex, onChangeTabIndex, onChangeTab } = tabsProps;

  const { filter, paging, ...tableProps } = useQuotaData(tabIndex);
  const filterProps = {
    ...filter,
    tabIndex,
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="flex-end">
        <Box>
          <Tabs {...tabsProps} value={tabIndex} onChangeTab={onChangeTab} />
        </Box>
        <Box>
          <Button variant="contained" to="/calculator">
            {t('Buttons.AddQuota')}
          </Button>
        </Box>
      </Box>
      <SwipeableViews
        containerStyle={{
          transition: 'transform 0.6s ease-out 0s',
        }}
        springConfig={{ duration: '0.6s', easeFunction: 'transform 0.6s ease-out 0s', delay: '0s' }}
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={tabIndex}
        onChangeIndex={onChangeTabIndex}
      >
        <TabPanel value={tabIndex} index={0} dir={theme.direction}>
          <Box mt={1} mb={2.5}>
            <QuotaFilterForm {...filterProps} />
          </Box>
          <Grid container direction="column">
            <Grid className={classes.table} item>
              <QuotasTable {...tableProps} />
            </Grid>
            <Grid item>
              <Pagination {...paging} />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={tabIndex} index={1} dir={theme.direction}>
          <Box mt={1} mb={2.5}>
            <QuotaFilterForm {...filterProps} />
          </Box>
          <Grid container direction="column">
            <Grid className={classes.table} item>
              <QuotasTable {...tableProps} />
            </Grid>
            <Grid item>
              <Pagination {...paging} />
            </Grid>
          </Grid>
        </TabPanel>
      </SwipeableViews>
    </>
  );
};
