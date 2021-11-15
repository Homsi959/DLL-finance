export type PaginationOptions = {
  page: number;
  pageSize: number;
};

export type PaginationResult = {
  pageCount: number;
  totalCount: number;
  dataCount: number;
};

export type PaginationProps = PaginationOptions &
  PaginationResult & {
    showFirst?: boolean;
    showPrev?: boolean;
    showNext?: boolean;
    showLast?: boolean;
    showPages?: boolean;
    pagesCount?: number;
  };

export type PaginationLinkProps = Pick<PaginationOptions, 'page'> & {
  disabled?: boolean;
};

export type PagedList<T> = {
  data: T[];
  page: number;
  pageCount: number;
  totalCount: number;
};
