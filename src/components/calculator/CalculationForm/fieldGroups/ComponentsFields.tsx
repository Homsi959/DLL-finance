import { MenuItem, makeStyles, createStyles, Typography, Theme, Divider } from '@material-ui/core';
import { Grid } from 'components/Grid';
import { Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import { SelectField, TextField, RadioField, SwitchField, CheckboxField } from 'components';
import { AmountField } from '../../AmountField';
import { CounterpartyAutocompleteField } from '../DictionaryFields';
import { TelematicsValue } from '../../types';
import {
  AgentFeeRecipient,
  AuditType,
  AuditRegularity,
  Telematics,
  AmountType,
  CalculationMethodType,
  CounterpartyType,
  InsuranceFranchise,
} from 'schema';
import { FormFieldsProps } from './types';
import { useTranslation } from 'react-i18next';
import { FixedTypeInput } from '../../AmountField/FixedTypeInput';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      width: '100%',
    },
    divider: {
      marginBottom: theme.spacing(2.5),
    },
    icon: {
      borderLeft: '1px solid' + theme.palette.grey3.main,
      width: theme.spacing(4),
      height: theme.spacing(4),
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkTitle: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
    },
  })
);

export const ComponentsFields = (props: FormFieldsProps) => {
  const classes = useStyles();
  const { form } = props;

  const { t } = useTranslation();

  return (
    <div className={classes.wrapper}>
      <Grid container columnSpacing={2} rowSpacing={2.5}>
        <Grid item md="auto" xs={24}>
          <Field
            name="balanceHolder"
            label={t('BalanceHolder')}
            component={RadioField}
            type="text"
            options={[
              { label: t('Lessor'), value: 'lessor' },
              { label: t('Lessee'), value: 'lessee' },
            ]}
          />
        </Grid>
        <Grid item md="auto" xs="auto">
          <Field
            name="hasPropertyTax"
            label={t('PropertyTax')}
            type="checkbox"
            component={SwitchField}
            titleWrap={false}
          />
        </Grid>
        <Grid item xl={2} lg={4} md={6} xs={23}>
          <Field name="hasPropertyTax" type="checkbox">
            {({ input }) => {
              return (
                <FixedTypeInput
                  name="propertyTax"
                  disabled={!input.checked}
                  required={input.checked}
                  amountMode={AmountType.Percents}
                  icon="%"
                  inputProps={{ maxLength: 3 }}
                />
              );
            }}
          </Field>
          <OnChange name="hasPropertyTax">
            {(value) => {
              if (value === true) {
                return;
              }
              form.batch(() => {
                form.pauseValidation();
                form.change('propertyTax', undefined);
                form.resumeValidation();
              });
            }}
          </OnChange>
        </Grid>
      </Grid>

      <Divider light className={classes.divider} />

      <Grid container columnSpacing={2} rowSpacing={2.5}>
        <Grid item md="auto" xs={24}>
          <Field
            name="hasInsurance"
            label={t('Insurance')}
            type="checkbox"
            component={SwitchField}
          />
        </Grid>
        <Field name="hasInsurance">
          {({ input }) => {
            const disabled = input.value !== true;
            return (
              <>
                <Grid item xl={6} lg={9} md={7} xs={24}>
                  <CounterpartyAutocompleteField
                    label={t('InsuranceCompany')}
                    counterpartyType={CounterpartyType.insuranceCompany}
                    disabled={disabled}
                    setFirstOptionAsDefault={!disabled}
                  />
                </Grid>
                <Grid item xl={3} md={5} xs={24}>
                  <AmountField
                    name="insuranceRatePercents"
                    label={`${t('InsuranceRate')}, %`}
                    amountMode={AmountType.Percents}
                    disabled={disabled}
                  />
                </Grid>
                <Grid item xl={3} lg={4} md={7} xs={24}>
                  <Field
                    name="insuranceFranchise"
                    label={t('Franchise')}
                    component={SelectField}
                    disabled={disabled}
                  >
                    <MenuItem value={InsuranceFranchise.None}>
                      {t('InsuranceFranchise.None')}
                    </MenuItem>
                    <MenuItem value={InsuranceFranchise.Unconditional}>
                      {t('InsuranceFranchise.Unconditional')}
                    </MenuItem>
                    <MenuItem value={InsuranceFranchise.Conditional}>
                      {t('InsuranceFranchise.Conditional')}
                    </MenuItem>
                  </Field>
                </Grid>
                <Grid item xl={4} lg={5} md={4} xs={24}>
                  <FixedTypeInput
                    name="franchiseAmount"
                    label={t('Amount')}
                    disabled={disabled}
                    amountMode={AmountType.Money}
                    icon="$"
                  />
                </Grid>
              </>
            );
          }}
        </Field>
      </Grid>

      <Divider light className={classes.divider} />

      <Grid container columnSpacing={2} rowSpacing={2.5}>
        <Grid item xl={3} lg={5} md={6} xs={24}>
          <AmountField name="itemDiscount" label={t('Discount')} useSaleCurrency={true} />
        </Grid>
        <Grid item xl={3} lg={5} md={6} xs={24}>
          <Field<CalculationMethodType> name="calculationMethodType">
            {({ input }) => {
              const disabled = input.value !== CalculationMethodType.Forward;
              return (
                <AmountField
                  name="subsidyDealer"
                  label={t('Subsidy')}
                  useSaleCurrency={true}
                  disabled={disabled}
                />
              );
            }}
          </Field>
        </Grid>
        <Grid item md="auto" xs={24}>
          <Field
            name="hasVehicleRegistration"
            label={t('VehicleRegistration')}
            type="checkbox"
            component={SwitchField}
            titleWrap={false}
          />
        </Grid>
        <Grid item xl={4} lg={6} md={8} xs={24}>
          <Field name="telematics" label={t('Telematics')} component={SelectField}>
            <MenuItem value={Telematics.Caesar}>{t('TelematicsType.Caesar')}</MenuItem>
            <MenuItem value={Telematics.XPro}>{t('TelematicsType.XPro')}</MenuItem>
            <MenuItem value={Telematics.None}>{t('No')}</MenuItem>
          </Field>
          <OnChange name="telematics">
            {(value) => {
              const telematics = value as Telematics;
              if (telematics === Telematics.Caesar) {
                form.batch(() => {
                  form.change('telematicsOneTimeAmount', TelematicsValue.caesar.oneTime);
                  form.change('telematicsMonthlyAmount', TelematicsValue.caesar.monthly);
                });
              } else {
                form.batch(() => {
                  form.change('telematicsOneTimeAmount', 0);
                  form.change('telematicsMonthlyAmount', 0);
                });
              }
            }}
          </OnChange>
        </Grid>
      </Grid>

      <Divider light className={classes.divider} />

      <Grid container columnSpacing={2} rowSpacing={2.5}>
        <Grid item xl={5} lg={7} md={9} xs={24}>
          <Field name="agent" label={t('Agent')} component={TextField} disabled />
        </Grid>
        <Grid item xl={4} lg={5} md={7} xs={24}>
          <AmountField name="agentFee" label={t('AgentFee')} />
        </Grid>
        <Grid item xl={4} lg={5} md={8} xs={24}>
          <Field
            name="agentFeeRecipient"
            label={t('AgentFeeRecipient')}
            component={SelectField}
            disabled
          >
            <MenuItem value={AgentFeeRecipient.Entity}>
              {t('AgentFeeRecipientType.Entity')}
            </MenuItem>
          </Field>
        </Grid>
        <Grid item xl={5} lg={7} md={9} xs={24}>
          <Field
            name={t('AgentFeeRefund')}
            label="Способ возмещения агентской комиссии"
            component={SelectField}
            disabled
          />
        </Grid>
      </Grid>

      <Divider light className={classes.divider} />

      <Grid container columnSpacing={2} rowSpacing={2.5}>
        <Grid item md="auto" xs={24}>
          <Field name="hasAudit" label={t('Audit')} type="checkbox" component={SwitchField} />
        </Grid>
        <Grid item md="auto" xs={24}>
          <Field
            name="auditType"
            label={t('Type')}
            component={RadioField}
            type="text"
            options={[
              { label: 'Desk', value: AuditType.Desk },
              { label: 'Field', value: AuditType.Field },
            ]}
          />
        </Grid>
        <Grid item xl={2} lg={3} md={4} xs={24}>
          <Field name="hasAudit" type="checkbox">
            {({ input }) => {
              const { checked } = input;
              return (
                <Field
                  name="auditRegularity"
                  label={t('AuditRegularity')}
                  component={SelectField}
                  disabled={!checked}
                >
                  <MenuItem value={AuditRegularity.Month12}>
                    {t('MonthWithCount', { count: 12 })}
                  </MenuItem>
                  <MenuItem value={AuditRegularity.Month24}>
                    {t('MonthWithCount', { count: 24 })}
                  </MenuItem>
                </Field>
              );
            }}
          </Field>
        </Grid>
      </Grid>

      <Divider light className={classes.divider} />

      <Grid container columnSpacing={2} rowSpacing={2.5}>
        <Grid item xs="auto">
          <Typography component="span" noWrap={true} className={classes.checkTitle}>
            {t('ConsiderIinPercentsRiseInPrice')}
          </Typography>
        </Grid>
        <Grid item xs={23}>
          <Field
            name="hasFeePriceRule"
            label={t('Commission')}
            type="checkbox"
            component={CheckboxField}
          />
          <Field
            name="hasInsurancePriceRule"
            label={t('Insurance')}
            type="checkbox"
            component={CheckboxField}
          />
          <Field
            name="hasTelematicsPriceRule"
            label={t('Telematics')}
            type="checkbox"
            component={CheckboxField}
          />
          <Field
            name="hasSubsidyPriceRule"
            label={t('Subsidy')}
            type="checkbox"
            component={CheckboxField}
          />
        </Grid>
      </Grid>

      <Divider light className={classes.divider} />

      <Grid container columnSpacing={2} rowSpacing={2.5}>
        <Grid item xl={5} lg={6} md={8} xs={24}>
          <Field
            name="calculationMethodType"
            label={t('CalculationMethod')}
            component={SelectField}
          >
            <MenuItem value={CalculationMethodType.Forward}>
              {t('CalculationMethodType.Forward')}
            </MenuItem>
            <MenuItem value={CalculationMethodType.Reverse}>
              {t('CalculationMethodType.Reverse')}
            </MenuItem>
            <MenuItem value={CalculationMethodType.ReverseIRR}>
              {t('CalculationMethodType.ReverseIRR')}
            </MenuItem>
          </Field>
        </Grid>
        <Field name="calculationMethodType">
          {({ input }) => {
            const { value } = input;
            const irrDisabled = value !== CalculationMethodType.ReverseIRR;
            const rizePriceDisabled = value !== CalculationMethodType.Reverse;
            return (
              <>
                <Grid item xl={3} lg={4} md={5} xs={24}>
                  <FixedTypeInput
                    name="irrPercents"
                    label={t('IRR')}
                    disabled={irrDisabled}
                    amountMode={AmountType.Percents}
                    icon="%"
                  />
                </Grid>
                <Grid item xl={3} lg={4} md={5} xs={24}>
                  <FixedTypeInput
                    name="rizeInPricePercents"
                    label={t('RizeInPrice')}
                    disabled={rizePriceDisabled}
                    amountMode={AmountType.Percents}
                    icon="%"
                  />
                </Grid>
              </>
            );
          }}
        </Field>
      </Grid>
    </div>
  );
};
