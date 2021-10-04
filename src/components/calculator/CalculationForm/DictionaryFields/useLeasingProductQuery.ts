import { useQuotasDictionaryBackendQuery } from 'services';

const LeasingProducts = 'leasingProducts';

export const useLeasingProductQuery = () => {
  var requestUrl = LeasingProducts;

  const { data: options = [] } = useQuotasDictionaryBackendQuery<string[]>(requestUrl);

  return {
    options,
  };
};
