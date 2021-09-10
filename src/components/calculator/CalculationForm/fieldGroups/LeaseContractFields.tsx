import { Grid, MenuItem } from '@material-ui/core';
import { Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import { useRequired, SelectField, SwitchField, TextField } from 'components';
import { AmountField } from '../../AmountField';
import { Amount, AmountType, CalculationMethod } from 'schema';
import { FormFieldsProps } from './types';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  hasResidualValue: {
    marginTop: '-10px',
  },
});

export const LeaseContractFields = (props: FormFieldsProps) => {
  const { form } = props;
  const classes = useStyles();

  const { t } = useTranslation();
  const { required } = useRequired();

  return (
    <Grid container spacing={0}>
      <Grid container item xs={12} spacing={2}>
        <Grid item md={1} xs={12}>
          <AmountField
            name="prepayment.value"
            label={`${t('Prepayment')}, %`}
            required
            amountMode={AmountType.Percents}
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <AmountField
            name="prepaymentAmount"
            label={t('PrepaymentAmount')}
            amountMode={AmountType.Money}
            disabled
          />
        </Grid>
        <Grid item md={1} xs={12}>
          <AmountField
            name="tradeFee"
            label={`${t('Commission')}, %`}
            required
            amountMode={AmountType.Percents}
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <AmountField
            name="tradeFeeAmount"
            label={t('CommisionAmount')}
            amountMode={AmountType.Money}
            disabled
          />
        </Grid>
        <Grid item md={1} xs={12}>
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
        <Grid item md={3} xs={12}>
          <AmountField
            name="fundingAmount"
            label={t('FundingAmount')}
            amountMode={AmountType.Money}
            disabled
          />
        </Grid>
      </Grid>
      <Grid container item xs={12} spacing={2}>
        <Grid className={classes.hasResidualValue} item lg={2} md={2} xs={12}>
          <Field
            name="hasResidualValue"
            label={t('RV')}
            labelOn={t('Yes')}
            labelOff={t('No')}
            type="checkbox"
            component={SwitchField}
          />
        </Grid>
        <Grid item lg={3} md={3} xs={12}>
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
        <Grid item md={3} xs={12}>
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
        <Grid item md={1} xs={12}>
          <AmountField
            name="cofPercents"
            label={`${t('Cof')}, %`}
            amountMode={AmountType.Percents}
            required
          />
        </Grid>
        <Grid item md={1} xs={12}>
          <AmountField
            name="marginPercents"
            label={`${t('Margin')}, %`}
            amountMode={AmountType.Percents}
            required
          />
        </Grid>
        <Grid item md={2} xs={12}>
          <Field
            name="generalRatePercents"
            label={`${t('GeneralRate')}, %`}
            component={TextField}
            disabled
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
