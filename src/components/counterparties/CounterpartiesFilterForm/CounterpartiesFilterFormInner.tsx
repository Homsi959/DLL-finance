import { useCallback, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import { Field, FormSpy, FormSpyRenderProps } from 'react-final-form';
import { TextField } from 'components/form/TextField';
import { CounterpartyType } from 'schema/serverTypes';
import { useDebounce } from 'use-debounce';
import {
  CounterpartyFilterFormProps,
  CounterpartyFilterFormRenderProps,
  FilterFormValues,
} from './types';
import { useTranslation } from 'react-i18next';
import { MenuItem } from '@material-ui/core';
import { SelectField } from 'components/form';
import { Grid, IconSprite, Button } from 'components';
import { palette } from 'theme';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    item: {
      minWidth: '200px',
      marginRight: theme.spacing(2.5),
    },
    buttonReset: {
      display: 'flex',
      alignItems: 'flex-end',
      marginBottom: theme.spacing(0.2),
    },
  })
);

type FilterFormSpyProps = FormSpyRenderProps<FilterFormValues, Partial<FilterFormValues>> &
  CounterpartyFilterFormProps;

const FilterFormSpy = (props: FilterFormSpyProps) => {
  const { values, setSearch, setType } = props;

  const { search: searchTerm, type } = values;
  const [search] = useDebounce(searchTerm, 500);

  useEffect(() => {
    setSearch(search);
  }, [search, setSearch]);

  useEffect(() => {
    setType(type);
  }, [type, setType]);

  return <></>;
};

export const CounterpartiesFilterFormInner = (props: CounterpartyFilterFormRenderProps) => {
  const classes = useStyles();

  const { handleSubmit, form, setSearch, setType } = props;

  const { reset } = form;

  const handleOnReset = useCallback(() => {
    reset();
  }, [reset]);

  const { t } = useTranslation();

  return (
    <form onSubmit={handleSubmit} className={classes.root}>
      <FormSpy<FilterFormValues> subscription={{ values: true }}>
        {(formSpyProps) => {
          return <FilterFormSpy {...formSpyProps} setType={setType} setSearch={setSearch} />;
        }}
      </FormSpy>
      <Grid xs={24} container>
        <Grid md={6} xs={24} lg={4} item className={classes.item}>
          <Field name="type" label={t('Type')} component={SelectField} variant="standard">
            <MenuItem value={CounterpartyType.dealer}>{t('Dealer')}</MenuItem>
            <MenuItem value={CounterpartyType.lessee}>{t('Lessee')}</MenuItem>
            <MenuItem value={CounterpartyType.lessor}>{t('Lessor')}</MenuItem>
            <MenuItem value={CounterpartyType.insuranceCompany}>{t('InsuranceCompany')}</MenuItem>
          </Field>
        </Grid>
        <Grid md={6} xs={24} lg={4} item className={classes.item}>
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
        <Grid md={6} xs={24} lg={4} className={classes.buttonReset} item>
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
