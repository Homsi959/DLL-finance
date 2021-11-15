import { Box, Grid } from '@material-ui/core';
import { Pagination } from 'components';
import { useCounterpartiesData } from './useCounterpartiesData';
import { useTranslation } from 'react-i18next';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { CounterpartiesFilterForm } from './CounterpartiesFilterForm';
import { CounterpartiesTable } from './CounterpartiesTable';
import { Button } from 'components';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    ok: {
      backgroundColor: theme.palette.green.main,
      width: '10px',
      height: '10px',
      borderRadius: '50px',
    },
    error: {
      backgroundColor: theme.palette.chartPurple.main,
      width: '10px',
      height: '10px',
      borderRadius: '50px',
    },
    wrapIndicators: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: theme.spacing(2),
    },
    indicator: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: theme.spacing(4),
    },
    indicatorContent: {
      marginLeft: theme.spacing(1),
    },
    filter: {
      display: 'inline-block',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
      alignItems: 'flex-end',
    },
  })
);

type IndicatorOn = {
  on: true;
};

type IndicatorOff = {
  off: true;
};

type IndicatorProps = IndicatorOn | IndicatorOff;

function isOn(indicator: IndicatorOn | IndicatorOff): indicator is IndicatorOn {
  return (indicator as IndicatorOn).on === true;
}

const Indicator = (props: IndicatorProps) => {
  const classes = useStyles();
  const ok = isOn(props);
  return <div className={ok ? classes.ok : classes.error} />;
};

export const CounterpartiesDataGrid = () => {
  const { filter, paging, ...dataProps } = useCounterpartiesData();
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Grid container direction="column">
      <Box mb={2.5} className={classes.filter}>
        <CounterpartiesFilterForm {...filter} />
        <Button variant="contained2" to="/counterparties/create">
          {t('Buttons.AddCounterparty')}
        </Button>
      </Box>
      <Grid container item direction="column">
        <Grid item>
          <CounterpartiesTable {...dataProps} />
        </Grid>
        <Grid container className={classes.wrapIndicators}>
          <Grid item className={classes.indicator}>
            <Indicator on />
            <Grid className={classes.indicatorContent}>{t('Filled')}</Grid>
          </Grid>
          <Grid item className={classes.indicator}>
            <Indicator off />
            <Grid className={classes.indicatorContent}>{t('Not filled')}</Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Pagination {...paging} />
        </Grid>
      </Grid>
    </Grid>
  );
};
