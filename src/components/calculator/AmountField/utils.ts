import { NumberFormatValues } from 'react-number-format';

export const getValueWithPrecision = (amountValue: any, fractionDigits: number) => {
  if (typeof amountValue === 'number') {
    return parseFloat(amountValue.toFixed(fractionDigits));
  }
  if (typeof amountValue !== 'string' || amountValue === undefined || amountValue === '') {
    return amountValue;
  }
  let value = parseFloat(amountValue.replaceAll(',', '.'));
  if (isNaN(value)) {
    return amountValue;
  }
  return value.toFixed(fractionDigits).replaceAll('.', ',');
};

const MAX_VAL = 10000000000000;
const MAX_PERCENTS_VAL = 10000000000000;

export const withValueLimit = ({ floatValue }: NumberFormatValues) => (floatValue ?? 0) <= MAX_VAL;
export const withPercentsLimit = ({ floatValue }: NumberFormatValues) =>
  (floatValue ?? 0) <= MAX_PERCENTS_VAL;
