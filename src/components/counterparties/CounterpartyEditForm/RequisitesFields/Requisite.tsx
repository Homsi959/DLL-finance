import { useCallback } from 'react';
import { Button } from '@material-ui/core';
import { Grid } from 'components/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FieldArrayWithId, useWatch, UseFieldArrayReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CounterpartyViewModel } from 'schema/serverTypes';
import { Checkbox, Input } from 'components/form';
import { IconSprite } from 'components/icons';
import { CounterpartyFormProps } from './types';
import { RadioButtonCheckedOutlined, RadioButtonUncheckedOutlined } from '@material-ui/icons';
import theme from 'theme';
import { BicAutocomplete } from './BicAutocomplete';
import { BankAutocomplete } from './BankAutocomplete';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '16px 20px',
      width: 'calc(100% + 40px)',
      margin: '0 -20px',
    },
    main: {
      backgroundColor: theme.palette.lightBlue2.main,
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
    whiteInput: {
      '& input': {
        backgroundColor: 'white',
      },
    },
    checkBox: {
      margin: theme.spacing(-2, 0),
    },
    wrapper: {
      width: '100%',
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
  const mainClass = checkedIndex === index ? classes.main : '';

  return (
    <div className={`${classes.root} ${mainClass}`}>
      <Grid container item spacing={2}>
        <Grid item xs={22}>
          <Checkbox
            icon={<RadioButtonUncheckedOutlined fontSize="default" color="disabled" />}
            checkedIcon={<RadioButtonCheckedOutlined fontSize="default" color="primary" />}
            name={`requisites.${index}.isMain` as const}
            control={control}
            onChange={handleOnChange}
            label={t('Master account')}
            className={classes.checkBox}
          />
        </Grid>
        <Grid item xs={2} className={classes.delete}>
          <Button onClick={onDelete}>
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
        <Grid item md={6} xs={24}>
          <BicAutocomplete index={index} control={control} setValue={setValue} />
        </Grid>
        <Grid item md={6} xs={24}>
          <BankAutocomplete index={index} control={control} setValue={setValue} />
        </Grid>
        <Grid item md={6} xs={24}>
          <Input
            className={classes.whiteInput}
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
        <Grid item md={6} xs={24}>
          <Input
            className={classes.whiteInput}
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
    </div>
  );
};
