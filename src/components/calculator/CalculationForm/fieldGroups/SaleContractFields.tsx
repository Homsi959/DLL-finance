import { MenuItem, makeStyles, createStyles, Theme, Divider } from '@material-ui/core';
import { Grid } from 'components/Grid';
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
    wrapper: {
      width: '100%',
    },
    divider: {
      marginBottom: theme.spacing(2.5),
    },
    commissionLabel: {
      width: '165px',
      textAlign: 'right',
      '& .MuiGrid-root': {
        flexWrap: 'nowrap',
      },
      '& .MuiFormControlLabel-root': {
        marginRigh: 0,
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
    <div className={classes.wrapper}>
      <NomenclatureContextProvider form={form}>
        <Grid container columnSpacing={2} rowSpacing={2.5}>
          <Grid item xl={4} md={6} xs={24}>
            <Field
              name="leaseProduct"
              label={t('LeaseProduct')}
              component={LeaseProductAutocomplete}
              validate={requiredOnSave}
            />
          </Grid>
          <Grid item xl={6} md={9} xs={24}>
            <CounterpartyAutocompleteField
              label={t('Dealer')}
              counterpartyType={CounterpartyType.dealer}
              validate={requiredOnSave}
            />
          </Grid>
          <Grid item xl={6} md={9} xs={24}>
            <CounterpartyAutocompleteField
              label={t('Lessee')}
              counterpartyType={CounterpartyType.lessee}
            />
          </Grid>
          <Grid item xl={8} md={12} xs={24}>
            <BrandAutocompleteField />
          </Grid>
          <Grid item xl={8} md={12} xs={24}>
            <CategoryAutocompleteField />
          </Grid>
          <Grid item xl={10} md={15} xs={24}>
            <ModelAutocompleteField />
          </Grid>
          <Grid item xl={2} md={3} xs={24}>
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
          <Grid item xl={2} md={3} xs={24}>
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
          <Grid item xl={2} md={3} xs={24}>
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

      <Grid container columnSpacing={2} rowSpacing={2.5}>
        <Grid item xl={4} lg={5} md={7} xs={24}>
          <AmountField
            name="itemPrice"
            label={t('ItemPrice')}
            amountMode={AmountType.Money}
            required
          />
        </Grid>
        <Grid item md={'auto'} xs={24}>
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
        <Grid item xl={3} lg={4} md={7} xs={24}>
          <AmountField
            name="currencyRate"
            label={t('Currencies.Rate')}
            amountMode={AmountType.Money}
            fractionDigits={4}
          />
        </Grid>
        <Grid item md={'auto'} xs={24}>
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
        <Grid item md={'auto'} xs={24}>
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
        <Grid item xl={4} lg={5} md={7} xs={24}>
          <AmountField
            name="leaseItemCost"
            label={t('LeaseItemCost')}
            amountMode={AmountType.Money}
          />
        </Grid>
      </Grid>
    </div>
  );
};
