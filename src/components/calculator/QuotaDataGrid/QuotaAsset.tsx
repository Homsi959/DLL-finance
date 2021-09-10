import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Amount, AmountType, CalculationMethod } from 'schema';
import clsx from 'clsx';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      lineHeight: 2,
    },
    name: {
      color: theme.palette.secondary.main,
      fontSize: '14px',
      fontWeight: 500,
    },
    subjectProp: {
      paddingRight: theme.spacing(0.9),
      maxHeight: '14px',
      lineHeight: '1.1',
      '&:not(:first-child)': {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(0.9),
        fontSize: '12px',
        borderLeft: '1px solid #D1D7E4',
        color: '#6B7888',
        flexShrink: 0,
      },
    },
    typeAnnual: {
      minWidth: '138px',
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
  name: string;
  numberOfItems: number;
  prepayment?: Amount;
  numberOfMonths: number;
  calculationMethod: CalculationMethod;
};

export const QuotaAsset = (props: QuotaAssetProps) => {
  const classes = useStyles();

  const { name, numberOfItems, prepayment, numberOfMonths, calculationMethod } = props;

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
      <Grid item container direction="row">
        <Grid item className={classes.subjectProp}>
          {t('NumberOfItems')}: {numberOfItems}
        </Grid>
        <Grid item className={classes.subjectProp}>
          {t('Prepayment')}: {getPrepaymentValue(prepayment)}
        </Grid>
        <Grid item className={clsx(classes.subjectProp, classes.typeAnnual)}>
          {t('Type')}: {getCalculationMethod(calculationMethod)}
        </Grid>
        <Grid item className={classes.subjectProp}>
          {t('MonthWithCount', { count: numberOfMonths })}
        </Grid>
      </Grid>
    </Grid>
  );
};
