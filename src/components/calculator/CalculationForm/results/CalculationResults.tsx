import { makeStyles, createStyles, Theme, Typography } from '@material-ui/core';
import { Grid } from 'components/Grid';
import { forwardRef } from 'react';
import { CalculationResult, Currency } from 'schema/serverTypes';
import { formatNumber, formatCurrency } from '../../utils';
import { useTranslation } from 'react-i18next';

const getDiscountLabel = (currency: Currency, discount?: number, discountAmount?: number) => {
  if (discount && discountAmount) {
    if (discount === discountAmount) {
      return `${formatNumber(discountAmount)} ${formatCurrency(currency)}`;
    }
    return `${formatNumber(discount)}% / ${formatNumber(discountAmount)} ${formatCurrency(
      currency
    )}`;
  }
  if (discountAmount) {
    return `${formatNumber(discountAmount)} ${formatCurrency(currency)}`;
  }
  return `0,00% / 0,00 ${formatCurrency(currency)}`;
};

export type CalculationResultsProps = {
  data: CalculationResult;
};

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    label: {
      paddingBottom: theme.spacing(0.8),
      color: theme.palette.textGrey2.main,
      fontWeight: 400,
    },
    table: {
      '& dd': {
        fontSize: '14px',
        color: theme.palette.secondary.main,
        fontWeight: 400,
      },
    },
  })
);

export const CalculationResults = forwardRef<HTMLDivElement, CalculationResultsProps>(
  (props: CalculationResultsProps, ref) => {
    const { t } = useTranslation();
    const { data } = props;
    const classes = useStyles();

    return (
      <div ref={ref} className={classes.root}>
        <Grid className={classes.table} container spacing={2}>
          <Grid item xl={4} lg={6} md={8} xs={24}>
            <dl>
              <Typography component={'dt'} className={classes.label}>
                {t('LeaseSubject')}
              </Typography>
              <dd>{data.leaseSubject ?? 'Не указан'}</dd>
            </dl>
          </Grid>
          <Grid item xl={4} lg={6} md={8} xs={24}>
            <dl>
              <Typography component={'dt'} className={classes.label}>
                {t('LeaseSubjectCost')}
              </Typography>
              <dd>{`${formatNumber(data.assetCost)} (x${data.numberOfItems}) ${formatCurrency(
                data.leaseCurrency
              )}`}</dd>
            </dl>
          </Grid>
          <Grid item xl={4} lg={6} md={8} xs={24}>
            <dl>
              <Typography component={'dt'} className={classes.label}>
                {t('Discount')}
              </Typography>
              <dd>{getDiscountLabel(data.leaseCurrency, data.discount, data.discountAmount)}</dd>
            </dl>
          </Grid>
          <Grid item xl={4} lg={6} md={8} xs={24}>
            <dl>
              <Typography component={'dt'} className={classes.label}>
                {t('PrepaymentPayment')}
              </Typography>
              <dd>
                {formatNumber(data.initialFee)} {formatCurrency(data.leaseCurrency)}
              </dd>
            </dl>
          </Grid>
          <Grid item xl={4} lg={6} md={8} xs={24}>
            <dl>
              <Typography component={'dt'} className={classes.label}>
                {t('FundingAmount')}
              </Typography>
              <dd>
                {formatNumber(data.fundingAmount - (data.subsidyAmount ?? 0))}{' '}
                {formatCurrency(data.leaseCurrency)}
              </dd>
            </dl>
          </Grid>
          <Grid item xl={4} lg={6} md={8} xs={24}>
            <dl>
              <Typography component={'dt'} className={classes.label}>
                {t('WithSubsidy')}
              </Typography>
              <dd>
                {getDiscountLabel(data.leaseCurrency, data.subsidyDiscount, data.subsidyAmount)}
              </dd>
            </dl>
          </Grid>
          <Grid item xl={4} lg={6} md={8} xs={24}>
            <dl>
              <Typography component={'dt'} className={classes.label}>
                {t('TradeFeeCommission')}
              </Typography>
              <dd>{`${formatNumber(data.financingFeeAmount)} ${formatCurrency(
                data.leaseCurrency
              )}`}</dd>
            </dl>
          </Grid>
          <Grid item xl={4} lg={6} md={8} xs={24}>
            <dl>
              <Typography component={'dt'} className={classes.label}>
                {`${t('LeaseTerm')}, ${t('months')}`}
              </Typography>
              <dd>{data.numberOfMonths}</dd>
            </dl>
          </Grid>
          {data.residualValue !== undefined && (
            <Grid item xl={4} lg={6} md={8} xs={24}>
              <dl>
                <Typography component={'dt'} className={classes.label}>
                  {t('ResidualValue')}
                </Typography>
                <dd>
                  {getDiscountLabel(data.leaseCurrency, data.residualValue, data.residualValue)}
                </dd>
              </dl>
            </Grid>
          )}
          <Grid item xl={4} lg={6} md={8} xs={24}>
            <dl>
              <Typography component={'dt'} className={classes.label}>
                {t('PaymentsTotalAmount')}
              </Typography>
              <dd>{`${formatNumber(data.totalPaymentsAmount)} ${formatCurrency(
                data.leaseCurrency
              )}`}</dd>
            </dl>
          </Grid>
          {data.insuranceCompany && (
            <Grid item xl={4} lg={6} md={8} xs={24}>
              <dl>
                <Typography component={'dt'} className={classes.label}>
                  {`${t('InsuranceCompany')} (${t('InsuranceIncluded')})`}
                </Typography>
                <dd>{data.insuranceCompany}</dd>
              </dl>
            </Grid>
          )}
          {data.telematicsPayment && (
            <Grid item xl={4} lg={6} md={8} xs={24}>
              <dl>
                <Typography component={'dt'} className={classes.label}>
                  {t('Telematics')}
                </Typography>
                <dd>{`${formatNumber(data.telematicsPayment)} ${formatCurrency(
                  data.leaseCurrency
                )}`}</dd>
              </dl>
            </Grid>
          )}
          <Grid item xl={4} lg={6} md={8} xs={24}>
            <dl>
              <Typography component={'dt'} className={classes.label}>
                {t('AgentFee')}
              </Typography>
              <dd>{getDiscountLabel(data.leaseCurrency, data.agentFee, data.agentFeeAmount)}</dd>
            </dl>
          </Grid>
          <Grid item xl={4} lg={6} md={8} xs={24}>
            <dl>
              <Typography component={'dt'} className={classes.label}>
                {`${t('RiseInPrice')} (${t('PerYear')}), ${t('In')} %`}
              </Typography>
              <dd>{formatNumber(data.priceRizing)}</dd>
            </dl>
          </Grid>
          <Grid item xl={4} lg={6} md={8} xs={24}>
            <dl>
              <Typography component={'dt'} className={classes.label}>
                {t('IRR')}
              </Typography>
              <dd>{formatNumber(data.irr)}</dd>
            </dl>
          </Grid>
        </Grid>
      </div>
    );
  }
);
