import { useCallback } from 'react';
import { Typography } from '@material-ui/core';
import { Grid } from 'components/Grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { FieldArrayWithId } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CounterpartyViewModel } from 'schema/serverTypes';
import { Input, PhoneInput } from 'components/form';
import { FieldsControlProps } from '../types';
import { IconSprite } from 'components/icons';
import theme from 'theme';
import { Button } from 'components';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& + &': {
        marginTop: '28px',
      },
    },
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
    },
  })
);

export type ContactProps = FieldsControlProps & {
  item: FieldArrayWithId<CounterpartyViewModel, 'contacts', 'id'>;
  index: number;
  remove: (index?: number | number[] | undefined) => void;
};

export const Contact = (props: ContactProps) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { index, remove, control } = props;

  const onDelete = useCallback(() => {
    remove(index);
  }, [remove, index]);

  return (
    <Grid container columnSpacing={2} rowSpacing={2.5} className={classes.root}>
      <Grid item xs={22}>
        <Typography variant="subtitle1" className={classes.head}>
          {t('The contact person (not a signer)')} {index + 1}
        </Typography>
      </Grid>
      <Grid item xs={2} className={classes.delete}>
        <Button variant="text" onClick={onDelete}>
          <IconSprite
            icon="delete"
            color={theme.palette.primary.light}
            width="14px"
            height="15px"
          />
        </Button>
      </Grid>
      <Grid item md={6} xs={24}>
        <Input
          label={t('LastName')}
          name={`contacts.${index}.lastName` as const}
          control={control}
        />
      </Grid>
      <Grid item md={6} xs={24}>
        <Input
          label={t('FirstName')}
          name={`contacts.${index}.firstName` as const}
          control={control}
        />
      </Grid>
      <Grid item md={6} xs={24}>
        <Input
          label={t('MiddleName')}
          name={`contacts.${index}.middleName` as const}
          control={control}
        />
      </Grid>
      <Grid item md={6} xs={24}>
        <Input
          label={t('Initials')}
          name={`contacts.${index}.initials` as const}
          control={control}
        />
      </Grid>
      <Grid item md={8} xs={24}>
        <Input
          label={t('Position')}
          name={`contacts.${index}.position` as const}
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
        <PhoneInput
          label={t('PhoneNumber')}
          name={`contacts.${index}.phoneNumber` as const}
          control={control}
        />
      </Grid>
      <Grid item md={8} xs={24}>
        <Input label={t('Email')} name={`contacts.${index}.email` as const} control={control} />
      </Grid>
    </Grid>
  );
};
