import { makeStyles, createStyles, Grid, Theme } from '@material-ui/core';
import { QuotaPayment } from 'schema';
import { formatNumber } from '../../utils';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      fontSize: '12px',
      fontWeight: 500,
      columns: '9',
      listStyleType: 'none',
      [theme.breakpoints.down('lg')]: {
        columns: '6',
      },
      [theme.breakpoints.down('md')]: {
        columns: '2',
      },
    },
    row: {
      width: 'calc(100% - 8px)',
      height: '40px',
      flexDirection: 'row',
      alignItems: 'flex-start',
      padding: theme.spacing('0px', '8px'),
      margin: theme.spacing('0px', '8px'),
      '&:nth-of-type(2n+1)': {
        background: theme.palette.lightBlue2.main,
      },
    },
    cell: {
      padding: theme.spacing('17px', '10px', '11px'),
      lineHeight: 1,
      '&:nth-child(1)': {
        width: '36px',
        textAlign: 'right',
      },
      '&:nth-child(2)': {
        flexGrow: 1,
      },
    },
    label: {
      fontSize: 'small',
      paddingBottom: theme.spacing(0.8),
    },
  })
);

export type SeasonalPaymentScheduleProps = {
  numberOfMonths: number;
  payments: QuotaPayment[];
};

export const SeasonalPaymentSchedule = (props: SeasonalPaymentScheduleProps) => {
  const classes = useStyles();
  const { payments } = props;

  return (
    <div className={classes.root}>
      {payments.map((payment) => {
        return (
          <Grid container item key={payment.number} className={classes.row}>
            <Grid item className={classes.cell}>
              {payment.number}
            </Grid>
            <Grid item className={classes.cell}>
              {formatNumber(payment.total)}
            </Grid>
          </Grid>
        );
      })}
    </div>
  );
};
