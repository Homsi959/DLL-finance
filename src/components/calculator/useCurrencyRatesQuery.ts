import { useQuotasDictionaryBackendQuery } from 'services';
import { CurrencyDictionaryViewModel } from 'schema/serverTypes';

const LastUpdatedCurrency = 'currency/rates';

export const useCurrencyRatesQuery = () => {
  return useQuotasDictionaryBackendQuery<CurrencyDictionaryViewModel>(LastUpdatedCurrency);
};
