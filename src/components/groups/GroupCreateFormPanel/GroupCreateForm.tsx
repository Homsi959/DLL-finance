import {
  Button,
  Card,
  CardContent,
  makeStyles,
  createStyles,
  CardActions,
  Theme,
  Grid,
  IconButton,
  CardHeader,
  MenuItem,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Field } from 'react-final-form';
import { AutoFocusedForm, SelectField, TextField, useRequired } from 'components';
import { useCreateForm } from './useCreateForm';
import { useTranslation } from 'react-i18next';
import { UserSelectField } from '../UserSelectField';
import { palette } from '../../../theme';
import { useGoBack } from '../../../hooks';
import { useCallback } from 'react';
import { useUserSearchQuery } from '../useUserSearchQuery';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: '400px',
      minWidth: '400px',
      border: 'none',
      boxShadow: 'none',
    },
    header: {
      fontWeight: 'bolder',
      textAlign: 'left',
      paddingTop: 0,
    },
    actions: {
      justifyContent: 'flex-start',
    },
    cancelButton: {
      color: theme.palette.error.main,
    },
    item: {
      marginBottom: theme.spacing(2),
    },
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

  const { onSubmit, initialValues, isLoading } = useCreateForm();
  const { users } = useUserSearchQuery('', []);
  const { required } = useRequired();
  const goBack = useGoBack();
  const handleOnClose = useCallback(() => {
    goBack('/users/groups');
  }, [goBack]);

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
              <Grid container justify="flex-end" className={classes.GridCloseButton}>
                <IconButton className={classes.closeButton} onClick={handleOnClose}>
                  <img src="/img/icons/close-icon.svg" alt="" />
                </IconButton>
              </Grid>
              <CardHeader className={classes.header} title={t('Buttons.NewGroup')} />
              <CardContent>
                <Grid container spacing={4}>
                  <Grid item lg={12} md={12} xl={12} xs={12} className={classes.item}>
                    <Field
                      name="name"
                      label={t('Name')}
                      component={TextField}
                      validate={required}
                    />
                  </Grid>
                </Grid>
                <Grid item lg={12} md={12} xl={12} xs={12} className={classes.item}>
                  <Field
                    label={t('Owner')}
                    name="owners"
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
                <Grid item lg={12} md={12} xl={12} xs={12} className={classes.item}>
                  <Field
                    label={t('Members')}
                    name="users"
                    validate={required}
                    component={UserSelectField}
                  />
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
