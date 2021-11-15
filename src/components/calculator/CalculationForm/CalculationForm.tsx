import { forwardRef, useCallback } from 'react';
import { FormApi } from 'final-form';
import { makeStyles, createStyles, Theme, Paper, Portal } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { SaleContractFields, LeaseContractFields, ComponentsFields } from './fieldGroups';
import { FormRenderProps } from 'react-final-form';
import { CalculationMethod, CalculationResult, Currency, ValidationProblemDetails } from 'schema';
import { CalculationFormValues } from '../types';
import {
  CalculationResults,
  AnnuityPaymentSchedule,
  StraightLinePaymentSchedule,
  SeasonalPaymentSchedule,
} from './results';
import { AutoFocusedForm, Button } from 'components';
import { CurrencyRatesInfo } from './CurrencyRatesInfo';
import { CalculatedFields } from './CalculatedFields';
import { PaymentScheduleAccordion } from './PaymentScheduleAccordion';
import { CalculationFormApiContextProvider } from './CalculationFormApiContextProvider';
import { useTranslation } from 'react-i18next';
import { formatCurrency, formatNumber } from '../utils';

type CalculationProps = {
  error?: ValidationProblemDetails | null;
  isLoading?: boolean;
  data?: CalculationResult;
  copyEnabled?: boolean;
};

type CalculationInnerFormProps = FormRenderProps<
  CalculationFormValues,
  Partial<CalculationFormValues>
> &
  CalculationProps;

type CalculationFormProps = CalculationProps & {
  onSubmit: (
    values: CalculationFormValues,
    form: FormApi<CalculationFormValues, Partial<CalculationFormValues>>
  ) => Promise<void>;
  initialValues: CalculationFormValues;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    panels: {
      marginBottom: '75px',
    },
    actions: {
      [theme.breakpoints.down(1200)]: {
        width: 'calc(100% - 85px)',
        left: 63,
      },
      display: 'flex',
      justifyContent: 'flex-start',
      width: 'calc(100% - 238px)',
      padding: theme.spacing('20px', '32px'),
      bottom: 0,
      left: 216,
      position: 'fixed',
      zIndex: 1,
    },
    actionButton: {
      marginRight: theme.spacing(3),
    },
  })
);

let submit: any;

const CalculationFormInner = forwardRef<HTMLDivElement, CalculationInnerFormProps>(
  (props: CalculationInnerFormProps, ref) => {
    const classes = useStyles();
    const { handleSubmit, isLoading, data, form, submitting, copyEnabled = false } = props;
    submit = handleSubmit;
    const change = form.change;

    const handleOnCalculate = useCallback(
      (event) => {
        change('save', false);
        submit(event);
      },
      [change]
    );

    const handleOnSave = useCallback(
      (event) => {
        change('save', true);
        submit(event);
      },
      [change]
    );

    const handleOnCopy = useCallback(
      (event) => {
        if (copyEnabled) {
          submit(event);
          change('copy', true);
        }
      },
      [copyEnabled, change]
    );

    const { t } = useTranslation();

    return (
      <form onSubmit={handleSubmit}>
        <CalculationFormApiContextProvider form={form}>
          <CalculatedFields />
        </CalculationFormApiContextProvider>
        <div className={classes.panels}>
          <Accordion defaultExpanded={true}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="subtitle1">{t('ContractOfSale')}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <SaleContractFields form={form} />
            </AccordionDetails>
          </Accordion>
          <CurrencyRatesInfo />
          <Accordion defaultExpanded={true}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography variant="subtitle1">{t('ContractOfLease')}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <LeaseContractFields form={form} />
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded={true}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography variant="subtitle1">{t('Components')}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ComponentsFields form={form} />
            </AccordionDetails>
          </Accordion>
          <PaymentScheduleAccordion />
          <Accordion disabled defaultExpanded={false} expanded={!!data}>
            <AccordionSummary ref={ref} aria-controls="panel4a-content" id="panel4a-header">
              <Typography variant="subtitle1">{t('CalculationResult')}</Typography>
              <Typography color="secondary" variant="body1">
                &nbsp; ({t('IncludingVAT')}) &nbsp; | NBV &nbsp;
              </Typography>
              <Typography color="secondary" variant="subtitle1">
                {data?.fundingAmountNBV && formatNumber(data?.fundingAmountNBV, 2, true)}&nbsp;
                {data?.fundingAmountNBV && formatCurrency(Currency.Euro)}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>{data && <CalculationResults data={data} />}</AccordionDetails>
          </Accordion>
          <Accordion disabled defaultExpanded={false} expanded={!!data}>
            <AccordionSummary aria-controls="panel5a-content" id="panel5a-header">
              <Typography color="secondary" variant="subtitle1">
                {t('ScheduleOfPayments')}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {data?.calculationMethod === CalculationMethod.Annuity && (
                <AnnuityPaymentSchedule {...data} />
              )}
              {data?.calculationMethod === CalculationMethod.StraightLine && (
                <StraightLinePaymentSchedule {...data} />
              )}
              {data?.calculationMethod === CalculationMethod.Seasonal && (
                <SeasonalPaymentSchedule {...data} />
              )}
            </AccordionDetails>
          </Accordion>
        </div>
        <Portal container={document.body}>
          <Paper square className={classes.actions}>
            <div className={classes.actionButton}>
              <Button
                color="primary"
                size="medium"
                type="submit"
                variant="contained"
                disabled={isLoading || submitting}
                onClick={(event) => handleOnCalculate(event)}
              >
                {t('Calculate')}
              </Button>
            </div>
            <div className={classes.actionButton}>
              <Button
                color="primary"
                size="medium"
                type="submit"
                variant="outlined2"
                disabled={isLoading || submitting}
                onClick={(event) => handleOnSave(event)}
              >
                {t('Save')}
              </Button>
            </div>
            {copyEnabled && (
              <div className={classes.actionButton}>
                <Button
                  color="primary"
                  size="medium"
                  type="submit"
                  variant="outlined2"
                  disabled={isLoading || submitting}
                  onClick={(event) => handleOnCopy(event)}
                >
                  {t('SaveAsNew')}
                </Button>
              </div>
            )}
          </Paper>
        </Portal>
      </form>
    );
  }
);

export const CalculationForm = forwardRef<HTMLDivElement, CalculationFormProps>(
  (props: CalculationFormProps, ref) => {
    const { onSubmit, initialValues, ...rest } = props;
    return (
      <AutoFocusedForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        render={(props) => {
          return <CalculationFormInner ref={ref} {...props} {...rest} />;
        }}
      />
    );
  }
);
