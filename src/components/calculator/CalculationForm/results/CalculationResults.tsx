import { makeStyles, createStyles, Grid, Theme, Typography } from '@material-ui/core';
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
      paddingTop: '10px',
    },
    label: {
      fontSize: '12px',
      paddingBottom: theme.spacing(0.8),
      color: theme.palette.divider,
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
    const { data } = props;
    const classes = useStyles();

    const { t } = useTranslation();

    return (
      <div ref={ref} className={classes.root}>
        <Grid className={classes.table} container spacing={3} wrap="wrap">
          <Grid item lg={2} md={4} xs={12}>
            <dl>
              <dt>
                <Typography color="textSecondary" className={classes.label}>
                  {t('LeaseSubject')}
                </Typography>
              </dt>
              <dd>{data.leaseSubject ?? 'Не указан'}</dd>
            </dl>
          </Grid>
          <Grid item lg={2} md={4} xs={12}>
            <dl>
              <dt>
                <Typography color="textSecondary" className={classes.label}>
                  {t('LeaseSubjectCost')}
                </Typography>
              </dt>
              <dd>{`${formatNumber(data.assetCost)} (x${data.numberOfItems}) ${formatCurrency(
                data.leaseCurrency
              )}`}</dd>
            </dl>
          </Grid>
          <Grid item lg={2} md={4} xs={12}>
            <dl>
              <dt>
                <Typography color="textSecondary" className={classes.label}>
                  {t('Discount')}
                </Typography>
              </dt>
              <dd>{getDiscountLabel(data.leaseCurrency, data.discount, data.discountAmount)}</dd>
            </dl>
          </Grid>
          <Grid item lg={2} md={4} xs={12}>
            <dl>
              <dt>
                <Typography color="textSecondary" className={classes.label}>
                  {t('PrepaymentPayment')}
                </Typography>
              </dt>
              <dd>
                {formatNumber(data.initialFee)} {formatCurrency(data.leaseCurrency)}
              </dd>
            </dl>
          </Grid>
          <Grid item lg={2} md={4} xs={12}>
            <dl>
              <dt>
                <Typography color="textSecondary" className={classes.label}>
                  {t('FundingAmount')}
                </Typography>
              </dt>
              <dd>
                {formatNumber(data.fundingAmount - (data.subsidyAmount ?? 0))}{' '}
                {formatCurrency(data.leaseCurrency)}
              </dd>
            </dl>
          </Grid>
          <Grid item lg={2} md={4} xs={12}>
            <dl>
              <dt>
                <Typography color="textSecondary" className={classes.label}>
                  {t('WithSubsidy')}
                </Typography>
              </dt>
              <dd>
                {getDiscountLabel(data.leaseCurrency, data.subsidyDiscount, data.subsidyAmount)}
              </dd>
            </dl>
          </Grid>
          <Grid item lg={2} md={4} xs={12}>
            <dl>
              <dt>
                <Typography color="textSecondary" className={classes.label}>
                  {t('TradeFeeCommission')}
                </Typography>
              </dt>
              <dd>{`${formatNumber(data.financingFeeAmount)} ${formatCurrency(
                data.leaseCurrency
              )}`}</dd>
            </dl>
          </Grid>
          <Grid item lg={2} md={4} xs={12}>
            <dl>
              <dt>
                <Typography color="textSecondary" className={classes.label}>
                  {`${t('LeaseTerm')}, ${t('months')}`}
                </Typography>
              </dt>
              <dd>{data.numberOfMonths}</dd>
            </dl>
          </Grid>
          {data.residualValue !== undefined && (
            <Grid item lg={2} md={4} xs={12}>
              <dl>
                <dt>
                  <Typography color="textSecondary" className={classes.label}>
                    {t('ResidualValue')}
                  </Typography>
                </dt>
                <dd>
                  {getDiscountLabel(data.leaseCurrency, data.residualValue, data.residualValue)}
                </dd>
              </dl>
            </Grid>
          )}
          <Grid item lg={2} md={4} xs={12}>
            <dl>
              <dt>
                <Typography color="textSecondary" className={classes.label}>
                  {t('PaymentsTotalAmount')}
                </Typography>
              </dt>
              <dd>{`${formatNumber(data.totalPaymentsAmount)} ${formatCurrency(
                data.leaseCurrency
              )}`}</dd>
            </dl>
          </Grid>
          {data.insuranceCompany !== undefined && (
            <Grid item lg={2} md={4} xs={12}>
              <dl>
                <dt>
                  <Typography color="textSecondary" className={classes.label}>
                    {`${t('InsuranceCompany')} (${t('InsuranceIncluded')})`}
                  </Typography>
                </dt>
                <dd>{data.insuranceCompany}</dd>
              </dl>
            </Grid>
          )}
          {data.telematicsPayment !== undefined && (
            <Grid item lg={2} md={4} xs={12}>
              <dl>
                <dt>
                  <Typography color="textSecondary" className={classes.label}>
                    {t('Telematics')}
                  </Typography>
                </dt>
                <dd>{`${formatNumber(data.telematicsPayment)} ${formatCurrency(
                  data.leaseCurrency
                )}`}</dd>
              </dl>
            </Grid>
          )}
          <Grid item lg={2} md={4} xs={12}>
            <dl>
              <dt>
                <Typography color="textSecondary" className={classes.label}>
                  {t('AgentFee')}
                </Typography>
              </dt>
              <dd>{getDiscountLabel(data.leaseCurrency, data.agentFee, data.agentFeeAmount)}</dd>
            </dl>
          </Grid>
          <Grid item lg={2} md={4} xs={12}>
            <dl>
              <dt>
                <Typography color="textSecondary" className={classes.label}>
                  {`${t('RiseInPrice')} (${t('PerYear')}), ${t('In')} %`}
                </Typography>
              </dt>
              <dd>{formatNumber(data.priceRizing)}</dd>
            </dl>
          </Grid>
          <Grid item lg={2} md={4} xs={12}>
            <dl>
              <dt>
                <Typography color="textSecondary" className={classes.label}>
                  {t('IRR')}
                </Typography>
              </dt>
              <dd>{formatNumber(data.irr)}</dd>
            </dl>
          </Grid>
        </Grid>
      </div>
    );
  }
);
