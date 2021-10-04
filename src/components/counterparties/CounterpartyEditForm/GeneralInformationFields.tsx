import { useCallback, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { Checkbox, Input, PhoneInput } from 'components/form';
import { FieldsControlProps } from './types';
import { CounterpartyViewModel } from 'schema/serverTypes';

export type GeneralInformationFieldsProps = FieldsControlProps & {
  clearErrors: UseFormReturn<CounterpartyViewModel>['clearErrors'];
  isValid: boolean;
};

export const GeneralInformationFields = (props: GeneralInformationFieldsProps) => {
  const { control, isValid, clearErrors } = props;
  const { t } = useTranslation();

  const { isDealer, isInsuranceCompany, isLessee, isLessor } = useWatch({
    control,
  });

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

  return (
    <Grid container>
      <Grid container item spacing={2}>
        <Grid item>
          <Checkbox name="isLessee" label={t('Lessee')} control={control} rules={lesseeRules} />
        </Grid>
        <Grid item>
          <Checkbox name="isDealer" label={t('Dealer')} control={control} rules={dealerRules} />
        </Grid>
        <Grid item>
          <Checkbox
            name="isInsuranceCompany"
            label={t('InsuranceCompany')}
            control={control}
            rules={insuranceCompanyRule}
          />
        </Grid>
        <Grid item>
          <Checkbox name="isLessor" label={t('Lessor')} control={control} rules={lessorRules} />
        </Grid>
      </Grid>
      <Grid container item spacing={2}>
        <Grid md={2} xs={12} item>
          <Input label={`${t('Inn')}*`} name="inn" control={control} disabled />
        </Grid>
        <Grid md={10} xs={12} item>
          <Input label={`${t('AbbreviatedName')}`} name="name" control={control} />
        </Grid>
      </Grid>
      <Grid container item spacing={2}>
        <Grid md={6} xs={12} item>
          <Input label={`${t('Full name')}`} name="fullName" control={control} disabled />
        </Grid>
        <Grid item md={6} xs={12}>
          <Input
            label={`${t('NameInLatin')}*`}
            name="transliteratedName"
            control={control}
            disabled
          />
        </Grid>
      </Grid>
      <Grid container item spacing={2}>
        <Grid item md={4} xs={12}>
          <PhoneInput label={t('ContactPhone')} name="phoneNumber" control={control} />
        </Grid>
        <Grid item md={4} xs={12}>
          <Input label={t('Email')} name="email" control={control} />
        </Grid>
      </Grid>
    </Grid>
  );
};
