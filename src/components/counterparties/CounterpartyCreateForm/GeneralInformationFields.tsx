import { useCallback, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { Checkbox, Input, PhoneInput } from 'components/form';
import { CounterpartyFormValues } from '../types';
import { Grid } from 'components/Grid';
import { Autocomplete } from 'components/Autocomplete';
import { CounterpartyFormProps } from './types';
import {
  CounterpartyAutocompleteOption,
  useCounterpartyAutocomplete,
} from './useCounterpartyAutocomplete';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    groupsHead: {
      color: theme.palette.secondary.main,
      display: 'inline-block',
      marginRight: 20,
    },
  })
);

export type GeneralInformationFieldsProps = CounterpartyFormProps & {
  clearErrors: UseFormReturn<CounterpartyFormValues>['clearErrors'];
  isValid: boolean;
};

export const GeneralInformationFields = (props: GeneralInformationFieldsProps) => {
  const classes = useStyles();
  const { control, reset, isValid, clearErrors } = props;
  const { t } = useTranslation();
  const { isDealer, isInsuranceCompany, isLessee, isLessor, typeOptions } = useWatch({
    control,
  });

  const isDealerDisabled = typeOptions?.isDealer ?? false;
  const isLesseeDisabled = typeOptions?.isLessee ?? false;
  const isInsuranceDisabled = typeOptions?.isInsuranceCompany ?? false;

  useEffect(() => {
    if (isDealer || isInsuranceCompany || isLessee || isLessor) {
      if (!isValid) {
        clearErrors(['isDealer', 'isInsuranceCompany', 'isLessee', 'isLessor']);
      }
    }
  }, [isDealer, isInsuranceCompany, isLessee, isLessor, isValid, clearErrors]);

  const required = t('Required');

  const validateIsLessee = useCallback(
    (value: boolean) => {
      if (!value && !isDealer && !isInsuranceCompany && !isLessor) {
        return required;
      }
      if (value && isLessor) {
        return required;
      }
      return true;
    },
    [isDealer, isInsuranceCompany, isLessor, required]
  );

  const validateIsDealer = useCallback(
    (value: boolean) => {
      if (!value && !isLessee && !isInsuranceCompany && !isLessor) {
        return required;
      }
      return true;
    },
    [isLessee, isInsuranceCompany, isLessor, required]
  );

  const validateIsLessor = useCallback(
    (value: boolean) => {
      if (!value && !isLessee && !isInsuranceCompany && !isDealer) {
        return required;
      }
      if (value && isLessee) {
        return required;
      }
      return true;
    },
    [isLessee, isInsuranceCompany, isDealer, required]
  );

  const validateIsInsuranceCompany = useCallback(
    (value: boolean) => {
      if (!value && !isLessee && !isLessor && !isDealer) {
        return required;
      }
      return true;
    },
    [isLessee, isLessor, isDealer, required]
  );

  const lesseeRules = {
    validate: validateIsLessee,
  };
  const dealerRules = {
    validate: validateIsDealer,
  };
  const lessorRules = {
    validate: validateIsLessor,
  };
  const insuranceCompanyRule = {
    validate: validateIsInsuranceCompany,
  };

  const { inn, name } = useCounterpartyAutocomplete({ control, reset });

  return (
    <div className={classes.root}>
      <Grid container columnSpacing={2} rowSpacing={2.5}>
        <Grid item xs={24}>
          <Checkbox
            name="isLessee"
            label={t('Lessee')}
            control={control}
            rules={lesseeRules}
            disabled={isLesseeDisabled}
          />
          <Checkbox
            name="isDealer"
            label={t('Dealer')}
            control={control}
            rules={dealerRules}
            disabled={isDealerDisabled}
          />
          <Checkbox
            name="isInsuranceCompany"
            label={t('InsuranceCompany')}
            control={control}
            rules={insuranceCompanyRule}
            disabled={isInsuranceDisabled}
          />
          <Checkbox name="isLessor" label={t('Lessor')} control={control} rules={lessorRules} />
        </Grid>
      </Grid>
      <Grid container columnSpacing={2} rowSpacing={2.5}>
        <Grid md={4} xs={24} item>
          <Autocomplete<CounterpartyAutocompleteOption> label={`${t('Inn')}`} {...inn} />
        </Grid>
        <Grid md={20} xs={24} item>
          <Autocomplete<CounterpartyAutocompleteOption>
            label={`${t('AbbreviatedName')}`}
            {...name}
          />
        </Grid>
      </Grid>
      <Grid container columnSpacing={2} rowSpacing={2.5}>
        <Grid md={12} xs={24} item>
          <Input label={`${t('Full name')}`} name="fullName" control={control} disabled />
        </Grid>
        <Grid item md={12} xs={24}>
          <Input
            label={`${t('NameInLatin')}*`}
            name="transliteratedName"
            control={control}
            disabled
          />
        </Grid>
      </Grid>
      <Grid container columnSpacing={2} rowSpacing={2.5}>
        <Grid item md={8} xs={24}>
          <PhoneInput label={t('ContactPhone')} name="phoneNumber" control={control} />
        </Grid>
        <Grid item md={8} xs={24}>
          <Input label={t('Email')} name="email" control={control} />
        </Grid>
      </Grid>
    </div>
  );
};
