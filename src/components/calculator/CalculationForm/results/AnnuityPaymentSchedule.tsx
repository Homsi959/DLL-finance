import { Grid, Typography } from '@material-ui/core';
import { CalculationResult, Currency } from 'schema/serverTypes';
import { formatNumber, formatCurrency } from '../../utils';
import { useStyles } from './CalculationResults';
import { useTranslation } from 'react-i18next';

export type AnnuityPaymentScheduleProps = Pick<CalculationResult, 'payments'> & {
  numberOfMonths: number;
  leaseCurrency: Currency;
};

export const AnnuityPaymentSchedule = (props: AnnuityPaymentScheduleProps) => {
  const { numberOfMonths, leaseCurrency, payments = [] } = props;
  const classes = useStyles();

  const monthlyPayment = payments.length > 0 ? payments[0].total : 0;

  const { t } = useTranslation();

  return (
    <Grid className={classes.table} container spacing={4}>
      <Grid container item xs={12} spacing={1}>
        <Grid item lg={2} md={4} xs={12}>
          <dl>
            <dt>
              <Typography color="textSecondary" className={classes.label}>
                {t('ByAnnuityPayments')}
              </Typography>
            </dt>
            <dd>{t('MonthWithCount', { count: numberOfMonths })}</dd>
          </dl>
        </Grid>
        <Grid item lg={2} md={4} xs={12}>
          <dl>
            <dt>
              <Typography color="textSecondary" className={classes.label}>
                {t('MonthlyPaymentIncludingVAT')}
              </Typography>
            </dt>
            <dd>
              {formatNumber(monthlyPayment)} {formatCurrency(leaseCurrency)}
            </dd>
          </dl>
        </Grid>
      </Grid>
    </Grid>
  );
};
