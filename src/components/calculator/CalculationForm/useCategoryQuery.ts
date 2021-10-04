import { useDebounce } from 'use-debounce';
import { NomenclatureItem } from 'schema';
import { useQuotasDictionaryBackendQuery } from 'services';
import { ItemValue } from './NomenclatureContext';

const Categories = 'nomenclature/categories';

export const useCategoryQuery = (brand?: ItemValue, inputValue?: string) => {
  const [input] = useDebounce(inputValue, 500);

  var requestUrl = Categories;
  const searchParams = new URLSearchParams();

  if (brand) {
    searchParams.set('brand', brand);
  } else if (input) {
    searchParams.set('category', input);
  }
  requestUrl += `?${searchParams}`;

  const { data: items = [], refetch } = useQuotasDictionaryBackendQuery<NomenclatureItem[]>(
    requestUrl,
    {
      enabled: !!brand || (input?.length ?? 0) > 0,
    }
  );

  return {
    options: items.map((t) => t.category),
    items,
    refetch,
  };
};
