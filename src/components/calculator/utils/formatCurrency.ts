import { Currency } from 'schema/serverTypes';

export const formatCurrency = (currency?: string) => {
  switch (currency) {
    case Currency.Ruble:
      return '₽';
    case Currency.Dollar:
      return '$';
    case Currency.Euro:
      return '€';
    default:
      return undefined;
  }
};
