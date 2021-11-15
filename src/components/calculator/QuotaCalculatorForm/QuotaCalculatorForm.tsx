import { useEffect, useRef } from 'react';
import { Box, Grid } from '@material-ui/core';
import theme from 'theme';
import { useTabs, Tabs, TabPanel, Button, IconBackTo } from 'components';
import { useQuotaCalculationForm } from './useQuotaCalculationForm';
import { CalculationForm } from '../CalculationForm';
import { QuotaProps } from '../QuotaDataGrid/types';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { useContext } from 'react';
import { CurrencyRatesContext } from '../CurrencyRatesContext';
import { ContractForm } from '../ContractForm';
import { useTranslation } from 'react-i18next';
import SwipeableViews from 'react-swipeable-views';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    quotaInfo: {
      marginBottom: theme.spacing(1.5),
    },
    span: {
      marginLeft: theme.spacing(1.6),
    },
    button: {
      padding: 0,
    },
  })
);

type CalculatorFormProps = QuotaProps;
type QuotaInfoProps = {
  modelName?: string;
  calculationNumber: number;
};

export const QuotaInfo = (props: QuotaInfoProps) => {
  const { t } = useTranslation();

  const { modelName = t('NoModel'), calculationNumber = t('NoCalculation') } = props;
  const classes = useStyles();

  return (
    <Grid className={classes.quotaInfo}>
      <Button variant="iconButton" endIcon={<IconBackTo />} to="/calculator/results" />
      <span className={classes.span}>
        {t('Calculation')} №{calculationNumber} {modelName}
      </span>
    </Grid>
  );
};

const CalculatorForm = ({ quota }: CalculatorFormProps) => {
  const { onSubmit, initialValues, error, isLoading, data, resultRef } =
    useQuotaCalculationForm(quota);

  return (
    <CalculationForm
      ref={resultRef}
      onSubmit={onSubmit}
      initialValues={initialValues}
      error={error}
      isLoading={isLoading}
      data={data}
      copyEnabled={true}
    />
  );
};

export const QuotaCalculatorForm = ({ quota }: CalculatorFormProps) => {
  const { t } = useTranslation();
  const tabsProps = useTabs([
    t('Calculation') as string,
    t('Contract') as string,
    t('Shipment') as string,
  ]);
  const { tabIndex, onChangeTabIndex, onChangeTab } = tabsProps;
  const {
    quotaId,
    agreement: { model },
    agreement: { brand },
  } = quota;
  const { setSaleCurrency, setLeaseCurrency } = useContext(CurrencyRatesContext);

  const currencySale = quota?.input.currencySale;
  const currencyLease = quota?.input.currencyLease;
  const currenciesUpdated = useRef<boolean>(false);

  useEffect(() => {
    if (currenciesUpdated.current) {
      return;
    }
    if (currencySale && currencyLease) {
      currenciesUpdated.current = true;
      setSaleCurrency(currencySale);
      setLeaseCurrency(currencyLease);
    }
  }, [currencySale, currencyLease, setSaleCurrency, setLeaseCurrency]);

  return (
    <Grid container direction="column">
      <Grid item>
        <QuotaInfo modelName={model || brand} calculationNumber={quotaId} />
      </Grid>
      <Box mb={2.5}>
        <Tabs {...tabsProps} value={tabIndex} onChangeTab={onChangeTab} />
      </Box>
      <Grid item>
        <SwipeableViews
          containerStyle={{
            transition: 'transform 0.6s ease-out 0s',
          }}
          springConfig={{
            duration: '0.6s',
            easeFunction: 'transform 0.6s ease-out 0s',
            delay: '0s',
          }}
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={tabIndex}
          onChangeIndex={onChangeTabIndex}
        >
          <TabPanel value={tabIndex} index={0} dir={theme.direction}>
            <CalculatorForm quota={quota} />
          </TabPanel>
          <TabPanel value={tabIndex} index={1} dir={theme.direction}>
            {tabIndex === 1 && <ContractForm quota={quota} />}
          </TabPanel>
          <TabPanel value={tabIndex} index={2} dir={theme.direction}>
            {t('Shipment')}
          </TabPanel>
        </SwipeableViews>
      </Grid>
    </Grid>
  );
};
