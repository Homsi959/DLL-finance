import {
  Button,
  Card,
  CardContent,
  makeStyles,
  createStyles,
  CardActions,
  Theme,
  Grid,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { AutoFocusedForm, TextField, useRequired } from 'components';
import { GroupUserSelectField } from '../GroupUserSelectField';
import { GroupUserViewModel } from '../types';
import { useCreateForm } from './useCreateForm';
import { useTranslation } from 'react-i18next';

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
      textAlign: 'center',
    },
    actions: {
      justifyContent: 'center',
    },
    cancelButton: {
      color: theme.palette.error.main,
    },
    item: {
      marginBottom: theme.spacing(2),
    },
  })
);

export const GroupCreateForm = () => {
  const classes = useStyles();

  const { onSubmit, initialValues, isLoading } = useCreateForm();
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
                  <FieldArray<GroupUserViewModel>
                    label={t('Owners')}
                    name="owners"
                    component={GroupUserSelectField}
                  />
                </Grid>
                <Grid item lg={12} md={12} xl={12} xs={12} className={classes.item}>
                  <FieldArray<GroupUserViewModel>
                    label={t('Members')}
                    name="users"
                    component={GroupUserSelectField}
                  />
                </Grid>
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
