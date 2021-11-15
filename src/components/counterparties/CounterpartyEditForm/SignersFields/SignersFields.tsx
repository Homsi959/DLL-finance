import { Typography } from '@material-ui/core';
import { Grid } from 'components/Grid';
import { useCallback } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FieldsControlProps } from '../types';
import { Signer } from './Signer';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { HeadViewModel } from 'components/counterparties/types';
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

export const SignersFields = (props: FieldsControlProps) => {
  const { control } = props;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'heads',
  });

  const classes = useStyles();

  const { t } = useTranslation();

  const onAdd = useCallback(() => {
    const head: HeadViewModel = {
      headId: 0,
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
    <div className={classes.wrapper}>
      {fields.map((item, index) => {
        return <Signer key={item.id} item={item} index={index} remove={remove} control={control} />;
      })}
      <Grid container columnSpacing={2} rowSpacing={2.5}>
        <Grid item xs={24}>
          <Button variant="text" className={classes.add} onClick={onAdd}>
            <Typography variant="subtitle1">+ {t('Add')}</Typography>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};
