import { Button, Grid, Typography } from '@material-ui/core';
import { useCallback } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Head } from 'schema/serverTypes';
import { FieldsControlProps } from '../types';
import { Signer } from './Signer';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    add: {
      color: theme.palette.primary.light,
      marginTop: theme.spacing(2),
    },
  })
);

export const SignersFields = (props: FieldsControlProps) => {
  const { control } = props;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'heads',
  });

  const classes = useStyles();

  const { t } = useTranslation();

  const onAdd = useCallback(() => {
    const head: Head = {
      lastName: '',
      firstName: '',
      middleName: '',
      position: '',
      initials: '',
      phoneNumber: '',
      email: '',
      level: '',
      reason: '',
      number: '',
      date: '',
    };
    append(head);
  }, [append]);

  return (
    <Grid container>
      {fields.map((item, index) => {
        return <Signer key={item.id} item={item} index={index} remove={remove} control={control} />;
      })}
      <Grid item xs={12}>
        <Button variant="text" className={classes.add} onClick={onAdd}>
          <Typography variant="subtitle1">+ {t('Add')}</Typography>
        </Button>
      </Grid>
    </Grid>
  );
};
