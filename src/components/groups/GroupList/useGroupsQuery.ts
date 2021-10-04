import { useEffect, useMemo, useState } from 'react';
import { useQueryParams, NumberParam, withDefault } from 'use-query-params';
import { IDENTITY_CONFIG } from 'services/authentication/AuthenticationConfig';
import { GroupListResult } from '../types';

import { useBackendQuery } from 'services/api/useBackend';

type SearchUrlParams = {
  page: number;
  pageSize: number;
  search?: string;
};

const useSearchUrl = (searchParams: SearchUrlParams) => {
  const { page, pageSize, search } = searchParams;

  return useMemo(() => {
    const searchParams = new URLSearchParams();
    searchParams.set('page', page.toString());
    searchParams.set('pageSize', pageSize.toString());

    if (search) {
      searchParams.set('search', search);
    }
    return `${IDENTITY_CONFIG.authority}/api/v1/groups?${searchParams}`;
  }, [page, pageSize, search]);
};

export const useGroupsQuery = () => {
  const [queryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    pageSize: withDefault(NumberParam, 20),
  });

  const { page, pageSize } = queryParams;

  const [search, setSearch] = useState<string>();

  const url = useSearchUrl({ page, pageSize, search });

  const {
    data,
    isLoading: loading,
    refetch,
  } = useBackendQuery<GroupListResult>(url, ['groups', url]);

  useEffect(() => {
    refetch();
  }, [refetch, url]);

  const groups = data?.data ?? [];

  const newGroups = groups.map((group) => ({
    ...group,
    // @ts-ignore
    owners: group.owners[0], //TODO owners [] -> string hack, delete @ts-ignore
  }));

  return {
    paging: {
      pageCount: data?.pageCount ?? 0,
      totalCount: data?.totalCount ?? 0,
      page,
      pageSize,
      dataCount: groups.length,
    },
    filter: {
      search,
      setSearch,
    },
    groups: newGroups,
    loading,
  };
};
