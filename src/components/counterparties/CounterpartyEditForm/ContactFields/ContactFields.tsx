import { Button, Grid, Typography } from '@material-ui/core';
import { useCallback } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Contact as CounterpartyContact } from 'schema/serverTypes';
import { FieldsControlProps } from '../types';
import { Contact } from './Contact';
import { Addresses } from './Addresses';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    add: {
      color: theme.palette.primary.light,
      marginTop: theme.spacing(2),
    },
  })
);

export const ContactFields = (props: FieldsControlProps) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { control, setValue } = props;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'contacts',
  });

  const onAdd = useCallback(() => {
    const head: CounterpartyContact = {
      lastName: '',
      firstName: '',
      middleName: '',
      position: '',
      initials: '',
      phoneNumber: '',
      email: '',
    };
    append(head);
  }, [append]);

  return (
    <Grid container>
      {fields.map((item, index) => {
        return (
          <Contact key={item.id} item={item} index={index} remove={remove} control={control} />
        );
      })}
      <Grid item xs={12}>
        <Button variant="text" className={classes.add} onClick={onAdd}>
          <Typography variant="subtitle1">+ {t('Add')}</Typography>
        </Button>
      </Grid>
      <Addresses control={control} setValue={setValue} />
    </Grid>
  );
};
