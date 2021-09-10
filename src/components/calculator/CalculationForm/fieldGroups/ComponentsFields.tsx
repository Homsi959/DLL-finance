import {
  Grid,
  MenuItem,
  makeStyles,
  createStyles,
  Typography,
  Theme,
  Divider,
} from '@material-ui/core';
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
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    auditGridItem: {
      maxWidth: '180px',
      paddingTop: theme.spacing(0),
    },
    rizeInPrizeLabel: {
      marginRight: theme.spacing(1),
    },
    divider: {
      marginTop: theme.spacing(1.5),
      marginBottom: theme.spacing(1.5),
    },
    switchField: {
      minWidth: '210px',
      '& .MuiTypography-root': {
        paddingTop: theme.spacing(0),
      },
    },
    hasPropertyTax: {
      maxWidth: '200px',
      minWidth: '200px',
    },
    insuranceFranchise: {
      [theme.breakpoints.between(1200, 1440)]: {
        maxWidth: '160px',
      },
    },
    hasInsurance: {
      minWidth: '170px',
      '& .MuiTypography-root': {
        paddingTop: theme.spacing(0),
      },
    },
    insuranceCompany: {
      minWidth: '290px',
    },
    telematics: {
      maxWidth: '160px',
    },
    agentFeeRefund: {
      [theme.breakpoints.between(1200, 1280)]: {
        maxWidth: '310px',
      },
    },
    itemDiscount: {
      minWidth: '180px',
    },
    subsidyVendor: {
      minWidth: '200px',
    },
    calculationMethodType: {
      minWidth: '350px',
    },
    irr: {
      maxWidth: '160px',
    },
    balanceHolder: {
      marginTop: theme.spacing(-0.2),
    },
    marginTop: {
      marginTop: theme.spacing(1),
    },
  })
);

export const ComponentsFields = (props: FormFieldsProps) => {
  const classes = useStyles();
  const { form } = props;

  const { t } = useTranslation();

  return (
    <Grid container spacing={0}>
      <Grid container item xs={12} spacing={2}>
        <Grid className={classes.balanceHolder} item lg={3} md={4} xs={12}>
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
        <Grid item md={4} xs={12} style={{ maxWidth: '270px' }}>
          <Field
            name="hasPropertyTax"
            label={t('PropertyTax')}
            type="checkbox"
            component={SwitchField}
          />
        </Grid>
        <Grid className={clsx(classes.marginTop, classes.hasPropertyTax)} item md={2} xs={12}>
          <Field name="hasPropertyTax" type="checkbox">
            {({ input }) => {
              return (
                <AmountField
                  name="propertyTax"
                  label={`${t('PropertyTax')}, %`}
                  disabled={!input.checked}
                  required={input.checked}
                  amountMode={AmountType.Percents}
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
      <Grid container item xs={12} spacing={2}>
        <Grid className={classes.hasInsurance} item md={2} xs={12}>
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
                <Grid className={classes.insuranceCompany} item lg={4} md={3} xs={12}>
                  <CounterpartyAutocompleteField
                    label={t('InsuranceCompany')}
                    counterpartyType={CounterpartyType.insuranceCompany}
                    disabled={disabled}
                    setFirstOptionAsDefault={!disabled}
                  />
                </Grid>
                <Grid item md={2} xs={12}>
                  <AmountField
                    name="insuranceRatePercents"
                    label={`${t('InsuranceRate')}, %`}
                    amountMode={AmountType.Percents}
                    disabled={disabled}
                  />
                </Grid>
                <Grid className={classes.insuranceFranchise} item lg={2} md={3} xs={12}>
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
                <Grid item md={2} xs={12}>
                  <AmountField
                    name="franchiseAmount"
                    label={t('Amount')}
                    amountMode={AmountType.Money}
                    disabled={disabled}
                  />
                </Grid>
              </>
            );
          }}
        </Field>
      </Grid>
      <Divider light className={classes.divider} />
      <Grid container item xs={12} spacing={2}>
        <Grid className={classes.itemDiscount} item md={2} xs={12}>
          <AmountField name="itemDiscount" label={t('Discount')} useSaleCurrency={true} />
        </Grid>
        <Grid className={classes.subsidyVendor} item md={2} xs={12}>
          <AmountField name="subsidyDealer" label={t('Subsidy')} useSaleCurrency={true} />
        </Grid>
        <Grid className={classes.switchField} item lg={2} md={3} xs={12}>
          <Field
            name="hasVehicleRegistration"
            label={t('VehicleRegistration')}
            type="checkbox"
            component={SwitchField}
          />
        </Grid>
        <Grid className={classes.telematics} item md={3} xs={12}>
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
      <Grid container item xs={12} spacing={2}>
        <Grid item lg={4} md={4} xs={12}>
          <Field name="agent" label={t('Agent')} component={TextField} disabled />
        </Grid>
        <Grid item lg={4} md={4} xs={12}>
          <AmountField name="agentFee" label={t('AgentFee')} />
        </Grid>
        <Grid item lg={4} md={4} xs={12}>
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
        <Grid className={classes.agentFeeRefund} item lg={4} md={6} xs={12}>
          <Field
            name={t('AgentFeeRefund')}
            label="Способ возмещения агентской комиссии"
            component={SelectField}
            disabled
          ></Field>
        </Grid>
      </Grid>
      <Divider light className={classes.divider} />
      <Grid container item xs={12} spacing={2}>
        <Grid item md={4} xs={12} className={classes.auditGridItem}>
          <Field name="hasAudit" label={t('Audit')} type="checkbox" component={SwitchField} />
        </Grid>
        <Grid item md={4} xs={12} className={classes.auditGridItem}>
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
        <Grid item md={4} xs={12} className={classes.auditGridItem}>
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
      <Grid container item xs={12} spacing={2}>
        <Grid item md={12} xs={12}>
          <Typography className={classes.rizeInPrizeLabel} component="span">
            {t('ConsiderIinPercentsRiseInPrice')}
          </Typography>
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
      <Grid container item xs={12} spacing={2}>
        <Grid className={classes.calculationMethodType} item md={4} xs={12}>
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
                <Grid className={classes.irr} item md={3} xs={12}>
                  <AmountField
                    name="irrPercents"
                    label={t('IRR')}
                    disabled={irrDisabled}
                    amountMode={AmountType.Percents}
                  />
                </Grid>
                <Grid item md={2} xs={12}>
                  <AmountField
                    name="rizeInPricePercents"
                    label={t('RizeInPrice')}
                    disabled={rizePriceDisabled}
                    amountMode={AmountType.Percents}
                  />
                </Grid>
              </>
            );
          }}
        </Field>
      </Grid>
    </Grid>
  );
};
