import { NomenclatureItem } from 'schema';
import { useQuotasDictionaryBackendQuery } from 'services';

const Brands = 'nomenclature/brands';

export const useBrandQuery = () => {
  var requestUrl = Brands;

  const { data: items = [], isLoading } =
    useQuotasDictionaryBackendQuery<NomenclatureItem[]>(requestUrl);

  return {
    options: items.map((t) => t.brand),
    items,
    isLoading,
  };
};
