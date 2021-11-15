import {
  Card,
  CardContent,
  makeStyles,
  createStyles,
  CardActions,
  Theme,
  CardHeader,
  MenuItem,
  Box,
} from '@material-ui/core';
import { Grid } from 'components/Grid';
import { Alert } from '@material-ui/lab';
import { Field } from 'react-final-form';
import { AutoFocusedForm, Button, SelectField, TextField, useRequired } from 'components';
import { useCreateForm } from './useCreateForm';
import { useTranslation } from 'react-i18next';
import { UserSelectField } from '../UserSelectField';
import { palette } from '../../../theme';
import { useUserSearchQuery } from '../useUserSearchQuery';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: '400px',
      minWidth: '400px',
      border: 'none',
      boxShadow: 'none',
    },
    cardContent: {
      paddingTop: 20,
      paddingRight: 20,
      paddingBottom: 20,
      paddingLeft: 20,
    },
    headerWrapper: {
      marginBottom: theme.spacing(0.5),
    },
    header: {
      fontWeight: 'bolder',
      textAlign: 'left',
      paddingTop: theme.spacing(5.5),
      paddingRight: 20,
      paddingBottom: 20,
      paddingLeft: 20,
    },
    actions: {
      justifyContent: 'flex-start',
    },
    cancelButton: {
      color: theme.palette.error.main,
    },
    item: {},
    GridCloseButton: {
      backgroundColor: palette.secondary.light,
    },
    closeButton: {
      marginRight: theme.spacing(2),
      marginTop: theme.spacing(2),
      '& img': {
        maxWidth: '10px',
      },
    },
    required: {
      color: palette.textGrey2.main,
      fontSize: '12px',
      marginTop: theme.spacing(1),
    },
  })
);

export const GroupCreateForm = () => {
  const classes = useStyles();

  const { onSubmit, initialValues, isLoading, options } = useCreateForm();
  const { users } = useUserSearchQuery('', []);
  const { required } = useRequired();

  const { t } = useTranslation();

  return (
    <AutoFocusedForm
      onSubmit={onSubmit}
      initialValues={initialValues}
      subscription={{
        submitError: true,
      }}
      render={({ handleSubmit, pristine, submitError }) => {
        return (
          <form onSubmit={handleSubmit}>
            <Card className={classes.root}>
              <Box className={classes.headerWrapper}>
                <CardHeader className={classes.header} title={t('Buttons.NewGroup')} />
              </Box>
              <CardContent className={classes.cardContent}>
                <Grid container rowSpacing={2.5} columnSpacing={0}>
                  <Grid item xs={24} className={classes.item}>
                    <Field
                      name="name"
                      label={t('Name')}
                      component={TextField}
                      validate={required}
                    />
                  </Grid>
                  <Grid item xs={24} className={classes.item}>
                    <Field
                      label={t('Lessor')}
                      name="lessorInn"
                      component={SelectField}
                      validate={required}
                    >
                      {options.map((option) => {
                        return (
                          <MenuItem key={option.inn} value={option.inn}>
                            {option.name}&nbsp;{option.inn}
                          </MenuItem>
                        );
                      })}
                    </Field>
                  </Grid>
                  <Grid item xs={24} className={classes.item}>
                    <Field
                      label={t('Owner')}
                      name="owner"
                      validate={required}
                      component={SelectField}
                    >
                      {users.map((user) => {
                        return (
                          <MenuItem key={user.id} value={user.id}>
                            {user.name}
                          </MenuItem>
                        );
                      })}
                    </Field>
                  </Grid>
                  <Grid item xs={24} className={classes.item}>
                    <Field
                      label={t('Members')}
                      name="users"
                      validate={required}
                      component={UserSelectField}
                    />
                  </Grid>
                </Grid>
                <div className={classes.required}>Все поля обязательны</div>
                {submitError && <Alert severity="error">{submitError}</Alert>}
              </CardContent>
              <CardActions className={classes.actions}>
                <Button
                  color="primary"
                  disabled={pristine || isLoading}
                  size="medium"
                  type="submit"
                  variant="contained"
                >
                  {t('Save')}
                </Button>
              </CardActions>
            </Card>
          </form>
        );
      }}
    />
  );
};
