import { useCallback } from 'react';
import { Button, Divider, Grid, MenuItem, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { FieldArrayWithId } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CounterpartyViewModel } from 'schema/serverTypes';
import { Input, Radio, RadioOption, Select, DatePicker } from 'components/form';
import { FieldsControlProps } from '../types';
import { IconSprite } from 'components/icons';
import theme from 'theme';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    head: {
      color: theme.palette.secondary.main,
    },
    delete: {
      minWidth: 0,
      color: theme.palette.primary.light,
    },
    divider: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      '&:last-of-type': {
        display: 'none',
      },
    },
  })
);

export type SignerProps = FieldsControlProps & {
  item: FieldArrayWithId<CounterpartyViewModel, 'heads', 'id'>;
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
    <>
      <Grid container item spacing={2}>
        <Grid item xs>
          <Typography variant="subtitle1" className={classes.head}>
            {t('Signer')} {index + 1}
          </Typography>
        </Grid>
        <Grid item xs={'auto'}>
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
      <Grid container item spacing={2}>
        <Grid item md xs={12}>
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
        <Grid item md xs={12}>
          <Input
            label={t('FirstName')}
            name={`heads.${index}.firstName` as const}
            control={control}
          />
        </Grid>
        <Grid item md xs={12}>
          <Input
            label={t('MiddleName')}
            name={`heads.${index}.middleName` as const}
            control={control}
          />
        </Grid>
        <Grid item md={2} xs={12}>
          <Input
            label={t('Initials')}
            name={`heads.${index}.initials` as const}
            control={control}
          />
        </Grid>
      </Grid>
      <Grid container item spacing={2}>
        <Grid item md={4} xs={12}>
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
        <Grid item md={4} xs={12}>
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
        <Grid item md={4} xs={12}>
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
      </Grid>
      <Grid container item spacing={2}>
        <Grid item md={2} xs={12}>
          <Input label={t('Number')} name={`heads.${index}.number` as const} control={control} />
        </Grid>
        <Grid item md={2} xs={12}>
          <DatePicker label={t('Date')} name={`heads.${index}.date` as const} control={control} />
        </Grid>
      </Grid>
      <Divider light className={classes.divider} />
    </>
  );
};
