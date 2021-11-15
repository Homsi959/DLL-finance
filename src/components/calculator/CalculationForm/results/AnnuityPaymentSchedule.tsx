import { Typography } from '@material-ui/core';
import { Grid } from 'components/Grid';
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
    <Grid container item spacing={2} className={classes.table}>
      <Grid item xl={4} lg={6} md={8} xs={24}>
        <dl>
          <Typography component={'dt'} className={classes.label}>
            {t('ByAnnuityPayments')}
          </Typography>
          <dd>{t('MonthWithCount', { count: numberOfMonths })}</dd>
        </dl>
      </Grid>
      <Grid item xl={4} lg={6} md={8} xs={24}>
        <dl>
          <Typography component={'dt'} className={classes.label}>
            {t('MonthlyPaymentIncludingVAT')}
          </Typography>
          <dd>
            {formatNumber(monthlyPayment)} {formatCurrency(leaseCurrency)}
          </dd>
        </dl>
      </Grid>
    </Grid>
  );
};
