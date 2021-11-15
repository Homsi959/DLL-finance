import { useCallback, useEffect, useMemo } from 'react';
import { useQueryParams, NumberParam, withDefault } from 'use-query-params';
import { NomenclatureItem } from 'schema/serverTypes';
import { useQuotasDictionaryBackendQuery } from 'services';
import { PagedList } from 'components/pagination/types';
import { SearchFilterFormValues } from './types';
import { useForm, useWatch } from 'react-hook-form';
import { useDebounce } from 'use-debounce';

export type QuotaAction = 'changeOwner' | 'viewHistory';

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

    return `nomenclature?${searchParams}`;
  }, [page, pageSize, search]);
};

export const useNomenclaturesData = () => {
  const [queryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    pageSize: withDefault(NumberParam, 20),
  });
  const { page, pageSize } = queryParams;

  const { control, reset } = useForm<SearchFilterFormValues>({
    mode: 'onBlur',
    defaultValues: { search: undefined },
  });

  const handleOnReset = useCallback(() => {
    reset({ search: undefined });
  }, [reset]);

  const searchValue = useWatch({ control, name: 'search' });
  const [search] = useDebounce(searchValue ?? '', 500);

  const url = useSearchUrl({
    page,
    pageSize,
    search,
  });

  const {
    data,
    isLoading: loading,
    refetch,
  } = useQuotasDictionaryBackendQuery<PagedList<NomenclatureItem>>(url);

  useEffect(() => {
    refetch();
  }, [refetch, url]);

  const rows = data?.data ?? [];

  return {
    filter: {
      control,
      handleOnReset,
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
