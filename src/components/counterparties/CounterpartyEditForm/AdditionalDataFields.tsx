import { Grid } from 'components/Grid';
import { useTranslation } from 'react-i18next';
import { useWatch } from 'react-hook-form';
import { Input, DatePicker } from 'components/form';
import { FieldsControlProps } from './types';
import { Activities } from './Activities';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      width: '100%',
    },
  })
);

export const AdditionalDataFields = (props: FieldsControlProps) => {
  const classes = useStyles();
  const { control } = props;
  const { t } = useTranslation();

  const isDealer = useWatch({ control, name: 'isDealer' });
  const isInsuranceCompany = useWatch({ control, name: 'isInsuranceCompany' });
  const isLessee = useWatch({ control, name: 'isLessee' });
  const isLessor = useWatch({ control, name: 'isLessor' });

  const dateWithSellerDisabled = isLessor || isInsuranceCompany || isLessee || !isDealer;
  const dateWithLesseeDisabled = isLessor || isInsuranceCompany || isDealer || !isLessee;

  return (
    <div className={classes.wrapper}>
      <Grid container columnSpacing={2} rowSpacing={2.5}>
        <Grid item xl={2} lg={3} md={5} xs={24}>
          <DatePicker
            label={`${t('Registration date')}`}
            name="registrationDate"
            control={control}
            disabled
          />
        </Grid>
        <Grid item xl={2} lg={3} md={4} xs={24}>
          <Input label={`${t('OGRN')}`} name="ogrn" control={control} disabled />
        </Grid>
        <Grid item xl={2} lg={3} md={4} xs={24}>
          <Input label={`${t('KPP')}`} name="kpp" control={control} disabled />
        </Grid>
        <Grid item xl={2} lg={3} md={4} xs={24}>
          <Input label={`${t('OKPO')}`} name="okpo" control={control} disabled />
        </Grid>
        <Grid item xl={5} lg={6} md={9} xs={24}>
          <DatePicker
            label={`${t('Date of general conditions with the seller')}`}
            name="generalCondidionsSellerDate"
            control={control}
            disabled={dateWithSellerDisabled}
          />
        </Grid>
        <Grid item xl={4} lg={6} md={8} xs={24}>
          <DatePicker
            label={`${t('Date of general conditions with the lessee')}`}
            name="generalCondidionsLesseeDate"
            control={control}
            disabled={dateWithLesseeDisabled}
          />
        </Grid>
      </Grid>
      <Activities control={control} />
    </div>
  );
};
