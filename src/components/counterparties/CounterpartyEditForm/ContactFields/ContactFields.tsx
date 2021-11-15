import { Typography } from '@material-ui/core';
import { Grid } from 'components/Grid';
import { useCallback } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Contact as CounterpartyContact } from 'schema/serverTypes';
import { FieldsControlProps } from '../types';
import { Contact } from './Contact';
import { Addresses } from './Addresses';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button } from 'components';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    add: {
      color: theme.palette.primary.light,
    },
    wrapper: {
      width: '100%',
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
    <div className={classes.wrapper}>
      {fields.map((item, index) => {
        return (
          <Contact key={item.id} item={item} index={index} remove={remove} control={control} />
        );
      })}
      <Grid container columnSpacing={2} rowSpacing={2.5}>
        <Grid item xs={24}>
          <Button variant="text" className={classes.add} onClick={onAdd}>
            <Typography variant="subtitle1">+ {t('Add')}</Typography>
          </Button>
        </Grid>
      </Grid>
      <Addresses control={control} setValue={setValue} />
    </div>
  );
};
