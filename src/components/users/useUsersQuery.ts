import { useCallback, useEffect, useMemo, useState } from 'react';
import { useQueryParams, NumberParam, withDefault } from 'use-query-params';
import { IDENTITY_CONFIG } from 'services/authentication/AuthenticationConfig';
import { UserListResult } from './types';
import { ApplicationRole, SortOrder, UserSortBy } from 'schema';
import { useBackendQuery } from 'services/api/useBackend';

type SearchUrlParams = {
  page: number;
  pageSize: number;
  search?: string;
  role?: ApplicationRole;
  sortBy?: UserSortBy;
  order?: SortOrder;
};

const useSearchUrl = (searchParams: SearchUrlParams) => {
  const { page, pageSize, role, search, sortBy, order } = searchParams;

  return useMemo(() => {
    const searchParams = new URLSearchParams();
    searchParams.set('page', page.toString());
    searchParams.set('pageSize', pageSize.toString());

    if (role) {
      searchParams.set('role', role);
    }
    if (search) {
      searchParams.set('search', search);
    }
    if (sortBy) {
      searchParams.set('sortBy', sortBy);
    }
    if (order) {
      searchParams.set('order', order);
    }

    return `${IDENTITY_CONFIG.authority}/api/v1/users?${searchParams}`;
  }, [page, pageSize, role, search, sortBy, order]);
};

export const useUsersQuery = () => {
  const [queryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    pageSize: withDefault(NumberParam, 20),
  });
  const { page, pageSize } = queryParams;

  const [role, setRole] = useState<ApplicationRole>();
  const [search, setSearch] = useState<string>();
  const [sortBy, setSortBy] = useState<UserSortBy>();
  const [order, setOrder] = useState<SortOrder>();

  const url = useSearchUrl({ page, pageSize, role, search, sortBy, order });

  const {
    data,
    isLoading: loading,
    refetch,
  } = useBackendQuery<UserListResult>(url, ['users', url]);

  useEffect(() => {
    refetch();
  }, [refetch, url]);

  const users = data?.data ?? [];

  const handleSortBy = useCallback((sortBy: UserSortBy | undefined) => {
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
      dataCount: users.length,
    },
    sorting: {
      sortBy,
      order,
      setSortBy: handleSortBy,
      setOrder: handleSortOrder,
    },
    filter: {
      role,
      search,
      setRole,
      setSearch,
    },
    loading,
    users,
  };
};
