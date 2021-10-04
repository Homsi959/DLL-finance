import { Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Pagination } from 'components';
import { useCounterpartiesData } from './useCounterpartiesData';
import { useTranslation } from 'react-i18next';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { CounterpartiesFilterForm } from './CounterpartiesFilterForm';
import { CounterpartiesTable } from './CounterpartiesTable';

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
    indicatContent: {
      marginLeft: theme.spacing(1),
    },
    button: {
      '& .MuiButtonBase-root': {
        backgroundColor: theme.palette.common.white,
      },
    },
  })
);

type IndicatorProps = {
  ok: boolean;
};

const Indicator = (props: IndicatorProps) => {
  const { ok } = props;
  const classes = useStyles();

  return <div className={ok ? classes.ok : classes.error}></div>;
};

export const CounterpartiesDataGrid = () => {
  const { filter, paging, ...dataProps } = useCounterpartiesData();
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Grid container spacing={1} direction="column">
      <Grid container item justify="space-between" alignItems="center">
        <Grid item>
          <CounterpartiesFilterForm {...filter} />
        </Grid>
        <Grid className={classes.button} item>
          <Button variant="outlined" color="primary" component={Link} to="/counterparties/create">
            {t('Buttons.AddCounterparty')}
          </Button>
        </Grid>
      </Grid>
      <Grid container item direction="column">
        <Grid item>
          <CounterpartiesTable {...dataProps} />
        </Grid>
        <Grid container className={classes.wrapIndicators}>
          <Grid item className={classes.indicator}>
            <Indicator ok={true} />
            <Grid className={classes.indicatContent}>Заполнен</Grid>
          </Grid>
          <Grid item className={classes.indicator}>
            <Indicator ok={false} />
            <Grid className={classes.indicatContent}>Не заполнен</Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Pagination {...paging} />
        </Grid>
      </Grid>
    </Grid>
  );
};
