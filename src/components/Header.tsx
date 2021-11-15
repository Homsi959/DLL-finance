import { Link, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Avatar, LogoutButton, UserEditFormPanel } from 'components';
import { useMeQuery } from 'services/api';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { ComponentProps } from 'react';
import { white } from 'theme/palette';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  info: {
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1),
  },
  title: {
    color: white,
    marginRight: theme.spacing(2),
  },
}));

export const Header = () => {
  const classes = useStyles();
  const { data: profile } = useMeQuery();
  const { t } = useTranslation();

  if (!profile) {
    return null;
  }

  return (
    <div className={classes.root}>
      <Link className={classes.info} to={{ hash: '#me' }}>
        <Typography variant="subtitle2" className={classes.title}>
          {t('Welcome', { profile })}
        </Typography>
        <Avatar imageSrc={'/img/avatar.png'} size="small" />
      </Link>
      <LogoutButton />
      <Route
        component={({ location }: ComponentProps<any>) =>
          location.hash === '#me' ? <UserEditFormPanel id={profile.id} /> : null
        }
      />
    </div>
  );
};
