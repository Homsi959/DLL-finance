import { makeStyles, createStyles, Grid, Theme } from '@material-ui/core';
import { QuotaPayment } from 'schema';
import { formatNumber } from '../../utils';
import { palette } from 'theme'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      fontSize: '12px',
      fontWeight: 500,
      columns: "10",
      listStyleType: "none",
      // display: "grid",
      // gridTemplateRows: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
      // gap: "0px 20px",
      // gridAutoFlow: "column",
      [theme.breakpoints.down('lg')]: {
        columns: "6",
      },
      [theme.breakpoints.down('md')]: {
        columns: "2",
      },
    },
    wrap: {
      display: "inline-block",
      width: '100%',
      padding: theme.spacing('0px', '8px'),
      '&:nth-child(odd)': {
        background: palette.secondary.light,
      },
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
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

export type StraightLinePaymentScheduleProps = {
  numberOfMonths: number;
  payments: QuotaPayment[];
};

export const StraightLinePaymentSchedule = (props: StraightLinePaymentScheduleProps) => {
  const classes = useStyles();
  const { payments } = props;

  return (
    <ul className={classes.root}>
      {payments.map((payment) => {
        return (
          <li className={classes.wrap}>
            <Grid className={classes.row} container item key={payment.number}>
              <Grid item className={classes.cell}>
                {payment.number}
              </Grid>
              <Grid item className={classes.cell}>
                {formatNumber(payment.total)}
              </Grid>
            </Grid>
          </li>
        );
      })}
    </ul>
  );
};
