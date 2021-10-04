export interface PaginationOptions {
  page: number;
  pageSize: number;
}

export interface PaginationResult {
  pageCount: number;
  totalCount: number;
  dataCount: number;
}

export interface PaginationProps extends PaginationOptions, PaginationResult {
  showFirst?: boolean;
  showPrev?: boolean;
  showNext?: boolean;
  showLast?: boolean;
  showPages?: boolean;
  pagesCount?: number;
}

export type PaginationLinkProps = Pick<PaginationOptions, 'page'> & {
  disabled?: boolean;
};

export interface PagedList<T> {
  data: T[];
  page: number;
  pageCount: number;
  totalCount: number;
}
