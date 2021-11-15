import { createStyles, makeStyles, MenuItem, Theme } from '@material-ui/core';
import { Grid } from 'components/Grid';
import { Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import { useRequired, SelectField, SwitchField, TextField } from 'components';
import { AmountField } from '../../AmountField';
import { Amount, AmountType, CalculationMethod } from 'schema';
import { FormFieldsProps } from './types';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      width: '100%',
    },
  })
);

export const LeaseContractFields = (props: FormFieldsProps) => {
  const classes = useStyles();
  const { form } = props;
  const { t } = useTranslation();
  const { required } = useRequired();

  return (
    <div className={classes.wrapper}>
      <Grid container columnSpacing={2} rowSpacing={2.5}>
        <Grid item xl={2} md={3} xs={24}>
          <AmountField
            name="prepayment.value"
            label={`${t('Prepayment')}, %`}
            required
            amountMode={AmountType.Percents}
          />
        </Grid>
        <Grid item xl={4} md={5} xs={24}>
          <AmountField
            name="prepaymentAmount"
            label={t('PrepaymentAmount')}
            amountMode={AmountType.Money}
            disabled
          />
        </Grid>
        <Grid item xl={2} md={3} xs={24}>
          <AmountField
            name="tradeFee"
            label={`${t('Commission')}, %`}
            required
            amountMode={AmountType.Percents}
          />
        </Grid>
        <Grid item xl={4} md={5} xs={24}>
          <AmountField
            name="tradeFeeAmount"
            label={t('CommisionAmount')}
            amountMode={AmountType.Money}
            disabled
          />
        </Grid>
        <Grid item xl={2} md={3} xs={24}>
          <Field
            name="numberOfMonths"
            label={t('LeaseTerm')}
            component={SelectField}
            validate={required}
            lowercase
          >
            {Array.from(Array(60 - 11)).map((_, i) => {
              return (
                <MenuItem key={i + 12} value={i + 12}>
                  {i + 12}
                </MenuItem>
              );
            })}
          </Field>
        </Grid>
        <Grid item xl={4} md={5} xs={24}>
          <AmountField
            name="fundingAmount"
            label={t('FundingAmount')}
            amountMode={AmountType.Money}
            disabled
          />
        </Grid>
        <Grid item md="auto" xs={24}>
          <Field
            name="hasResidualValue"
            label={t('RV')}
            labelOn={t('Yes')}
            labelOff={t('No')}
            type="checkbox"
            component={SwitchField}
          />
        </Grid>
        <Grid item xl={5} md={6} xs={24}>
          <Field name="hasResidualValue" type="checkbox">
            {({ input }) => {
              return (
                <AmountField
                  name="residualValue"
                  label={t('ResidualValuePerUnit')}
                  disabled={!input.checked}
                />
              );
            }}
          </Field>
          <OnChange name="hasResidualValue">
            {(value) => {
              if (value) {
                return;
              }
              const residualValue: Amount =
                form.getFieldState('residualValue')?.value ??
                ({
                  type: AmountType.Percents,
                  value: 0.0,
                } as Amount);
              form.change('residualValue', residualValue);
            }}
          </OnChange>
        </Grid>
        <Grid item xl={6} md={7} xs={24}>
          <Field
            name="calculationMethod"
            label={t('ScheduleType')}
            component={SelectField}
            validate={required}
          >
            <MenuItem value={CalculationMethod.Annuity}>
              {t('CalculationMethodType.Annuity')}
            </MenuItem>
            <MenuItem value={CalculationMethod.StraightLine}>
              {t('CalculationMethodType.StraightLine')}
            </MenuItem>
            <MenuItem value={CalculationMethod.Seasonal}>
              {t('CalculationMethodType.Seasonal')}
            </MenuItem>
          </Field>
        </Grid>
        <Grid item xl={2} md={3} xs={24}>
          <AmountField
            name="cofPercents"
            label={`${t('Cof')}, %`}
            amountMode={AmountType.Percents}
            required
          />
        </Grid>
        <Grid item xl={2} md={3} xs={24}>
          <AmountField
            name="marginPercents"
            label={`${t('Margin')}, %`}
            amountMode={AmountType.Percents}
            required
          />
        </Grid>
        <Grid item xl={3} md={4} xs={24}>
          <Field
            name="generalRatePercents"
            label={`${t('GeneralRate')}, %`}
            component={TextField}
            disabled
          />
        </Grid>
      </Grid>
    </div>
  );
};
