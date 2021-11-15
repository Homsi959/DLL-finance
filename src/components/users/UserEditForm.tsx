import {
  Card,
  CardHeader,
  CardContent,
  makeStyles,
  createStyles,
  CardActions,
  Theme,
  MenuItem,
  Typography,
  Box,
} from '@material-ui/core';
import { Grid } from 'components/Grid';
import { Skeleton, Alert } from '@material-ui/lab';
import { Field } from 'react-final-form';
import { AutoFocusedForm, TextField, SelectField, useRequired, PhoneInputField } from '../form';
import { UserViewModel } from './types';
import { useEditForm } from './useEditForm';
import { useTranslation } from 'react-i18next';
import { Avatar } from '../avatar';
import { LeasingProgramSelectField } from './LeasingProgramSelectField';
import { SalesPointSelectField } from './SalesPointSelectField';
import { Button } from 'components';

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
      paddingBottom: theme.spacing(1.2),
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
      paddingTop: theme.spacing(5.5),
      fontWeight: 'bolder',
      textAlign: 'center',
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
    item: {
      justifyContent: 'center',
    },
    membershipTitle: {
      marginBottom: 6,
    },
    membershipItem: {
      marginBottom: 4,
    },
    GridCloseButton: {
      backgroundColor: theme.palette.lightBlue3.main,
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
  const { groups = [] } = user;
  const { onSubmit, initialValues, isLoading } = useEditForm(user);

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
              <Box
                display="flex"
                justifyContent="flex-end"
                className={classes.GridCloseButton}
              ></Box>
              <Box className={classes.headerWrapper}>
                <CardHeader className={classes.header} title={title} />
              </Box>
              <CardContent className={classes.cardContent}>
                <Grid container rowSpacing={2.5} columnSpacing={0}>
                  <Grid item xs={24} className={classes.item}>
                    <Box className={classes.item}>
                      <Avatar size="large" />
                    </Box>
                  </Grid>
                  <Grid item xs={24} className={classes.item}>
                    <Field
                      name="lastName"
                      label={t('LastName')}
                      component={TextField}
                      validate={required}
                    />
                  </Grid>
                  <Grid item xs={24} className={classes.item}>
                    <Field name="firstName" label={t('FirstName')} component={TextField} />
                  </Grid>
                  <Grid item xs={24} className={classes.item}>
                    <Field name="middleName" label={t('MiddleName')} component={TextField} />
                  </Grid>
                  <Grid item xs={24} className={classes.item}>
                    <PhoneInputField name="phoneNumber" label={t('PhoneNumber')} />
                  </Grid>
                  <Grid item xs={24} className={classes.item}>
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
                  <Grid item xs={24} className={classes.item}>
                    <Field
                      label={t('Sales point')}
                      name="salesPoints"
                      component={SalesPointSelectField}
                    />
                  </Grid>
                  <Grid item xs={24} className={classes.item}>
                    <Field
                      label={t('Leasing product')}
                      name="leasingPrograms"
                      component={LeasingProgramSelectField}
                    />
                  </Grid>
                  {groups.length > 0 ? (
                    <Grid item xs={24} className={classes.item}>
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
