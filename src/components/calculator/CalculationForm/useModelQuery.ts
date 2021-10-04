import { useDebounce } from 'use-debounce';
import { NomenclatureItem } from 'schema';
import { useQuotasDictionaryBackendQuery } from 'services';
import { ItemValue } from './NomenclatureContext';

const Categories = 'nomenclature/models';

export const useModelQuery = (brand?: ItemValue, category?: ItemValue, inputValue?: string) => {
  const [input] = useDebounce(inputValue, 500);

  var requestUrl = Categories;
  const searchParams = new URLSearchParams();

  if (!brand && !category && input) {
    searchParams.set('model', input);
  } else {
    if (brand) {
      searchParams.set('brand', brand);
    }
    if (category) {
      searchParams.set('category', category);
    }
  }
  requestUrl += `?${searchParams}`;

  const { data: items = [], refetch } = useQuotasDictionaryBackendQuery<NomenclatureItem[]>(
    requestUrl,
    {
      enabled: !!brand || !!category || (input?.length ?? 0) > 0,
    }
  );

  return {
    options: items.map((t) => t.model),
    items,
    refetch,
  };
};
