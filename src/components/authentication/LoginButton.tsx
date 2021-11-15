import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { useUserAuth } from 'services';
import { Button, createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      padding: theme.spacing(1.5, 2),
      boxSizing: 'border-box',
    },
  })
);
export const LoginButton = () => {
  const classes = useStyles();
  const history = useHistory();
  const { signIn } = useUserAuth();

  const handleLogin = useCallback(async () => {
    await signIn({
      returnUrl: history.location.pathname,
    });
  }, [signIn, history]);

  const { t } = useTranslation();

  return (
    <Button variant="contained" color="primary" className={classes.root} onClick={handleLogin}>
      {t('Login')}
    </Button>
  );
};
