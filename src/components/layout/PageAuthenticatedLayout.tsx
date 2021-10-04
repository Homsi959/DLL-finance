import { useEffect } from 'react';
import { NavItemLink, Header } from 'components';
import { PageLayoutProps } from './types';
import { PageLayout } from './PageLayout';
import { Role } from 'components/authentication';
import { useTranslation } from 'react-i18next';
import { IconSprite } from 'components/icons';
import { palette } from 'theme';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  navSvg: {
    '& svg': {
      position: 'absolute',
      left: '15px',
      top: '10px',
    },
  },
}));

export const PageAuthenticatedLayout = (props: PageLayoutProps) => {
  const { pageContent, headerContent, ...rest } = props;
  const classes = useStyles();

  useEffect(() => {
    // Scroll to top of page during navigation
    window.scrollTo(0, 0);
  }, []);

  const { t } = useTranslation();

  const content = (
    <>
      <section className="left-menu js-menu-collapse">
        <nav className={clsx('nav js-custom-scrollbar', classes.navSvg)}>
          <NavItemLink to="/" exact>
            <IconSprite width="16px" color={palette.primary.main} icon="menu-home" />
            <span className="nav-title">{t('Main')}</span>
          </NavItemLink>
          <Role role="admin">
            <NavItemLink to="/users">
              <IconSprite width="16px" color={palette.primary.main} icon="user" />
              <span className="nav-title">{t('User_plural')}</span>
            </NavItemLink>
          </Role>
          <NavItemLink to="/calculator/results" exact>
            <IconSprite width="16px" color={palette.primary.main} icon="menu-calculations" />
            <span className="nav-title">{t('Calculation_plural')}</span>
          </NavItemLink>
          <NavItemLink to="/counterparties" exact>
            <IconSprite width="16px" color={palette.primary.main} icon="user" />
            <span className="nav-title">{t('Counterparty_plural')}</span>
          </NavItemLink>
        </nav>
      </section>
      <section className="main-column content-area">
        <div className="content">{pageContent}</div>
      </section>
    </>
  );

  const header = headerContent ?? <Header />;

  return <PageLayout pageContent={content} headerContent={header} {...rest} />;
};
