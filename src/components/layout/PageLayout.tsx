import { createContext, useEffect } from 'react';
import { PageLayoutProps } from './types';
import { AppBar, Toolbar, CssBaseline } from '@material-ui/core';
import { IconSprite } from 'components/icons';
import { makeStyles } from '@material-ui/core/styles';
import { white } from 'theme/palette';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '98vh',
  },
  appBar: {
    zIndex: theme.zIndex.appBar,
  },
  logo: {
    display: 'flex',
    alignItems: 'baseline',
    textDecoration: 'none',
  },
  logoIcon: {
    marginRight: theme.spacing(2),
  },
  logoText: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '15px',
    lineHeight: '18px',
    color: '#fff',
    textDecoration: 'none',
  },
}));

export const DrawerContext = createContext({
  isDrawerOpen: false,
  setDrawerOpen: (b: boolean) => {},
});

export const PageLayout = (props: PageLayoutProps) => {
  const classes = useStyles();
  const { headerContent, pageContent } = props;

  useEffect(() => {
    // Scroll to top of page during navigation
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <CssBaseline />
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <a className={classes.logo} href="/">
              <IconSprite
                className={classes.logoIcon}
                icon={'dll-clear'}
                width="37px"
                height="25px"
                color={white}
              />
              <span className={classes.logoText}>DLL financial solutions partner</span>
            </a>
            {headerContent}
          </Toolbar>
        </AppBar>
        {pageContent}
      </div>
    </>
  );
};
