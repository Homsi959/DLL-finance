import { Grid, createStyles, makeStyles, Theme } from '@material-ui/core';
import theme from 'theme';
import { useTabs, Tabs, TabPanel } from 'components';
import { useCalculatorForm } from './useCalculatorForm';
import { CalculationForm } from './CalculationForm';
import { NavigateBackButton } from 'components';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    navBottom: {
      marginBottom: '12px',
    },
  })
);

const CalculatorForm = () => {
  const { onSubmit, initialValues, error, isLoading, data, resultRef } = useCalculatorForm();
  return (
    <CalculationForm
      ref={resultRef}
      onSubmit={onSubmit}
      initialValues={initialValues}
      error={error}
      isLoading={isLoading}
      data={data}
    />
  );
};

export const Calculator = () => {
  const classes = useStyles();

  const { t } = useTranslation();
  const tabs = [
    {
      name: t('Calculation'),
    },
    {
      name: t('Contract'),
      disabled: false,
    },
    {
      name: t('Shipment'),
      disabled: false,
    },
  ];
  const tabsProps = useTabs(tabs);
  const { tabIndex } = tabsProps;

  return (
    <Grid container direction="column">
      <Grid item>
        <Grid className={classes.navBottom} item>
          <NavigateBackButton fallbackRoute="/calculator/results" />
        </Grid>
      </Grid>
      <Grid item>
        <Tabs {...tabsProps} />
      </Grid>
      <Grid item>
        <TabPanel value={tabIndex} index={0} dir={theme.direction}>
          <CalculatorForm />
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
