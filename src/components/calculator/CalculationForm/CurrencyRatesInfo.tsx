import { useContext } from 'react';
import clsx from 'clsx';
import { makeStyles, createStyles, Typography, Theme } from '@material-ui/core';
import { CurrencyRatesContext } from '../CurrencyRatesContext';
import { formatNumber, formatDate } from '../utils';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.divider,
      fontSize: '10px',
      marginTop: '10px',
    },
    rates: {
      borderRight: '1px solid',
      margin: '0 10px 0 0',
      padding: '0 10px 0 0',
    },
  })
);

export const CurrencyRatesInfo = () => {
  const classes = useStyles();
  const { data } = useContext(CurrencyRatesContext);

  const { t } = useTranslation();

  if (!data) {
    return null;
  }

  const { currencies, updated } = data;
  const ratesInfo = currencies.map((t) => formatNumber(t.rate, 4)).join(' / ');

  return (
    <div className={classes.root}>
      <Typography component="span" className={clsx(classes.root, classes.rates)}>
        {t('CurrencyRate')}: {ratesInfo}
      </Typography>
      <Typography component="span" className={classes.root}>
        {t('LastUpdate')} {formatDate(updated)}
      </Typography>
    </div>
  );
};
