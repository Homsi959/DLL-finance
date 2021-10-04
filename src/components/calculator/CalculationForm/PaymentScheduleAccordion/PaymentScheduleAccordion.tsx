import { useMemo } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { CalculationMethod, MonthPaymentOption, SeasonalPaymentType } from 'schema/serverTypes';
import { getNumber } from 'components/calculator/utils';
import { Grid, MenuItem } from '@material-ui/core';
import { SelectField } from 'components/form/SelectField';
import { useRequired } from 'components/form';
import { DateField } from './DateField';
import { SwitchField } from 'components';
import { PaymentOptionList } from './PaymentOptionList';
import { useTranslation } from 'react-i18next';
import { OnMonthNumberChanged } from './OnMonthNumberChanged';
import { OnHasCyclicityChanged } from './OnHasCyclicityChanged';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    hidden: {
      display: 'none',
    },
    visible: {
      display: 'block',
    },
    payment: {
      marginTop: theme.spacing(1),
    },
    hasCyclicity: {
      marginLeft: theme.spacing(2),
      '& .MuiTypography-root': {
        paddingTop: 0,
      },
    },
  })
);

type PaymentScheduleProps = {
  numberOfMonths: number;
  calculationMethod: CalculationMethod;
  date?: string;
};

const PaymentSchedule = (props: PaymentScheduleProps) => {
  const classes = useStyles();
  const { calculationMethod, date, numberOfMonths } = props;
  const rootClassName =
    calculationMethod === CalculationMethod.Seasonal ? classes.visible : classes.hidden;

  const { minDate, maxDate } = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const actualDate =
      date !== undefined && date !== '' ? new Date(date) : new Date(year, month, 1);
    const minDate = actualDate < now ? actualDate : now;
    const maxDate = new Date(minDate.getFullYear() + 1, minDate.getMonth(), minDate.getDate());
    return {
      minDate,
      maxDate,
    };
  }, [date]);

  const { t } = useTranslation();
  const { required } = useRequired();

  return (
    <Accordion defaultExpanded={true} className={rootClassName}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel4a-content"
        id="panel4a-header"
      >
        <Typography variant="subtitle1">{t('PaymentSchedule')}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={0}>
          <Grid container item spacing={1}>
            <Grid item md={3} xs={12}>
              <Field
                name="seasonalPaymentOptions.paymentType"
                label={t('SeasonalPaymentType')}
                component={SelectField}
                validate={calculationMethod === CalculationMethod.Seasonal ? required : undefined}
              >
                <MenuItem value={SeasonalPaymentType.MonthlyPayment}>
                  {t('ToMonthlyPayments')}
                </MenuItem>
                <MenuItem value={SeasonalPaymentType.MainDebt}>{t('ToMainDebt')}</MenuItem>
              </Field>
            </Grid>
            <Grid item md={2} xs={12}>
              <Field
                name="seasonalPaymentOptions.date"
                label={t('StartDate')}
                component={DateField}
                minDate={minDate}
                maxDate={maxDate}
                validate={calculationMethod === CalculationMethod.Seasonal ? required : undefined}
              />
            </Grid>
            <Grid className={classes.hasCyclicity} item md={3} xs={12}>
              <Field
                name="seasonalPaymentOptions.hasCyclicity"
                label={t('Cyclicity')}
                type="checkbox"
                component={SwitchField}
              />
            </Grid>
          </Grid>
          <FieldArray<MonthPaymentOption> name="paymentOptions">
            {({ fields }) => {
              const { push, pop, value = [], update } = fields;
              const valuesCount = value.length;
              return (
                <>
                  <Field
                    name="numberOfMonths"
                    type="number"
                    valuesCount={valuesCount}
                    push={push}
                    pop={pop}
                    component={OnMonthNumberChanged}
                  />
                  <Field
                    name="seasonalPaymentOptions.hasCyclicity"
                    update={update}
                    options={value}
                    component={OnHasCyclicityChanged}
                  />
                </>
              );
            }}
          </FieldArray>
          <FieldArray<MonthPaymentOption> name="paymentOptions">
            {(arrayProps) => {
              return <PaymentOptionList {...arrayProps} numberOfMonths={numberOfMonths} />;
            }}
          </FieldArray>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export const PaymentScheduleAccordion = () => {
  return (
    <Field name="calculationMethod">
      {({ input: calculationMethodInput }) => {
        const calculationMethod = calculationMethodInput.value as CalculationMethod;
        return (
          <Field name="numberOfMonths">
            {({ input: numberOfMonthsInput }) => {
              const numberOfMonths = getNumber(numberOfMonthsInput.value);
              return (
                <Field name="seasonalPaymentOptions.date">
                  {({ input: dateInput }) => {
                    const date = dateInput.value as string | undefined;
                    return (
                      <PaymentSchedule
                        numberOfMonths={numberOfMonths}
                        calculationMethod={calculationMethod}
                        date={date}
                      />
                    );
                  }}
                </Field>
              );
            }}
          </Field>
        );
      }}
    </Field>
  );
};
