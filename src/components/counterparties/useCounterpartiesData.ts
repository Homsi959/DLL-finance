import { useCallback, useEffect, useMemo, useState } from 'react';
import { useQueryParams, NumberParam, withDefault } from 'use-query-params';
import { calculationUrl } from 'services/calculation';
import { CounterpartyListResult } from './types';
import { CounterpartySortBy, CounterpartyType, SortOrder } from 'schema/serverTypes';
import { useBackendQuery } from 'services';

export type QuotaAction = 'changeOwner' | 'viewHistory';

type SearchUrlParams = {
  page: number;
  pageSize: number;
  search?: string;
  type?: CounterpartyType;
  sortBy?: CounterpartySortBy;
  order?: SortOrder;
};

const getCounterpartyFilterName = (type: CounterpartyType) => {
  switch (type) {
    case CounterpartyType.dealer:
      return 'isDealer';
    case CounterpartyType.lessee:
      return 'isLessee';
    case CounterpartyType.lessor:
      return 'isLessor';
    case CounterpartyType.insuranceCompany:
      return 'isInsuranceCompany';
  }
};

const useSearchUrl = (searchParams: SearchUrlParams) => {
  const { page, pageSize, search, type, sortBy, order } = searchParams;

  return useMemo(() => {
    const searchParams = new URLSearchParams();
    searchParams.set('page', page.toString());
    searchParams.set('pageSize', pageSize.toString());

    if (search) {
      searchParams.set('search', search);
    }

    if (type) {
      const name = getCounterpartyFilterName(type);
      searchParams.set(name, 'true');
    }

    if (sortBy) {
      searchParams.set('sortBy', sortBy);
    }

    if (order) {
      searchParams.set('order', order);
    }

    return `${calculationUrl}/api/v1/counterparties?${searchParams}`;
  }, [page, pageSize, search, type, order, sortBy]);
};

export const useCounterpartiesData = () => {
  const [queryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    pageSize: withDefault(NumberParam, 20),
  });
  const { page, pageSize } = queryParams;

  const [search, setSearch] = useState<string>();
  const [type, setType] = useState<CounterpartyType>();
  const [sortBy, setSortBy] = useState<CounterpartySortBy>();
  const [order, setOrder] = useState<SortOrder>();

  const url = useSearchUrl({
    page,
    pageSize,
    search,
    type,
    sortBy,
    order,
  });
  const {
    data,
    isLoading: loading,
    refetch,
  } = useBackendQuery<CounterpartyListResult>(url, ['counteparties', url]);

  useEffect(() => {
    refetch();
  }, [refetch, url]);

  const rows = data?.data ?? [];

  const handleSortBy = useCallback((sortBy: CounterpartySortBy | undefined) => {
    setSortBy(sortBy);
  }, []);

  const handleSortOrder = useCallback((orderBy: SortOrder | undefined) => {
    setOrder(orderBy);
  }, []);

  return {
    filter: {
      setType,
      setSearch,
    },
    sorting: {
      sortBy,
      order,
      setSortBy: handleSortBy,
      setOrder: handleSortOrder,
    },
    paging: {
      pageCount: data?.pageCount ?? 0,
      totalCount: data?.totalCount ?? 0,
      page,
      pageSize,
      dataCount: rows.length,
    },
    rows,
    loading,
  };
};
