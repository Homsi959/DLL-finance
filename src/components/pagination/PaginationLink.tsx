import { useLocation, Link } from 'react-router-dom';
import { PaginationLinkProps } from './types';

export const PaginationLink = (props: React.PropsWithChildren<PaginationLinkProps>) => {
  const { page, children, disabled = false } = props;

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const currentPageString = searchParams.get('page');
  const currentPage = currentPageString ? Number(currentPageString) : 1;
  searchParams.set('page', `${page}`);

  const url = `${location.pathname}?${searchParams}`;
  const className = disabled
    ? 'pagination-link disabled'
    : !children && currentPage === page
    ? 'pagination-link active'
    : 'pagination-link';

  return (
    <Link className={className} to={url}>
      {children ? children : <>{page}</>}
    </Link>
  );
};
