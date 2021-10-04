import { useCallback, useEffect, useMemo, useState } from 'react';
import { GridSortModel, GridSortModelParams } from '@material-ui/data-grid';
import { useQueryParams, NumberParam, withDefault } from 'use-query-params';
import { calculationUrl } from 'services/calculation';
import { QuotaListResult } from './types';
import { useBackendQuery, useUserAuth } from 'services';
import { QuotaSortBy } from 'schema';

export type QuotaAction = 'changeOwner' | 'viewHistory';

type SearchUrlParams = {
  page: number;
  pageSize: number;
  tabIndex: number;
  dealer?: string;
  lessee?: string;
  search?: string;
  ownerId?: string;
  sortModel?: GridSortModel;
};

const useSearchUrl = (searchParams: SearchUrlParams) => {
  const { page, pageSize, tabIndex, dealer, lessee, search, ownerId, sortModel } = searchParams;

  return useMemo(() => {
    const searchParams = new URLSearchParams();
    searchParams.set('page', page.toString());
    searchParams.set('pageSize', pageSize.toString());

    if (tabIndex === 0) {
      searchParams.set('owned', 'true');
    }
    if (lessee) {
      searchParams.set('lesseeInn', lessee);
    }
    if (dealer) {
      searchParams.set('dealerInn', dealer);
    }
    if (search) {
      searchParams.set('search', search);
    }
    if (ownerId) {
      searchParams.set('ownerId', ownerId);
    }
    if (sortModel?.length === 1) {
      searchParams.set('sortBy', sortModel[0].field);
      if (sortModel[0].sort) {
        searchParams.set('order', sortModel[0].sort);
      }
    }
    return `${calculationUrl}/api/v1/quotas?${searchParams}`;
  }, [page, pageSize, tabIndex, dealer, lessee, search, ownerId, sortModel]);
};

export const useQuotaData = (tabIndex: number) => {
  const [queryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    pageSize: withDefault(NumberParam, 20),
  });
  const { page, pageSize } = queryParams;

  const [dealer, setDealer] = useState<string>();
  const [lessee, setLessee] = useState<string>();
  const [search, setSearch] = useState<string>();
  const [ownerId, setOwnerId] = useState<string>();

  const [sortModel, setSortModel] = useState<GridSortModel>([
    {
      field: QuotaSortBy.id,
      sort: 'desc',
    },
  ]);
  const onSortModelChange = useCallback(
    (params: GridSortModelParams) => {
      setSortModel(params.sortModel);
    },
    [setSortModel]
  );

  const url = useSearchUrl({
    page,
    pageSize,
    tabIndex,
    dealer,
    lessee,
    ownerId,
    search,
    sortModel,
  });

  const {
    data,
    isLoading: loading,
    refetch,
  } = useBackendQuery<QuotaListResult>(url, ['quotas', url]);

  useEffect(() => {
    refetch();
  }, [refetch, url]);

  const { user: currentUser } = useUserAuth();
  const currentUserId = currentUser !== null ? currentUser.profile.sub : null;
  const quotas = data?.data ?? [];
  const rows = quotas.map(
    ({
      quotaId,
      leaseSubject = 'Не задано',
      createdDate,
      user,
      numberOfItems = 1,
      prepayment,
      numberOfMonths = 1,
      dealer,
      lessee,
      calculationMethod,
      fundingAmountNBV,
      currency,
    }) => {
      return {
        id: quotaId,
        asset: {
          name: leaseSubject,
          numberOfItems,
          prepayment,
          numberOfMonths,
          calculationMethod,
        },
        createdDate,
        user,
        dealer,
        lessee,
        currency,
        fundingAmountNBV,
        action: currentUserId === user.id ? ('changeOwner' as QuotaAction) : 'viewHistory',
      };
    }
  );

  return {
    sorting: {
      sortModel,
      onSortModelChange,
    },
    filter: {
      setDealer,
      setLessee,
      setOwnerId,
      setSearch,
    },
    paging: {
      pageCount: data?.pageCount ?? 0,
      totalCount: data?.totalCount ?? 0,
      page,
      pageSize,
      dataCount: quotas.length,
    },
    rows,
    loading,
  };
};
