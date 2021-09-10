import { useCallback, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import { Field, FormSpy, FormSpyRenderProps } from 'react-final-form';
import { CounterpartyAutocompleteField } from '../../CalculationForm/DictionaryFields';
import { TextField } from 'components/form/TextField';
import { CounterpartyType } from 'schema/serverTypes';
import { useDebounce } from 'use-debounce';
import { FilterFormValues, FilterFormRenderProps, QuotaFilterFormProps } from './types';
import { UserAutocomplete } from './UserAutocomplete';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(1),
    },
    grid: {
      '& .MuiFormControl-root': {
        marginTop: 0,
      },
    },
    item: {
      minWidth: '320px',
      marginRight: '20px',
    },
    buttonReset: {
      display: 'flex',
      alignItems: 'flex-end',
    },
    noIcon: {
      '& .MuiInputBase-root': {
        '& svg:': {
          backgroundColor: 'red',
          display: 'none !important',
        },
      },
    },
  })
);

type FilterFormSpyProps = FormSpyRenderProps<FilterFormValues, Partial<FilterFormValues>> &
  Omit<QuotaFilterFormProps, 'tabIndex'>;

const FilterFormSpy = (props: FilterFormSpyProps) => {
  const { values, setDealer, setLessee, setSearch, setOwnerId } = props;

  const { lessee, dealer, search: searchTerm, ownerId } = values;
  const [search] = useDebounce(searchTerm, 500);

  useEffect(() => {
    setLessee(lessee);
  }, [lessee, setLessee]);

  useEffect(() => {
    setDealer(dealer);
  }, [dealer, setDealer]);

  useEffect(() => {
    setSearch(search);
  }, [search, setSearch]);

  useEffect(() => {
    setOwnerId(ownerId);
  }, [ownerId, setOwnerId]);

  return <></>;
};

export const QuotaFilterFormInner = (props: FilterFormRenderProps) => {
  const classes = useStyles();

  const { tabIndex, handleSubmit, form, setDealer, setLessee, setSearch, setOwnerId } = props;

  const { reset } = form;

  const handleOnReset = useCallback(() => {
    reset();
  }, [reset]);

  const { t } = useTranslation();

  return (
    <form onSubmit={handleSubmit} className={classes.root}>
      <FormSpy<FilterFormValues> subscription={{ values: true }}>
        {(formSpyProps) => {
          return (
            <FilterFormSpy
              {...formSpyProps}
              setDealer={setDealer}
              setLessee={setLessee}
              setSearch={setSearch}
              setOwnerId={setOwnerId}
            />
          );
        }}
      </FormSpy>
      <Grid container spacing={1} className={classes.grid}>
        <Grid item className={clsx(classes.item, classes.noIcon)}>
          <CounterpartyAutocompleteField
            variant="standard"
            label={t('Lessee')}
            counterpartyType={CounterpartyType.lessee}
          />
        </Grid>
        <Grid item className={classes.item}>
          <CounterpartyAutocompleteField
            variant="standard"
            label={t('Dealer')}
            counterpartyType={CounterpartyType.dealer}
          />
        </Grid>
        {tabIndex === 1 && (
          <Grid item className={classes.item}>
            <Field
              label={t('QuotaCreator')}
              variant="standard"
              name="ownerId"
              component={UserAutocomplete}
              fullWidth={true}
            />
          </Grid>
        )}
        <Grid item className={classes.item}>
          <Field label={t('Search')} variant="standard" name="search" component={TextField} />
        </Grid>
        <Grid className={classes.buttonReset} item>
          <FormControl>
            <Button variant="text" onClick={handleOnReset}>
              {t('Reset')}
            </Button>
          </FormControl>
        </Grid>
      </Grid>
    </form>
  );
};
