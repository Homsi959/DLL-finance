import { useTranslation } from 'react-i18next';
import { PaginationLink } from './PaginationLink';
import { PaginationProps } from './types';

export const Pagination = (props: PaginationProps) => {
  const {
    showFirst = true,
    showLast = true,
    showNext = true,
    showPrev = true,
    pagesCount = 4,
    page,
    pageSize,
    pageCount,
    totalCount,
    dataCount,
  } = props;

  var from = page - pagesCount / 2;
  if (from < 1) {
    from = 1;
  }

  const to = from + (pagesCount - 1 > totalCount ? totalCount : pagesCount - 1);
  const pages = [];

  for (let page = from; page < to && page <= pageCount; page += 1) {
    pages.push(page);
  }

  const prevPage = page - 1 < 1 ? 1 : page - 1;
  const nextPage = page + 1 > pageCount ? pageCount : page + 1;

  const shownFrom = page;
  const shownTo = page + dataCount < totalCount ? page + pageSize - 1 : totalCount;

  const { t } = useTranslation();

  return (
    <div className="pagination">
      <div className="pagination-links">
        {showFirst && (
          <PaginationLink page={1} disabled={page === 1}>
            <svg className="svg-icon page-first">
              <use xlinkHref="/img/svg-sprite.svg#page-first"></use>
            </svg>
          </PaginationLink>
        )}
        {showPrev && (
          <PaginationLink page={prevPage} disabled={page === prevPage}>
            <svg className="svg-icon page-prev">
              <use xlinkHref="/img/svg-sprite.svg#page-prev"></use>
            </svg>
          </PaginationLink>
        )}
        {pages.map((pageNumber) => {
          return <PaginationLink key={pageNumber} page={pageNumber} />;
        })}
        {showNext && (
          <PaginationLink page={nextPage} disabled={page === nextPage}>
            <svg className="svg-icon page-next">
              <use xlinkHref="/img/svg-sprite.svg#page-next"></use>
            </svg>
          </PaginationLink>
        )}
        {showLast && (
          <PaginationLink page={pageCount} disabled={page === pageCount}>
            <svg className="svg-icon page-last">
              <use xlinkHref="/img/svg-sprite.svg#page-last"></use>
            </svg>
          </PaginationLink>
        )}
      </div>
      <div className="pagination-limit">
        <div className="pagination-limit-text">
          {page === 1 && (
            <>
              {t('Pagination.Shown')}
              <span>&nbsp;{dataCount}&nbsp;</span>
              {t('Pagination.From')}
              <span>&nbsp;{totalCount}&nbsp;</span>
            </>
          )}
          {page !== 1 && (
            <>
              {t('Pagination.Shown')}
              <span>
                &nbsp;{shownFrom} - {shownTo}&nbsp;
              </span>
              {t('Pagination.From')}
              <span>&nbsp;{totalCount}&nbsp;</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
