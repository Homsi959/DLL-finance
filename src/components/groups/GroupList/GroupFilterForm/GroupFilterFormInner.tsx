import { useCallback, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import { Field, FormSpy, FormSpyRenderProps } from 'react-final-form';
import { TextField } from 'components/form/TextField';
import { useDebounce } from 'use-debounce';
import { FilterFormValues, GroupFilterFormRenderProps, GroupFilterFormProps } from './types';
import { useTranslation } from 'react-i18next';
import { IconSprite } from '../../../icons';
import { palette } from '../../../../theme';

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
      '& .MuiButton-text': {
        lineHeight: 1.65,
      },
      display: 'flex',
      alignItems: 'flex-end',
    },
  })
);

type FilterFormSpyProps = FormSpyRenderProps<FilterFormValues, Partial<FilterFormValues>> &
  GroupFilterFormProps;

const FilterFormSpy = (props: FilterFormSpyProps) => {
  const { values, setSearch } = props;

  const { search: searchTerm } = values;
  const [search] = useDebounce(searchTerm, 500);

  useEffect(() => {
    setSearch(search);
  }, [search, setSearch]);

  return <></>;
};

export const GroupFilterFormInner = (props: GroupFilterFormRenderProps) => {
  const classes = useStyles();

  const { handleSubmit, form, setSearch } = props;

  const { reset } = form;

  const handleOnReset = useCallback(() => {
    reset();
  }, [reset]);

  const { t } = useTranslation();

  return (
    <form onSubmit={handleSubmit} className={classes.root}>
      <FormSpy<FilterFormValues> subscription={{ values: true }}>
        {(formSpyProps) => {
          return <FilterFormSpy {...formSpyProps} setSearch={setSearch} />;
        }}
      </FormSpy>
      <Grid container spacing={1} className={classes.grid}>
        <Grid item className={classes.item}>
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
