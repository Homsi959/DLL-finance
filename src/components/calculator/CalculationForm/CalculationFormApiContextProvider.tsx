import { FormFieldsProps } from './fieldGroups/types';
import { useCallback, useContext, useMemo } from 'react';
import {
  CalculationFormApiContext,
  CurrencyFieldKeys,
  CalculationFormField,
} from './CalculationFormApiContext';
import { Currency } from 'schema/serverTypes';
import { CurrencyRatesContext } from '../CurrencyRatesContext';
import { useCurrencyExchanger } from './useCurrencyExchanger';

export type CalculationFormApiContextProviderProps = FormFieldsProps & {
  children: React.ReactNode;
};

export const CalculationFormApiContextProvider = (
  props: CalculationFormApiContextProviderProps
) => {
  const { children, form } = props;
  const { change, batch, getFieldState } = form;

  const { data, exchangeRates, setLeaseCurrency, setSaleCurrency, getCofValue } =
    useContext(CurrencyRatesContext);
  const baseCurrency = data?.baseCurrency ?? Currency.Ruble;

  const { displayRate, exchangeMoney, findRate } = useCurrencyExchanger(
    baseCurrency,
    exchangeRates
  );

  const getCurrency = useCallback(
    (name: CurrencyFieldKeys) => {
      return (getFieldState(name)?.value as Currency) ?? Currency.Ruble;
    },
    [getFieldState]
  );

  const getActualRate = useCallback(
    (sale: Currency, lease: Currency, inputRate: number) => {
      const displayedRate = displayRate(sale, lease);
      if (displayedRate === inputRate) {
        return findRate(sale, lease);
      }

      if (lease === baseCurrency) {
        return inputRate;
      }

      const saleToBaseCurrencyRate = findRate(sale, baseCurrency);
      return saleToBaseCurrencyRate / inputRate;
    },
    [baseCurrency, displayRate, findRate]
  );

  const isActive = useCallback(
    (name: CalculationFormField) => {
      return getFieldState(name)?.active ?? false;
    },
    [getFieldState]
  );

  const setCurrencyRate = useCallback(
    (sale: Currency, lease: Currency, inputRate?: number) => {
      const rate = displayRate(sale as Currency, lease, inputRate);
      change('currencyRate', rate);
    },
    [displayRate, change]
  );

  const value = useMemo(() => {
    return {
      batch,
      change,
      getFieldState,
      getCurrency,
      getActualRate,
      exchangeMoney,
      setLeaseCurrency,
      setSaleCurrency,
      getCofValue,
      isActive,
      setCurrencyRate,
    };
  }, [
    batch,
    change,
    getFieldState,
    getCurrency,
    getActualRate,
    exchangeMoney,
    setLeaseCurrency,
    setSaleCurrency,
    getCofValue,
    isActive,
    setCurrencyRate,
  ]);

  return (
    <CalculationFormApiContext.Provider value={value}>
      {children}
    </CalculationFormApiContext.Provider>
  );
};
