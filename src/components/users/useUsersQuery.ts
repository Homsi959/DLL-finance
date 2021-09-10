import { useEffect, useMemo, useState } from 'react';
import { useQueryParams, NumberParam, withDefault } from 'use-query-params';
import { IDENTITY_CONFIG } from 'services/authentication/AuthenticationConfig';
import { UserListResult } from './types';
import { ApplicationRole } from 'schema';
import { useBackendQuery } from 'services/api/useBackend';

type SearchUrlParams = {
  page: number;
  pageSize: number;
  search?: string;
  role?: ApplicationRole;
};

const useSearchUrl = (searchParams: SearchUrlParams) => {
  const { page, pageSize, role, search } = searchParams;

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
    return `${IDENTITY_CONFIG.authority}/api/v1/users?${searchParams}`;
  }, [page, pageSize, role, search]);
};

export const useUsersQuery = () => {
  const [queryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    pageSize: withDefault(NumberParam, 20),
  });
  const { page, pageSize } = queryParams;

  const [role, setRole] = useState<ApplicationRole>();
  const [search, setSearch] = useState<string>();

  const url = useSearchUrl({ page, pageSize, role, search });

  const {
    data,
    isLoading: loading,
    refetch,
  } = useBackendQuery<UserListResult>(url, ['users', page, pageSize]);

  useEffect(() => {
    refetch();
  }, [refetch, url]);

  const users = data?.data ?? [];

  return {
    paging: {
      pageCount: data?.pageCount ?? 0,
      totalCount: data?.totalCount ?? 0,
      page,
      pageSize,
      dataCount: users.length,
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
