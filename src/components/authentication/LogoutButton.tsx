import { useCallback } from 'react';
import { useUserAuth } from 'services';
import { IconSprite } from '../icons';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import { white } from 'theme/palette';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    boxSizing: 'border-box',
    borderRadius: 0,
    padding: 8,
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
  },
}));

export const LogoutButton = () => {
  const classes = useStyles();
  const { signOutRedirect } = useUserAuth();

  const handleLogout = useCallback(async () => {
    await signOutRedirect();
  }, [signOutRedirect]);

  return (
    <IconButton className={classes.root} onClick={handleLogout} tabIndex={0}>
      <IconSprite icon={'logout'} width="16px" height="15px" color={white} />
    </IconButton>
  );
};
