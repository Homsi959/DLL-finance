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
  IconButton,
  Typography,
  MenuItem,
} from '@material-ui/core';
import { Skeleton, Alert } from '@material-ui/lab';
import { Field } from 'react-final-form';
import { AutoFocusedForm, SelectField, TextField, useRequired } from 'components';
import { GroupUsersViewModel } from '../types';
import { useEditForm } from './useEditForm';
import { useGoBack } from 'hooks';
import { useCallback } from 'react';
import { palette } from 'theme';
import { useTranslation } from 'react-i18next';
import { UserSelectField } from '../UserSelectField';
import { useUserSearchQuery } from '../useUserSearchQuery';

export interface GroupEditFormProps {
  group: GroupUsersViewModel;
}

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
      marginBottom: theme.spacing(1),
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

export const GroupEditForm = (props: any) => {
  //TODO any -> GroupEditFormProps
  const classes = useStyles();
  const { group } = props;
  const title = group.name;
  const { onSubmit, initialValues, isLoading } = useEditForm(group);
  const { users } = useUserSearchQuery('', []);
  const goBack = useGoBack();
  const handleOnClose = useCallback(() => {
    goBack('/users/groups');
  }, [goBack]);

  const { required } = useRequired();
  const { t } = useTranslation();
  return (
    <AutoFocusedForm
      onSubmit={onSubmit}
      initialValues={initialValues as any} //TODO type
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
              <CardHeader className={classes.header} title={title} />
              <CardContent>
                <Grid container spacing={1}>
                  <Grid item lg={12} md={12} xl={12} xs={12} className={classes.item}>
                    <Field name="name" component={TextField} validate={required} />
                  </Grid>
                  <Grid item lg={12} md={12} xl={12} xs={12} className={classes.item}>
                    <Field
                      label={t('Owner')}
                      name="owners"
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
                  <Grid item lg={12} md={12} xl={12} xs={12} className={classes.item}>
                    <Field
                      label={t('Members')}
                      name="users"
                      component={UserSelectField}
                      validate={required}
                    />
                  </Grid>
                  <Grid item lg={12} md={12} xl={12} xs={12}>
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
