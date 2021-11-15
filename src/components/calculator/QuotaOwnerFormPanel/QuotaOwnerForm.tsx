import { Skeleton } from '@material-ui/lab';
import {
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
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Field } from 'react-final-form';
import { QuotaHistoryWithAvailableOwners } from 'schema';
import { useChangeOwnerForm } from './useChangeOwnerForm';
import { AutoFocusedForm, SelectField, useRequired, Button } from 'components';
import { Typography } from '@material-ui/core';
import { IconArrowLineRight } from 'components/icons/IconArrowLineRight';
import { useGoBack } from 'hooks';
import { useCallback } from 'react';
import { palette } from 'theme';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: '400px',
      minWidth: '400px',
      border: 'none',
      boxShadow: 'none',
      overflow: 'visible',
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
    subtitile: {
      fontSize: '12px',
      marginBottom: theme.spacing(1),
    },
    historyText: {
      marginBottom: theme.spacing(1),
      fontWeight: 500,
    },
    oldOwner: {
      color: palette.textGrey2.main,
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

export const QuotaOwnerFormSkeleton = () => {
  return <Skeleton></Skeleton>;
};

export type QuotaOwnerFormType = {
  quota: QuotaHistoryWithAvailableOwners;
};

export const QuotaOwnerForm = (props: QuotaOwnerFormType) => {
  const classes = useStyles();
  const { quota } = props;
  const { initialValues, onSubmit, disabled } = useChangeOwnerForm(quota);
  const { availableOwners, owner } = quota;
  const goBack = useGoBack();
  const handleOnClose = useCallback(() => {
    goBack('/calculator/results');
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
                <CardHeader className={classes.header} title={quota.id} />
              </Grid>
              <CardContent>
                <Grid container>
                  <Grid item xs={12} className={classes.item}>
                    <Typography color="textSecondary" className={classes.subtitile}>
                      {t('Created')}
                    </Typography>
                    <Typography className={classes.historyText}>
                      {new Date(quota.createdDate as string).toLocaleDateString('ru-RU')}
                    </Typography>
                  </Grid>
                  {quota.inputHistory.length > 0 && (
                    <Grid item xs={12} className={classes.item}>
                      <Typography color="textSecondary" className={classes.subtitile}>
                        {t('Modified')}
                      </Typography>
                      <Grid container>
                        {quota.inputHistory.map(function (e) {
                          return (
                            <Grid key={e.user.id} item xs={12} className={classes.historyText}>
                              {new Date(e.date as string).toLocaleDateString('ru-RU')} |{' '}
                              {e.user.name}
                            </Grid>
                          );
                        })}
                      </Grid>
                    </Grid>
                  )}
                  {quota.ownerHistory.length > 0 && (
                    <Grid item xs={12} className={classes.item}>
                      <Typography color="textSecondary" className={classes.subtitile}>
                        {t('ChangeOwnership')}
                      </Typography>
                      <Grid container>
                        {quota.ownerHistory.map(function (e) {
                          return (
                            <Grid key={e.oldOwner.id} item xs={12} className={classes.historyText}>
                              <span className={classes.oldOwner}>
                                {e.oldOwner.name} <IconArrowLineRight />{' '}
                              </span>{' '}
                              {e.newOwner.name}
                            </Grid>
                          );
                        })}
                      </Grid>
                    </Grid>
                  )}
                  <Grid item lg={12} md={12} xl={12} xs={12} className={classes.item}>
                    <Field
                      name="ownerId"
                      label={t('Owner')}
                      component={SelectField}
                      validate={required}
                      disabled={disabled}
                    >
                      <MenuItem key={owner.id} value={owner.id}>
                        {owner.name}
                      </MenuItem>
                      {availableOwners.map((user) => {
                        return (
                          <MenuItem key={user.id} value={user.id}>
                            {user.name}
                          </MenuItem>
                        );
                      })}
                    </Field>
                  </Grid>
                </Grid>
                {submitError && <Alert severity="error">{submitError}</Alert>}
              </CardContent>
              <CardActions className={classes.actions}>
                <Button
                  color="primary"
                  disabled={disabled || pristine}
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
