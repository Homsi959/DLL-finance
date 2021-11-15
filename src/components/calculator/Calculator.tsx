import { Grid, createStyles, makeStyles, Theme, Box } from '@material-ui/core';
import theme from 'theme';
import { useTabs, Tabs, TabPanel, Button, IconBackTo } from 'components';
import { useCalculatorForm } from './useCalculatorForm';
import { CalculationForm } from './CalculationForm';
import { useTranslation } from 'react-i18next';
import SwipeableViews from 'react-swipeable-views';

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
  const { tabIndex, onChangeTabIndex, onChangeTab } = tabsProps;

  return (
    <Grid container direction="column">
      <Grid item>
        <Grid className={classes.navBottom} item>
          <Button variant="iconButton" endIcon={<IconBackTo />} to="/calculator/results" />
        </Grid>
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
            <CalculatorForm />
          </TabPanel>
          <TabPanel value={tabIndex} index={1} dir={theme.direction}>
            {t('Contract')}
          </TabPanel>
          <TabPanel value={tabIndex} index={2} dir={theme.direction}>
            {t('Shipment')}
          </TabPanel>
        </SwipeableViews>
      </Grid>
    </Grid>
  );
};
