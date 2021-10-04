import { Button, Grid, Typography } from '@material-ui/core';
import { useCallback } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CounterpartyRequisite } from 'schema/serverTypes';
import { Requisite } from './Requisite';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { CounterpartyFormProps } from './types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    add: {
      color: theme.palette.primary.light,
      marginTop: theme.spacing(2),
    },
  })
);

export const RequisitesFields = (props: CounterpartyFormProps) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { control, setValue } = props;

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'requisites',
  });

  const onAdd = useCallback(() => {
    const requisite: CounterpartyRequisite = {
      bic: '',
      bank: '',
      account: '',
      correspondentAccount: '',
      isMain: false,
    };
    append(requisite);
  }, [append]);

  return (
    <Grid container spacing={1}>
      {fields.map((item, index) => {
        return (
          <Requisite
            key={item.id}
            item={item}
            index={index}
            remove={remove}
            update={update}
            control={control}
            setValue={setValue}
          />
        );
      })}
      <Grid item xs={12}>
        <Button variant="text" className={classes.add} onClick={onAdd}>
          <Typography variant="subtitle1">+ {t('Add')}</Typography>
        </Button>
      </Grid>
    </Grid>
  );
};
