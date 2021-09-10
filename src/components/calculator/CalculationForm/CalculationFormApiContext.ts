import { createContext } from 'react';
import { FormApi } from 'final-form';
import { CalculationFormValues } from '../types';
import { Currency } from 'schema/serverTypes';
import { CurrencyRatesContextProps } from '../CurrencyRatesContext';

type ItemValue = any;
export type CalculationFormField = keyof CalculationFormValues;

export type CurrencyFieldKeys = keyof Pick<CalculationFormValues, 'currencySale' | 'currencyLease'>;

export type CalculationFormApiContextProps = Pick<
  FormApi<CalculationFormValues, Partial<CalculationFormValues>>,
  'batch' | 'change' | 'getFieldState'
> &
  Pick<CurrencyRatesContextProps, 'getCofValue' | 'setLeaseCurrency' | 'setSaleCurrency'> & {
    getCurrency: (name: CurrencyFieldKeys) => Currency;
    getActualRate: (sale: Currency, lease: Currency, inputRate: number) => number;
    exchangeMoney: (
      amount: number,
      from: Currency,
      to: Currency,
      inputRate?: number | undefined
    ) => number;
    isActive: (name: CalculationFormField) => boolean;
    setCurrencyRate: (sale: Currency, lease: Currency, inputRate?: number | undefined) => void;
  };

const defaulContextProps: CalculationFormApiContextProps = {
  change: (_name: CalculationFormField, _value?: ItemValue) => {},
  batch: (_fn: () => void) => {},
  getFieldState: () => {
    return undefined;
  },
  getCurrency: (_name: CurrencyFieldKeys) => Currency.Ruble,
  getActualRate: (_sale: Currency, _lease: Currency, _inputRate: number) => 1,
  exchangeMoney: (
    amount: number,
    _from: Currency,
    _to: Currency,
    _inputRate?: number | undefined
  ) => amount,
  setLeaseCurrency: (_: string) => {},
  setSaleCurrency: (_: string) => {},
  getCofValue: (_currency: string, _months: number) => 0,
  isActive: (_name: CalculationFormField) => false,
  setCurrencyRate: (_sale: Currency, _lease: Currency, _inputRate?: number | undefined) => {},
};

export const CalculationFormApiContext =
  createContext<CalculationFormApiContextProps>(defaulContextProps);
