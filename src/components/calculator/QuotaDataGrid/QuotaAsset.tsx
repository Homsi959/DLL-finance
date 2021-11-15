import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Amount, AmountType, CalculationMethod } from 'schema';
import clsx from 'clsx';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Currency } from 'schema';
import { formatCurrency } from '../utils';

// type assetStylesProps = {
//   isRegistered?: boolean;
// }

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      lineHeight: 2,
    },
    name: {
      fontWeight: 500,
      fontSize: '14px',
      color: theme.palette.textGrey1.main,
      lineHeight: 1,
    },
    assets: {
      position: 'absolute',
      bottom: '16px',
      display: 'flex',
      flexWrap: 'nowrap',
      whiteSpace: 'nowrap',
    },
    subjectProp: {
      paddingRight: theme.spacing(2),
      paddingLeft: theme.spacing(0.6),
      maxHeight: '14px',
      fontSize: '12px',
      lineHeight: '1.1',
      color: theme.palette.textGrey2.main,
      display: 'flex',
      alignItems: 'center',
      borderLeft: '1px solid ' + theme.palette.grey3.main,
      flexShrink: 0,
    },
    status: {
      // color: (props: assetStylesProps) => {
      //   return props.isRegistered ? theme.palette.primary.main : theme.palette.green.main
      // }
    },
    currency: {
      textTransform: 'uppercase',
    },
  })
);

const getPrepaymentValue = (prepayment: Amount | undefined) => {
  if (prepayment === undefined) {
    return null;
  }
  if (prepayment.type === AmountType.Percents) {
    return `${prepayment.value}%`;
  }
  return `${prepayment.value}`;
};

export type QuotaAssetProps = {
  currency: string;
  isRegistered: boolean;
  asset: {
    name: string;
    numberOfItems: number;
    prepayment?: Amount;
    numberOfMonths: number;
    calculationMethod: CalculationMethod;
  };
};

export const QuotaAsset = (props: QuotaAssetProps) => {
  const {
    asset: { name, numberOfItems, prepayment, numberOfMonths, calculationMethod },
    currency,
    isRegistered,
  } = props;
  const classes = useStyles({ isRegistered });
  const { t } = useTranslation();

  const getCalculationMethod = useCallback(
    (method: CalculationMethod | undefined) => {
      if (method === undefined) {
        return null;
      }
      if (method === CalculationMethod.Annuity) {
        return t('CalculationMethodType.AnnuityShort');
      }
      if (method === CalculationMethod.StraightLine) {
        return t('CalculationMethodType.StraightLineShort');
      }
      if (method === CalculationMethod.Seasonal) {
        return t('CalculationMethodType.SeasonalShort');
      }
      return null;
    },
    [t]
  );

  return (
    <Grid className={classes.root} container direction="column" wrap="nowrap">
      <Grid className={classes.name} item>
        {name}
      </Grid>
      <Grid className={classes.assets} item container direction="row">
        <Grid item className={classes.subjectProp}>
          {t('NumberOfItems')}: {numberOfItems}
        </Grid>
        <Grid item className={clsx(classes.subjectProp, classes.currency)}>
          дл: {formatCurrency(currency as Currency)}
        </Grid>
        <Grid item className={classes.subjectProp}>
          {t('Prepayment')}: {getPrepaymentValue(prepayment)}
        </Grid>
        <Grid item className={classes.subjectProp}>
          {t('MonthWithCount', { count: numberOfMonths })}
        </Grid>
        <Grid item className={classes.subjectProp}>
          {t('Type')}: {getCalculationMethod(calculationMethod)}
        </Grid>
        {/* <Grid item className={clsx(classes.status, classes.subjectProp)}>
          {t('Execution of the contract')}
        </Grid> */}
      </Grid>
    </Grid>
  );
};
