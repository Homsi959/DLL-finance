import { Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Input, DatePicker } from 'components/form';
import { FieldsControlProps } from './types';
import { Activities } from './Activities';

export const AdditionalDataFields = (props: FieldsControlProps) => {
  const { control } = props;
  const { t } = useTranslation();

  return (
    <Grid container spacing={3}>
      <Grid item container spacing={2}>
        <Grid item md={2} xs={12}>
          <DatePicker
            label={`${t('Registration date')}`}
            name="registrationDate"
            control={control}
            disabled
          />
        </Grid>
        <Grid item md={2} xs={12}>
          <Input label={`${t('OGRN')}`} name="ogrn" control={control} disabled />
        </Grid>
        <Grid item md={2} xs={12}>
          <Input label={`${t('KPP')}`} name="kpp" control={control} disabled />
        </Grid>
        <Grid item md={2} xs={12}>
          <Input label={`${t('OKPO')}`} name="okpo" control={control} disabled />
        </Grid>
        <Grid item md={4} xs={12}>
          <DatePicker
            label={`${t('Date of general conditions with the seller')}`}
            name="generalCondidionsSellerDate"
            control={control}
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <DatePicker
            label={`${t('Date of general conditions with the lessee')}`}
            name="generalCondidionsLesseeDate"
            control={control}
          />
        </Grid>
      </Grid>
      <Activities control={control} />
    </Grid>
  );
};
