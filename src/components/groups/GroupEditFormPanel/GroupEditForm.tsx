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
} from '@material-ui/core';
import { Skeleton, Alert } from '@material-ui/lab';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { AutoFocusedForm, TextField, useRequired } from 'components';
import { GroupUsersViewModel, GroupUserViewModel } from '../types';
import { useEditForm } from './useEditForm';
import { GroupUserSelectField } from '../GroupUserSelectField';
import { useGoBack } from 'hooks';
import { useCallback } from 'react';
import { palette } from 'theme';
import { useTranslation } from 'react-i18next';

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
      textAlign: 'center',
      paddingTop: 0,
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

export const GroupEditForm = (props: GroupEditFormProps) => {
  const classes = useStyles();
  const { group } = props;
  const title = group.name;
  const { onSubmit, initialValues, isLoading } = useEditForm(group);
  const goBack = useGoBack();
  const handleOnClose = useCallback(() => {
    goBack('/users/groups');
  }, [goBack]);

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
              <Grid container justify="flex-end" className={classes.GridCloseButton}>
                <IconButton className={classes.closeButton} onClick={handleOnClose}>
                  <img src="/img/icons/close-icon.svg" alt="" />
                </IconButton>
              </Grid>
              <CardHeader className={classes.header} title={title} />
              <CardContent>
                <Grid container spacing={4}>
                  <Grid item lg={12} md={12} xl={12} xs={12} className={classes.item}>
                    <Field name="name" component={TextField} validate={required} />
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
