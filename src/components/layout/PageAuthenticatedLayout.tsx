import { useEffect } from 'react';
import { Button, Header } from 'components';
import { PageLayoutProps } from './types';
import { PageLayout } from './PageLayout';
import { Role } from 'components/authentication';
import { useTranslation } from 'react-i18next';
import { IconSprite } from 'components/icons';
import { palette } from 'theme';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import menuArrow from 'img/icons/menuArrow.svg';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useMediaQuery,
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';

const drawerWidth = 190;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.appBar,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    backgroundColor: 'white',
    borderRight: 0,
    width: drawerWidth,
  },
  drawerClose: {
    backgroundColor: 'white',
    borderRight: 0,
    overflowX: 'hidden',
    width: 40,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    backgroundColor: theme.palette.bgGray.main,
    flexGrow: 1,
    padding: theme.spacing(3, 3, 3, 3),
  },
  menuItem: {
    fontSize: '14px',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    borderLeft: `4px solid transparent`,
    position: 'relative',
    '& > .MuiListItemText-root': {
      color: theme.palette.secondary.main,
    },
    '&:hover, &.active': {
      borderColor: theme.palette.primary.main,
      backgroundColor: theme.palette.secondary.light,
      '& .MuiListItemText-root': {
        color: theme.palette.primary.main,
      },
      '&:after': {
        content: '""',
        position: 'absolute',
        display: 'block',
        width: 6,
        height: 11,
        right: 11,
        background: `url(${menuArrow}) center center no-repeat`,
      },
    },
  },
  menuIcon: {
    minWidth: 32,
  },
  calculator: {
    width: 142,
    position: 'absolute',
    bottom: theme.spacing(2.5),
    left: '50%',
    transform: 'translateX(-50%)',
  },
}));

export const PageAuthenticatedLayout = (props: PageLayoutProps) => {
  const { pageContent, headerContent, ...rest } = props;
  const classes = useStyles();
  const theme = useTheme();
  const isOpen = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    // Scroll to top of page during navigation
    window.scrollTo(0, 0);
  }, []);

  const { t } = useTranslation();

  const content = (
    <>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: isOpen,
          [classes.drawerClose]: !isOpen,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: isOpen,
            [classes.drawerClose]: !isOpen,
          }),
        }}
      >
        <Toolbar />

        <List component="nav">
          <ListItem className={classes.menuItem} component={NavLink} to="/" exact>
            <ListItemIcon className={classes.menuIcon}>
              <IconSprite width="16px" color={palette.primary.main} icon="menu-home" />
            </ListItemIcon>
            <ListItemText disableTypography>{t('Main')}</ListItemText>
          </ListItem>
          <Role role="admin">
            <ListItem className={classes.menuItem} component={NavLink} to="/users">
              <ListItemIcon className={classes.menuIcon}>
                <IconSprite width="16px" color={palette.primary.main} icon="user" />
              </ListItemIcon>
              <ListItemText disableTypography primary={t('User_plural')} />
            </ListItem>
          </Role>
          <ListItem className={classes.menuItem} component={NavLink} to="/calculator/results" exact>
            <ListItemIcon className={classes.menuIcon}>
              <IconSprite width="16px" color={palette.primary.main} icon="menu-calculations" />
            </ListItemIcon>
            <ListItemText disableTypography primary={t('Calculation_plural')} />
          </ListItem>
          <ListItem className={classes.menuItem} component={NavLink} to="/counterparties" exact>
            <ListItemIcon className={classes.menuIcon}>
              <IconSprite width="16px" color={palette.primary.main} icon="user" />
            </ListItemIcon>
            <ListItemText disableTypography primary={t('Counterparty_plural')} />
          </ListItem>
          <Role role="admin">
            <ListItem className={classes.menuItem} component={NavLink} to="/dictionaries">
              <ListItemIcon className={classes.menuIcon}>
                <IconSprite width="16px" color={palette.primary.main} icon="menu-settings" />
              </ListItemIcon>
              <ListItemText disableTypography primary={t('Reference books')} />
            </ListItem>
          </Role>
        </List>
        <Button variant="contained" to="/calculator" className={classes.calculator}>
          {t('Buttons.Calculator')}
        </Button>
      </Drawer>
      <section className={classes.content}>
        <Toolbar />
        {pageContent}
      </section>
    </>
  );

  const header = headerContent ?? <Header />;

  return <PageLayout pageContent={content} headerContent={header} {...rest} />;
};
