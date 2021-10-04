import { useCallback } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  makeStyles,
  createStyles,
  CardActions,
  Theme,
  Grid,
  MenuItem,
  IconButton,
  Typography,
} from '@material-ui/core';
import { Skeleton, Alert } from '@material-ui/lab';
import { Field } from 'react-final-form';
import { AutoFocusedForm, TextField, SelectField, useRequired, PhoneInputField } from '../form';
import { UserViewModel } from './types';
import { useEditForm } from './useEditForm';
import { useGoBack } from 'hooks';
import { palette } from 'theme';
import { useTranslation } from 'react-i18next';
import { Avatar } from '../avatar';

export interface UserEditFormProps {
  user: UserViewModel;
}

export const UserEditFormSkeleton = () => {
  return <Skeleton></Skeleton>;
};

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
      paddingTop: 0,
    },
    actions: {
      justifyContent: 'flex-start',
    },
    cancelButton: {
      color: theme.palette.error.main,
    },
    item: {
      marginBottom: theme.spacing(1),
      justifyContent: 'center',
    },
    membershipTitle: {
      marginBottom: 6,
    },
    membershipItem: {
      marginBottom: 4,
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
  })
);

export const UserEditForm = (props: UserEditFormProps) => {
  const classes = useStyles();
  const { user } = props;
  const title = user.name ?? user.userName;
  const groups = user.groups || [];
  const { onSubmit, initialValues, isLoading } = useEditForm(user);
  const goBack = useGoBack();
  const handleOnClose = useCallback(() => {
    goBack('/users');
  }, [goBack]);

  const { t } = useTranslation();

  const { required } = useRequired();

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
              <Grid>
                <CardHeader className={classes.header} title={title} />
              </Grid>
              <CardContent>
                <Grid container spacing={1}>
                  <Grid item lg={12} md={12} xl={12} xs={12} className={classes.item}>
                    <Avatar size="large" />
                  </Grid>
                </Grid>
                <Grid container spacing={1}>
                  <Grid item lg={12} md={12} xl={12} xs={12} className={classes.item}>
                    <Field
                      name="lastName"
                      label={t('LastName')}
                      component={TextField}
                      validate={required}
                    />
                  </Grid>
                  <Grid item lg={12} md={12} xl={12} xs={12} className={classes.item}>
                    <Field name="firstName" label={t('FirstName')} component={TextField} />
                  </Grid>
                  <Grid item lg={12} md={12} xl={12} xs={12} className={classes.item}>
                    <Field name="middleName" label={t('MiddleName')} component={TextField} />
                  </Grid>
                  <Grid item lg={12} md={12} xl={12} xs={12} className={classes.item}>
                    <PhoneInputField name="phoneNumber" label={t('PhoneNumber')} />
                  </Grid>
                </Grid>
                <Grid item lg={12} md={12} xl={12} xs={12} className={classes.item}>
                  <Field
                    name="role"
                    label={t('UserType')}
                    component={SelectField}
                    validate={required}
                  >
                    <MenuItem>
                      <em>{t('NotSet')}</em>
                    </MenuItem>
                    <MenuItem value={'sales_manager'}>{t('Roles.SalesManager')}</MenuItem>
                    <MenuItem value={'super_sales_manager'}>
                      {t('Roles.SuperSalesManager')}
                    </MenuItem>
                    <MenuItem value={'sales_support'}>{t('Roles.SalesSupport')}</MenuItem>
                    <MenuItem value={'admin'}>{t('Roles.Admin')}</MenuItem>
                  </Field>
                </Grid>
                {groups.length > 0 ? (
                  <Grid item lg={12} md={12} xl={12} xs={12} className={classes.item}>
                    <Typography variant="body1" className={classes.membershipTitle}>
                      {t('Membership in groups')}
                    </Typography>
                    <ul>
                      {groups.map((group) => (
                        <li key={group.id} className={classes.membershipItem}>
                          <Typography variant="subtitle2" color="secondary">
                            {group.name}
                          </Typography>
                        </li>
                      ))}
                    </ul>
                  </Grid>
                ) : null}
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
