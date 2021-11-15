import { useCallback } from 'react';
import { Divider, MenuItem, Typography } from '@material-ui/core';
import { Grid } from 'components/Grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { FieldArrayWithId } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Input, Radio, RadioOption, Select, DatePicker } from 'components/form';
import { FieldsControlProps } from '../types';
import { IconSprite } from 'components/icons';
import theme from 'theme';
import { CounterpartyFormValues } from 'components/counterparties/types';
import { Button } from 'components';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    head: {
      color: theme.palette.secondary.main,
    },
    delete: {
      textAlign: 'right',
      '& > *': {
        minWidth: 0,
        color: theme.palette.primary.light,
      },
    },
    divider: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      '&:last-of-type': {
        display: 'none',
      },
    },
    wrapper: {
      width: '100%',
    },
  })
);

export type SignerProps = FieldsControlProps & {
  item: FieldArrayWithId<CounterpartyFormValues, 'heads', 'id'>;
  index: number;
  remove: (index?: number | number[] | undefined) => void;
};

export const Signer = (props: SignerProps) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { index, remove, control } = props;

  const onDelete = useCallback(() => {
    remove(index);
  }, [remove, index]);

  return (
    <div className={classes.wrapper}>
      <Grid container columnSpacing={2} rowSpacing={2.5}>
        <Grid item xs={22}>
          <Typography variant="subtitle1" className={classes.head}>
            {t('Signer')} {index + 1}
          </Typography>
        </Grid>
        <Grid item xs={2} className={classes.delete}>
          <Button variant="text" className={classes.delete} onClick={onDelete}>
            <IconSprite
              icon="delete"
              color={theme.palette.primary.light}
              width="14px"
              height="15px"
            />
          </Button>
        </Grid>
      </Grid>
      <Grid container columnSpacing={2} rowSpacing={2.5}>
        <Grid item md={7} xs={24}>
          <Input
            label={t('LastName')}
            name={`heads.${index}.lastName` as const}
            control={control}
            rules={{
              required: {
                value: true,
                message: t('Required'),
              },
            }}
          />
        </Grid>
        <Grid item md={7} xs={24}>
          <Input
            label={t('FirstName')}
            name={`heads.${index}.firstName` as const}
            control={control}
            rules={{
              required: {
                value: true,
                message: t('Required'),
              },
            }}
          />
        </Grid>
        <Grid item md={7} xs={24}>
          <Input
            label={t('MiddleName')}
            name={`heads.${index}.middleName` as const}
            control={control}
            rules={{
              required: {
                value: true,
                message: t('Required'),
              },
            }}
          />
        </Grid>
        <Grid item md={3} xs={24}>
          <Input
            label={t('Initials')}
            name={`heads.${index}.initials` as const}
            control={control}
            rules={{
              required: {
                value: true,
                message: t('Required'),
              },
            }}
          />
        </Grid>
      </Grid>
      <Grid container columnSpacing={2} rowSpacing={2.5}>
        <Grid item md={8} xs={24}>
          <Input
            label={t('Position')}
            name={`heads.${index}.position` as const}
            control={control}
            rules={{
              required: {
                value: true,
                message: t('Required'),
              },
            }}
          />
        </Grid>
        <Grid item md={8} xs={24}>
          <Select
            label={t('Reason')}
            name={`heads.${index}.reason` as const}
            control={control}
            defaultValue={''}
          >
            <MenuItem value={'Statute'}>{t('Statute')}</MenuItem>
            <MenuItem value={'Power of attorney'}>{t('Power of attorney')}</MenuItem>
          </Select>
        </Grid>
        <Grid item md={4} xs={24}>
          <Input label={t('Number')} name={`heads.${index}.number` as const} control={control} />
        </Grid>
        <Grid item md={4} xs={24}>
          <DatePicker label={t('Date')} name={`heads.${index}.date` as const} control={control} />
        </Grid>
      </Grid>
      <Grid container columnSpacing={2} rowSpacing={2.5}>
        <Grid item md={8} xs={24}>
          <Radio
            label={t('Signer level')}
            name={`heads.${index}.level` as const}
            control={control}
            defaultValue={'All'}
            options={[
              { label: t('All documents'), value: 'All' } as RadioOption,
              { label: t('Acts only'), value: 'Acts' } as RadioOption,
            ]}
          />
        </Grid>
      </Grid>
      <Divider light className={classes.divider} />
    </div>
  );
};
