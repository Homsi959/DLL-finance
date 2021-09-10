import { createContext } from 'react';
import {
  Cof,
  Currency,
  CurrencyDictionaryViewModel,
  CurrencyExchangeRate,
} from 'schema/serverTypes';

export type CurrencyRatesContextProps = {
  data: CurrencyDictionaryViewModel | undefined;
  cofs: Cof[] | undefined;
  exchangeRates: CurrencyExchangeRate[];
  currencyLease: string;
  currencySale: string;
  setLeaseCurrency: (currency: string) => void;
  setSaleCurrency: (currency: string) => void;
  getCofValue: (currency: string, months: number) => number;
};

export const CurrencyRatesContext = createContext<CurrencyRatesContextProps>({
  data: undefined,
  cofs: undefined,
  exchangeRates: [],
  currencyLease: Currency.Ruble,
  currencySale: Currency.Ruble,
  setLeaseCurrency: (_: string) => {},
  setSaleCurrency: (_: string) => {},
  getCofValue: (_currency: string, _months: number) => 0,
});
