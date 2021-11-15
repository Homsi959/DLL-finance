import {
  Card,
  CardHeader,
  CardContent,
  makeStyles,
  createStyles,
  CardActions,
  Theme,
  Typography,
  MenuItem,
  Box,
} from '@material-ui/core';
import { Grid } from 'components/Grid';
import { Skeleton, Alert } from '@material-ui/lab';
import { Field } from 'react-final-form';
import { AutoFocusedForm, Button, SelectField, TextField, useRequired } from 'components';
import { useEditForm } from './useEditForm';
import { useTranslation } from 'react-i18next';
import { UserSelectField } from '../UserSelectField';
import { useUserSearchQuery } from '../useUserSearchQuery';
import { GroupUsersViewModel } from 'schema/serverTypes';

export type GroupEditFormProps = {
  group: GroupUsersViewModel;
};

export const GroupEditFormSkeleton = () => {
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
      textAlign: 'left',
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
  })
);

export const GroupEditForm = (props: GroupEditFormProps) => {
  const classes = useStyles();
  const { group } = props;
  const { onSubmit, initialValues, isLoading, options } = useEditForm(group);
  const { name: title } = initialValues;
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
                <CardHeader className={classes.header} title={title} />
              </Box>
              <CardContent className={classes.cardContent}>
                <Grid container rowSpacing={2.5} columnSpacing={0}>
                  <Grid item xs={24} className={classes.item}>
                    <Field name="name" component={TextField} validate={required} />
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
                      component={SelectField}
                      validate={required}
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
                      component={UserSelectField}
                      validate={required}
                    />
                  </Grid>
                  <Grid item xs={24}>
                    <Typography variant="body1">{t('All fields are required')}</Typography>
                  </Grid>
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
