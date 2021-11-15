import { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Grid } from 'components';
import FormControl from '@material-ui/core/FormControl';
import { Field, FormSpy, FormSpyRenderProps } from 'react-final-form';
import { CounterpartyAutocompleteField } from '../../CalculationForm/DictionaryFields';
import { TextField } from 'components/form/TextField';
import { CounterpartyType } from 'schema/serverTypes';
import { useDebounce } from 'use-debounce';
import { FilterFormValues, FilterFormRenderProps, QuotaFilterFormProps } from './types';
import { UserAutocomplete } from './UserAutocomplete';
import { useTranslation } from 'react-i18next';
import { IconSprite, Button } from 'components';
import { palette } from 'theme';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    noIcon: {
      '& .MuiTextField-root': {
        '& svg': {
          display: 'none',
        },
      },
    },
    buttonReset: {
      display: 'flex',
      alignItems: 'flex-end',
    },
    item: {
      marginRight: theme.spacing(2.5),
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

  const history = useHistory();

  const handleOnReset = useCallback(() => {
    reset();
    history.push('/calculator/results');
  }, [reset, history]);

  const { t } = useTranslation();

  return (
    <form onSubmit={handleSubmit}>
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
      <Grid container>
        <Grid item md={6} xs={24} xl={4} className={clsx(classes.noIcon, classes.item)}>
          <CounterpartyAutocompleteField
            variant="standard"
            label={t('Lessee')}
            counterpartyType={CounterpartyType.lessee}
          />
        </Grid>
        <Grid item md={6} xs={24} xl={4} className={classes.item}>
          <CounterpartyAutocompleteField
            variant="standard"
            label={t('Dealer')}
            counterpartyType={CounterpartyType.dealer}
          />
        </Grid>
        {tabIndex === 1 && (
          <Grid item md={6} xs={24} xl={4} className={classes.item}>
            <Field
              label={t('QuotaCreator')}
              variant="standard"
              name="ownerId"
              component={UserAutocomplete}
              fullWidth={true}
            />
          </Grid>
        )}
        <Grid item md={5} xs={24} xl={4} className={classes.item}>
          <Field
            label={t('Search')}
            variant="standard"
            name="search"
            component={TextField}
            InputProps={{
              endAdornment: (
                <IconSprite width="16px" color={palette.textGrey2.main} icon="search" />
              ),
            }}
          />
        </Grid>
        <Grid md="auto" xs={24} xl={4} item className={classes.buttonReset}>
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
