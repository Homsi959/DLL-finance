import { useCallback, useEffect, useMemo, useState } from 'react';
import { GridSortModel, GridSortModelParams } from '@material-ui/data-grid';
import { useQueryParams, NumberParam, withDefault } from 'use-query-params';
import { calculationUrl } from 'services/calculation';
import { CounterpartyListResult } from './types';
import { useBackendQuery } from 'services';

export type QuotaAction = 'changeOwner' | 'viewHistory';

type SearchUrlParams = {
  page: number;
  pageSize: number;
  isDealer?: boolean;
  isLessee?: boolean;
  isInsuranceCompany?: boolean;
  isLessor?: boolean;
  search?: string;
  sortModel?: GridSortModel;
};

const useSearchUrl = (searchParams: SearchUrlParams) => {
  const { page, pageSize, isDealer, isLessor, isInsuranceCompany, isLessee, search, sortModel } =
    searchParams;

  return useMemo(() => {
    const searchParams = new URLSearchParams();
    searchParams.set('page', page.toString());
    searchParams.set('pageSize', pageSize.toString());

    if (isDealer) {
      searchParams.set('isDealer', `${isDealer}`);
    }
    if (isLessor) {
      searchParams.set('isLessor', `${isLessor}`);
    }
    if (isInsuranceCompany) {
      searchParams.set('isInsuranceCompany', `${isInsuranceCompany}`);
    }
    if (isLessee) {
      searchParams.set('isDealer', `${isLessee}`);
    }
    if (search) {
      searchParams.set('search', search);
    }

    if (sortModel?.length === 1) {
      searchParams.set('sortBy', sortModel[0].field);
      if (sortModel[0].sort) {
        searchParams.set('order', sortModel[0].sort);
      }
    }
    return `${calculationUrl}/api/v1/counterparties?${searchParams}`;
  }, [page, pageSize, isDealer, isLessor, isInsuranceCompany, isLessee, search, sortModel]);
};

export const useCounterpartiesData = () => {
  const [queryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    pageSize: withDefault(NumberParam, 20),
  });
  const { page, pageSize } = queryParams;

  const [isDealer, setIsDealer] = useState<boolean>();
  const [isLessee, setIsLessee] = useState<boolean>();
  const [isInsuranceCompany, setInsuranceCompany] = useState<boolean>();
  const [isLessor, setIsLessor] = useState<boolean>();
  const [search, setSearch] = useState<string>();

  const [sortModel, setSortModel] = useState<GridSortModel>();
  const onSortModelChange = useCallback(
    (params: GridSortModelParams) => {
      setSortModel(params.sortModel);
    },
    [setSortModel]
  );

  const url = useSearchUrl({
    page,
    pageSize,
    isLessor,
    isDealer,
    isLessee,
    isInsuranceCompany,
    search,
    sortModel,
  });

  const {
    data,
    isLoading: loading,
    refetch,
  } = useBackendQuery<CounterpartyListResult>(url, ['counteparties', page, pageSize]);

  useEffect(() => {
    refetch();
  }, [refetch, url]);

  const rows = data?.data ?? [];

  return {
    sorting: {
      sortModel,
      onSortModelChange,
    },
    filter: {
      setIsDealer,
      setIsLessee,
      setIsLessor,
      setInsuranceCompany,
      setSearch,
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
