import { useTranslation } from 'react-i18next';
import { PaginationLink } from './PaginationLink';
import { PaginationProps } from './types';
import { IconSprite } from '../icons';
import { Grid, createStyles, makeStyles, Theme } from '@material-ui/core';
import { SelectPagination } from 'components';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    blockPages: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: theme.spacing(2.7),
      marginBottom: theme.spacing(2.7),
      color: theme.palette.textGrey3.main,
    },
    blockControlItem: {
      display: 'flex',
      alignItems: 'center',
    },
  })
);

export const Pagination = (props: PaginationProps) => {
  const {
    showFirst = true,
    showLast = true,
    showNext = true,
    showPrev = true,
    pagesCount = 6,
    page,
    pageSize,
    pageCount,
    totalCount,
    dataCount,
  } = props;

  const classes = useStyles();

  var from = page - pagesCount / 2;
  if (from < 1) {
    from = 1;
  }

  const to = from + (pagesCount - 1 > totalCount ? totalCount : pagesCount - 1);
  const pages: number[] = [];

  for (let page = from; page < to && page <= pageCount; page += 1) {
    pages.push(page);
  }

  const prevPage = page - 1 < 1 ? 1 : page - 1;
  const nextPage = page + 1 > pageCount ? pageCount : page + 1;

  const shownFrom = page;
  const shownTo = page + dataCount < totalCount ? page + pageSize - 1 : totalCount;

  const { t } = useTranslation();

  const LastPage = () => {
    if (pages[pages.length - 1] === pageCount) {
      return <></>;
    }

    return (
      <span>
        {pageCount <= 6 ? '' : '... '}
        <PaginationLink page={pageCount} />
      </span>
    );
  };

  return (
    <Grid container className={classes.blockPages}>
      <Grid item>
        {showFirst && (
          <PaginationLink page={1} disabled={page === 1}>
            <IconSprite icon={'page-first'} width="8px" />
          </PaginationLink>
        )}
        {showPrev && (
          <PaginationLink page={prevPage} disabled={page === prevPage}>
            <IconSprite icon={'page-prev'} width="5px" height="8px" />
          </PaginationLink>
        )}
        {pages.map((pageNumber) => {
          return <PaginationLink key={pageNumber} page={pageNumber} />;
        })}
        <LastPage />
        {showNext && (
          <PaginationLink page={nextPage} disabled={page === nextPage}>
            <IconSprite icon={'page-next'} width="5px" height="8px" />
          </PaginationLink>
        )}
        {showLast && (
          <PaginationLink page={pageCount} disabled={page === pageCount}>
            <IconSprite icon={'page-last'} width="8px" />
          </PaginationLink>
        )}
      </Grid>
      <Grid item className={classes.blockControlItem}>
        <SelectPagination />
        <Grid item>
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
        </Grid>
      </Grid>
    </Grid>
  );
};
