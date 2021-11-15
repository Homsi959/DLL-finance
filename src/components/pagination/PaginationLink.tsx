import { useLocation, Link } from 'react-router-dom';
import { PaginationLinkProps } from './types';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { white } from 'theme/palette';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paginationLink: {
      textDecoration: 'none',
      paddingRight: theme.spacing(1),
      paddingLeft: theme.spacing(1),
      paddingTop: theme.spacing(0.4),
      paddingBottom: theme.spacing(0.4),
      color: theme.palette.textGrey3.main,
      '&:not(:last-child)': {
        marginRight: theme.spacing(0.7),
      },
      '& svg': {
        fill: theme.palette.blue3.main,
      },
      '&:focus': {
        color: theme.palette.textGrey3.main,
      },
    },
    disabled: {
      cursor: 'default',
      '& svg': {
        fill: theme.palette.grey4.main,
        '&:hover': {
          fill: theme.palette.grey4.main,
        },
      },
    },
    active: {
      display: 'inline-block',
      backgroundColor: white,
      color: theme.palette.blue3.main,
    },
  })
);

export const PaginationLink = (props: React.PropsWithChildren<PaginationLinkProps>) => {
  const { page, children, disabled = false } = props;
  const classes = useStyles();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const currentPageString = searchParams.get('page');
  const currentPage = currentPageString ? Number(currentPageString) : 1;
  searchParams.set('page', `${page}`);

  const url = `${location.pathname}?${searchParams}`;
  const className = disabled
    ? `${classes.paginationLink} ${classes.disabled}`
    : !children && currentPage === page
    ? ` ${classes.active} ${classes.paginationLink}`
    : `${classes.paginationLink}`;

  return (
    <Link className={className} to={url}>
      {children ? children : <>{page}</>}
    </Link>
  );
};
