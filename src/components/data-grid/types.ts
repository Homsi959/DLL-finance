import { SortOrder } from 'schema/serverTypes';

export type SortingProps = {
  setOrder(orderBy: string | undefined): void;
  setSortBy(sortBy: string | undefined): void;
  order: SortOrder | undefined;
  sortBy: string | undefined;
};

export type TableSortLabelProps = {
  columnName: string;
  sorting: SortingProps;
  position?: 'left' | 'right';
};
