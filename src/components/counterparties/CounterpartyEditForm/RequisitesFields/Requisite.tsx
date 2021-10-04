import { useCallback } from 'react';
import { Button, Divider, Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FieldArrayWithId, useWatch, UseFieldArrayReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CounterpartyViewModel } from 'schema/serverTypes';
import { Checkbox, Input } from 'components/form';
import { IconSprite } from 'components/icons';
import { CounterpartyFormProps } from './types';
import palette from 'theme/palette';
import { RadioButtonCheckedOutlined, RadioButtonUncheckedOutlined } from '@material-ui/icons';

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

export type RequisiteProps = CounterpartyFormProps & {
  item: FieldArrayWithId<CounterpartyViewModel, 'requisites', 'id'>;
  index: number;
  remove: UseFieldArrayReturn<CounterpartyViewModel, 'requisites', 'id'>['remove'];
  update: UseFieldArrayReturn<CounterpartyViewModel, 'requisites', 'id'>['update'];
};

export const Requisite = (props: RequisiteProps) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { index, remove, update, control, setValue } = props;

  const requisites = useWatch({
    control,
    name: 'requisites',
  });

  const current = requisites[index];
  const shouldSetFirstAsCurrent = current.isMain && requisites.length - 1 > 0;

  const onDelete = useCallback(() => {
    if (shouldSetFirstAsCurrent) {
      setValue('requisites.0.isMain', true);
    }
    remove(index);
  }, [remove, index, shouldSetFirstAsCurrent, setValue]);

  const checkedIndex = requisites.findIndex((t) => t.isMain);
  const item = checkedIndex > -1 ? requisites[checkedIndex] : undefined;
  const handleOnChange = useCallback(
    (checked: boolean) => {
      if (checked) {
        if (item !== undefined) {
          update(checkedIndex, { ...item, isMain: false });
        }
      } else {
        if (checkedIndex === index) {
          return false;
        }
      }
      return true;
    },
    [item, checkedIndex, index, update]
  );

  return (
    <>
      <Grid container item spacing={2}>
        <Grid item xs></Grid>
        <Grid item xs={'auto'}>
          <Button className={classes.delete} onClick={onDelete}>
            <IconSprite icon="delete" color={palette.primary.light} width="14px" height="15px" />
          </Button>
        </Grid>
      </Grid>
      <Grid container item spacing={2}>
        <Grid item md={3} xs={12}>
          <Input
            label={t('BIK')}
            name={`requisites.${index}.bic` as const}
            control={control}
            rules={{
              required: {
                value: true,
                message: t('Required'),
              },
            }}
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <Input
            label={t('Bank')}
            name={`requisites.${index}.bank` as const}
            control={control}
            rules={{
              required: {
                value: true,
                message: t('Required'),
              },
            }}
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <Input
            label={t('Сorrespondent account')}
            name={`requisites.${index}.correspondentAccount` as const}
            control={control}
            rules={{
              required: {
                value: true,
                message: t('Required'),
              },
            }}
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <Input
            label={t('Number of account')}
            name={`requisites.${index}.account` as const}
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
      <Grid container item spacing={2}>
        <Grid item md={3} xs={12}>
          <Checkbox
            icon={<RadioButtonUncheckedOutlined fontSize="default" color="primary" />}
            checkedIcon={<RadioButtonCheckedOutlined fontSize="default" color="primary" />}
            name={`requisites.${index}.isMain` as const}
            control={control}
            onChange={handleOnChange}
          />
        </Grid>
      </Grid>
      <Divider light className={classes.divider} />
    </>
  );
};
