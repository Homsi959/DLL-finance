import { useCallback, useEffect, useMemo, useState } from 'react';
import { useQueryParams, NumberParam, withDefault } from 'use-query-params';
import { IDENTITY_CONFIG } from 'services/authentication/AuthenticationConfig';

import { useBackendQuery } from 'services/api/useBackend';
import { GroupOwnersViewModel, GroupPagedList, GroupSortBy, SortOrder } from 'schema/serverTypes';

type SearchUrlParams = {
  page: number;
  pageSize: number;
  search?: string;
  sortBy?: GroupSortBy;
  order?: SortOrder;
};

const useSearchUrl = (searchParams: SearchUrlParams) => {
  const { page, pageSize, search, sortBy, order } = searchParams;

  return useMemo(() => {
    const searchParams = new URLSearchParams();
    searchParams.set('page', page.toString());
    searchParams.set('pageSize', pageSize.toString());

    if (search) {
      searchParams.set('search', search);
    }
    if (sortBy) {
      searchParams.set('sortBy', sortBy);
    }
    if (order) {
      searchParams.set('order', order);
    }

    return `${IDENTITY_CONFIG.authority}/api/v1/groups?${searchParams}`;
  }, [page, pageSize, search, sortBy, order]);
};

export const useGroupsQuery = () => {
  const [queryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    pageSize: withDefault(NumberParam, 20),
  });

  const { page, pageSize } = queryParams;

  const [search, setSearch] = useState<string>();
  const [sortBy, setSortBy] = useState<GroupSortBy>();
  const [order, setOrder] = useState<SortOrder>();

  const url = useSearchUrl({ page, pageSize, search, sortBy, order });

  const {
    data,
    isLoading: loading,
    refetch,
  } = useBackendQuery<GroupPagedList>(url, ['groups', url]);

  const groups: GroupOwnersViewModel[] = data?.data ?? [];

  useEffect(() => {
    refetch();
  }, [refetch, url]);

  const handleSortBy = useCallback((sortBy: GroupSortBy | undefined) => {
    setSortBy(sortBy);
  }, []);

  const handleSortOrder = useCallback((orderBy: SortOrder | undefined) => {
    setOrder(orderBy);
  }, []);

  return {
    paging: {
      pageCount: data?.pageCount ?? 0,
      totalCount: data?.totalCount ?? 0,
      page,
      pageSize,
      dataCount: groups.length,
    },
    sorting: {
      sortBy,
      order,
      setSortBy: handleSortBy,
      setOrder: handleSortOrder,
    },
    filter: {
      search,
      setSearch,
    },
    groups,
    loading,
  };
};
