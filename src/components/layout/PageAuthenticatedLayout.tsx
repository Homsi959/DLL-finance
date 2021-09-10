import { useEffect } from 'react';
import { NavItemLink, Header } from 'components';
import { PageLayoutProps } from './types';
import { PageLayout } from './PageLayout';
import { Role } from 'components/authentication';
import { useTranslation } from 'react-i18next';

export const PageAuthenticatedLayout = (props: PageLayoutProps) => {
  const { pageContent, headerContent, ...rest } = props;

  useEffect(() => {
    // Scroll to top of page during navigation
    window.scrollTo(0, 0);
  }, []);

  const { t } = useTranslation();

  const content = (
    <>
      <section className="left-menu js-menu-collapse">
        <nav className="nav js-custom-scrollbar">
          <NavItemLink to="/" exact>
            <svg className="svg-icon svg-icon-menu-home nav-image">
              <use xlinkHref="/img/svg-sprite.svg#svg-icon-menu-home"></use>
            </svg>
            <span className="nav-title">{t('Main')}</span>
          </NavItemLink>
          <Role role="admin">
            <NavItemLink to="/users">
              <svg className="svg-icon svg-icon-menu-groups nav-image">
                <use xlinkHref="/img/svg-sprite.svg#svg-icon-menu-groups"></use>
              </svg>
              <span className="nav-title">{t('User_plural')}</span>
            </NavItemLink>
          </Role>
          <NavItemLink to="/calculator/results" exact>
            <svg className="svg-icon svg-icon-menu-calculations nav-image">
              <use xlinkHref="/img/svg-sprite.svg#svg-icon-menu-calculations"></use>
            </svg>
            <span className="nav-title">{t('Calculation_plural')}</span>
          </NavItemLink>
          <NavItemLink to="/counterparties" exact>
            <svg className="svg-icon svg-icon-menu-calculations nav-image">
              <use xlinkHref="/img/svg-sprite.svg#svg-icon-menu-calculations"></use>
            </svg>
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
