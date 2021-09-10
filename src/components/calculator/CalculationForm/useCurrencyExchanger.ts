import { useCallback } from 'react';
import { Currency, CurrencyExchangeRate } from 'schema/serverTypes';

export type CurrencyExchanger = ReturnType<typeof useCurrencyExchanger>;

export const useCurrencyExchanger = (
  baseCurrency: Currency,
  exchangeRates: CurrencyExchangeRate[]
) => {
  const findRate = useCallback(
    (from: Currency, to: Currency) => {
      if (from === to) {
        return 1;
      }
      return exchangeRates.find((t) => t.from === from && t.to === to)?.rate ?? 0;
    },
    [exchangeRates]
  );

  const displayRate = useCallback(
    (from: Currency, to: Currency, inputRate?: number) => {
      if (from === to) {
        return 1;
      }
      let rate = inputRate ?? 1;
      if (to !== baseCurrency) {
        rate = findRate(to, baseCurrency);
      } else {
        rate = findRate(from, baseCurrency);
      }
      if (inputRate !== undefined && inputRate !== 1 && inputRate !== rate) {
        return inputRate;
      }
      return rate;
    },
    [baseCurrency, findRate]
  );

  const exchangeMoney = useCallback(
    (amount: number, from: Currency, to: Currency, inputRate?: number) => {
      if (from === to) {
        return amount;
      }

      const rate = findRate(from, to);

      if (inputRate !== undefined && inputRate !== 1 && inputRate !== rate) {
        return inputRate * amount;
      }

      return rate * amount;
    },
    [findRate]
  );

  return {
    findRate,
    exchangeMoney,
    displayRate,
  };
};
