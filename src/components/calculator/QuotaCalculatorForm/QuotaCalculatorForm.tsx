import { useEffect, useRef } from 'react';
import { Grid } from '@material-ui/core';
import theme from 'theme';
import { useTabs, Tabs, TabPanel } from 'components';
import { useQuotaCalculationForm } from './useQuotaCalculationForm';
import { CalculationForm } from '../CalculationForm';
import { QuotaProps } from '../QuotaDataGrid/types';
import { NavigateBackButton } from 'components';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { useContext } from 'react';
import { CurrencyRatesContext } from '../CurrencyRatesContext';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    quotaInfo: {
      marginBottom: theme.spacing(1.5),
    },
    span: {
      marginLeft: theme.spacing(1.6),
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
      <NavigateBackButton fallbackRoute="/calculator/results" />
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
  const { tabIndex } = tabsProps;
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
      <Grid item>
        <Tabs {...tabsProps} />
      </Grid>
      <Grid item>
        <TabPanel value={tabIndex} index={0} dir={theme.direction}>
          <CalculatorForm quota={quota} />
        </TabPanel>
        <TabPanel value={tabIndex} index={1} dir={theme.direction}>
          {t('Contract')}
        </TabPanel>
        <TabPanel value={tabIndex} index={2} dir={theme.direction}>
          {t('Shipment')}
        </TabPanel>
      </Grid>
    </Grid>
  );
};
