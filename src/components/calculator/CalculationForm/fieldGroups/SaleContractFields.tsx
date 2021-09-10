import { Grid, MenuItem, makeStyles, createStyles, Theme, Divider } from '@material-ui/core';
import { Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import { SelectField, SwitchField, RadioField, RadioFieldOption, useRequired } from 'components';
import { AmountField } from '../../AmountField';
import {
  LeaseProductAutocomplete,
  BrandAutocompleteField,
  CategoryAutocompleteField,
  ModelAutocompleteField,
  CounterpartyAutocompleteField,
} from '../DictionaryFields';
import { Currency, AmountType, CounterpartyType } from 'schema';
import { NomenclatureContextProvider } from '../NomenclatureContextProvider';
import { FormFieldsProps } from './types';
import { getNumber } from '../../utils';
import { useRequiredOnSave } from '../requiredOnSave';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    leaseProduct: {
      minWidth: '193px',
      [theme.breakpoints.up('lg')]: {
        minWidth: 0,
      },
    },
    secondHandField: {
      '& .MuiTypography-root': {
        minWidth: '20px',
        [theme.breakpoints.down(1765)]: {
          paddingTop: theme.spacing(0),
        },
      },
      '& .MuiFormControl-root': {
        marginTop: theme.spacing(1),
      },
    },
    CounterpartyAutocompleteField: {
      maxWidth: '368px',
      [theme.breakpoints.up('lg')]: {
        maxWidth: 'none',
      },
    },
    currencySaleField: {
      [theme.breakpoints.up('lg')]: {
        maxWidth: '160px',
      },
      '& fieldset': {
        marginLeft: theme.spacing(1),
      },
      '& .MuiButtonBase-root': {
        padding: theme.spacing(1),
      },
      '& .MuiFormControl-root': {
        marginTop: theme.spacing(1),
      },
    },
    divider: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(1),
    },
    commissionLabel: {
      textAlign: 'right',
      '& .MuiGrid-root': {
        flexWrap: 'nowrap',
      },
    },
    currencyCommission: {
      [theme.breakpoints.up('lg')]: {
        maxWidth: '180px',
      },
      '& .MuiFormControl-root': {
        marginTop: theme.spacing(0.5),
      },
    },
    AmountField: {
      maxWidth: '130px',
      [theme.breakpoints.up('lg')]: {
        maxWidth: 'none',
      },
    },
    currencyRate: {
      minWidth: '100px',
      [theme.breakpoints.up('lg')]: {
        minWidth: 0,
      },
    },
  })
);

export const SaleContractFields = (props: FormFieldsProps) => {
  const classes = useStyles();
  const { form } = props;
  const year = new Date().getFullYear();

  const { t } = useTranslation();
  const { requiredOnSave } = useRequiredOnSave();
  const { required } = useRequired();

  return (
    <Grid container spacing={0}>
      <Grid container item xs={12} spacing={2}>
        <Grid className={classes.leaseProduct} item md={2} xs={12}>
          <Field
            name="leaseProduct"
            label={t('LeaseProduct')}
            component={LeaseProductAutocomplete}
            validate={requiredOnSave}
          />
        </Grid>
        <Grid className={classes.CounterpartyAutocompleteField} item md={5} xs={12}>
          <CounterpartyAutocompleteField
            label={t('Dealer')}
            counterpartyType={CounterpartyType.dealer}
            validate={requiredOnSave}
          />
        </Grid>
        <Grid className={classes.CounterpartyAutocompleteField} item md={5} xs={12}>
          <CounterpartyAutocompleteField
            label={t('Lessee')}
            counterpartyType={CounterpartyType.lessee}
          />
        </Grid>
      </Grid>
      <NomenclatureContextProvider form={form}>
        <Grid container item xs={12} spacing={2}>
          <Grid item md={6} xs={12}>
            <BrandAutocompleteField />
          </Grid>
          <Grid item md={6} xs={12}>
            <CategoryAutocompleteField />
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={2}>
          <Grid item md={8} xs={12}>
            <ModelAutocompleteField />
          </Grid>
          <Grid item md={1} xs={12}>
            <Field
              name="numberOfItems"
              label={t('NumberOfItems')}
              component={SelectField}
              validate={required}
            >
              {Array.from(Array(100)).map((_, i) => {
                return (
                  <MenuItem key={i + 1} value={i + 1}>
                    {i + 1}
                  </MenuItem>
                );
              })}
            </Field>
          </Grid>
          <Grid item md={2} xs={12}>
            <Field name="year" label={t('Year')} component={SelectField}>
              {Array.from(Array(11)).map((_, i) => {
                return (
                  <MenuItem key={year - i} value={year - i}>
                    {year - i}
                  </MenuItem>
                );
              })}
            </Field>
            <OnChange name="year">
              {(value) => {
                const selectedYear = getNumber(value);
                const currentYear = new Date().getFullYear();
                form.change('secondHand', selectedYear < currentYear);
              }}
            </OnChange>
          </Grid>
          <Grid className={classes.secondHandField} item md={1} xs={12}>
            <Field
              name="secondHand"
              labelOn={t('SecondHand')}
              labelOff={t('New')}
              type="checkbox"
              component={SwitchField}
            />
          </Grid>
        </Grid>
      </NomenclatureContextProvider>
      <Divider light className={classes.divider} />
      <Grid container item xs={12} spacing={0}>
        <Grid item md={2} xs={12}>
          <AmountField
            name="itemPrice"
            label={t('ItemPrice')}
            amountMode={AmountType.Money}
            required
          />
        </Grid>
        <Grid className={classes.currencySaleField} item md={2} xs={12}>
          <Field
            name="currencySale"
            label={t('Currencies.Sale')}
            component={RadioField}
            type="text"
            options={[
              { label: '₽', value: Currency.Ruble } as RadioFieldOption,
              { label: '$', value: Currency.Dollar } as RadioFieldOption,
              { label: '€', value: Currency.Euro } as RadioFieldOption,
            ]}
          />
        </Grid>
        <Grid className={classes.currencyRate} item lg={2} md={1} xs={12}>
          <AmountField
            name="currencyRate"
            label={t('Currencies.Rate')}
            amountMode={AmountType.Money}
            fractionDigits={4}
          />
        </Grid>
        <Grid className={classes.currencySaleField} item md={2} xs={12}>
          <Field
            name="currencyLease"
            label={t('Currencies.Lease')}
            component={RadioField}
            type="text"
            options={[
              { label: '₽', value: Currency.Ruble } as RadioFieldOption,
              { label: '$', value: Currency.Dollar } as RadioFieldOption,
              { label: '€', value: Currency.Euro } as RadioFieldOption,
            ]}
          />
        </Grid>
        <Grid className={classes.currencyCommission} item lg={2} md={3} xs={12}>
          <Field
            name="currencyCommission"
            label={t('Currencies.ConversionFee')}
            labelOn={t('Yes')}
            labelOff={t('No')}
            type="checkbox"
            classes={{
              root: classes.commissionLabel,
            }}
            component={SwitchField}
          />
        </Grid>
        <Grid className={classes.AmountField} item md={2} xs={12}>
          <AmountField
            name="leaseItemCost"
            label={t('LeaseItemCost')}
            amountMode={AmountType.Money}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
