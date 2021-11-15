import { useCallback, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import { Field, FormSpy, FormSpyRenderProps } from 'react-final-form';
import { TextField } from 'components/form/TextField';
import { ApplicationRole } from 'schema/serverTypes';
import { useDebounce } from 'use-debounce';
import { FilterFormValues, UserFilterFormRenderProps, UserFilterFormProps } from './types';
import MenuItem from '@material-ui/core/MenuItem';
import { SelectField } from 'components/form';
import { useTranslation } from 'react-i18next';
import { IconSprite } from '../../icons';
import { palette } from '../../../theme';
import { Button, Grid } from 'components';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    grid: {
      '& .MuiFormControl-root': {
        marginTop: 0,
      },
    },
    item: {
      minWidth: '240px',
      marginRight: theme.spacing(2.5),
    },
    buttonReset: {
      '& .MuiButton-text': {
        lineHeight: 1.65,
      },
      marginBottom: '-2px',
      display: 'flex',
      alignItems: 'flex-end',
    },
  })
);

type FilterFormSpyProps = FormSpyRenderProps<FilterFormValues, Partial<FilterFormValues>> &
  UserFilterFormProps;

const FilterFormSpy = (props: FilterFormSpyProps) => {
  const { values, setRole, setSearch } = props;

  const { role, search: searchTerm } = values;
  const [search] = useDebounce(searchTerm, 500);

  useEffect(() => {
    setRole(role);
  }, [role, setRole]);

  useEffect(() => {
    setSearch(search);
  }, [search, setSearch]);

  return <></>;
};

export const UserFilterFormInner = (props: UserFilterFormRenderProps) => {
  const classes = useStyles();

  const { handleSubmit, form, setRole, setSearch } = props;

  const { reset } = form;

  const handleOnReset = useCallback(() => {
    reset();
  }, [reset]);

  const { t } = useTranslation();

  return (
    <form onSubmit={handleSubmit} className={classes.root}>
      <FormSpy<FilterFormValues> subscription={{ values: true }}>
        {(formSpyProps) => {
          return <FilterFormSpy {...formSpyProps} setRole={setRole} setSearch={setSearch} />;
        }}
      </FormSpy>
      <Grid md={24} container className={classes.grid}>
        <Grid md={6} xs={24} item className={classes.item}>
          <Field name="role" label={t('UserType')} component={SelectField} variant="standard">
            <MenuItem value={ApplicationRole.Admin}>{t('Roles.Admin')}</MenuItem>
            <MenuItem value={ApplicationRole.SalesManager}>{t('Roles.SalesManager')}</MenuItem>
            <MenuItem value={ApplicationRole.SuperSalesManager}>
              {t('Roles.SuperSalesManager')}
            </MenuItem>
            <MenuItem value={ApplicationRole.SalesSupport}>{t('Roles.SalesSupport')}</MenuItem>
          </Field>
        </Grid>
        <Grid md={6} xs={24} item className={classes.item}>
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
        <Grid md={6} xs={24} className={classes.buttonReset} item>
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
