import { useCallback } from 'react';
import { useState } from 'react';
import { useMemo } from 'react';
import { Cof, Currency, CurrencyDictionaryViewModel } from 'schema';
import { CurrencyRatesContext } from './CurrencyRatesContext';

export const CurrencyRatesContextProvider = (props: {
  currencies: CurrencyDictionaryViewModel;
  cofs: Cof[];
  children: React.ReactNode;
}) => {
  const { children, currencies, cofs } = props;

  const [currencyLease, setCurrencyLease] = useState<string>(Currency.Ruble);
  const [currencySale, setCurrencySale] = useState<string>(Currency.Ruble);

  const setLeaseCurrency = useCallback(
    (value: string) => {
      if (value === Currency.Dollar) {
        setCurrencyLease(Currency.Dollar);
      } else if (value === Currency.Euro) {
        setCurrencyLease(Currency.Euro);
      } else {
        setCurrencyLease(Currency.Ruble);
      }
    },
    [setCurrencyLease]
  );

  const setSaleCurrency = useCallback(
    (value: string) => {
      if (value === Currency.Dollar) {
        setCurrencySale(Currency.Dollar);
      } else if (value === Currency.Euro) {
        setCurrencySale(Currency.Euro);
      } else {
        setCurrencySale(Currency.Ruble);
      }
    },
    [setCurrencySale]
  );

  const getCofValue = useCallback(
    (currency: string, months: number) => {
      const currencyCofs = cofs.filter((t) => t.currency === currency);
      for (var i = 0; i < currencyCofs.length; i++) {
        const current = currencyCofs[i];
        if (months <= current.months) {
          return current.value;
        }
      }
      return 0;
    },
    [cofs]
  );

  const value = useMemo(() => {
    return {
      data: currencies,
      exchangeRates: currencies?.exchangeRates ?? [],
      currencyLease,
      currencySale,
      cofs,
      setLeaseCurrency,
      setSaleCurrency,
      getCofValue,
    };
  }, [
    currencyLease,
    currencySale,
    setLeaseCurrency,
    setSaleCurrency,
    currencies,
    cofs,
    getCofValue,
  ]);

  return <CurrencyRatesContext.Provider value={value}>{children}</CurrencyRatesContext.Provider>;
};
