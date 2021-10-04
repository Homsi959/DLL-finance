import { useEffect } from 'react';
import { PageLayoutProps } from './types';

export const PageLayout = (props: PageLayoutProps) => {
  const { headerContent, pageContent } = props;

  useEffect(() => {
    // Scroll to top of page during navigation
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="wrapper">
      <div className="header">
        <a className="logo" href="/">
          <svg className="svg-icon dll-clear">
            <use xlinkHref="/img/svg-sprite.svg#dll-clear"></use>
          </svg>
          <div className="logo-text">DLL financial solutions partner</div>
        </a>
        {headerContent}
      </div>
      <main>
        <section className="main-column content-area">{pageContent}</section>
      </main>
    </div>
  );
};
