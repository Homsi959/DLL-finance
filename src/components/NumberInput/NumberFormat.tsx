import { useCallback } from 'react';
import ReactNumberFormat, {
  NumberFormatProps as ReactNumberFormatProps,
  NumberFormatValues as ReactNumberFormatValues,
} from 'react-number-format';

export type NumberFormatProps = Omit<ReactNumberFormatProps, 'defaultValue'> & {};

const getValueWithPrecision = (
  amountValue: number | string | undefined,
  fractionDigits: number
) => {
  if (typeof amountValue === 'number') {
    return parseFloat(amountValue.toFixed(fractionDigits));
  }
  if (typeof amountValue !== 'string' || amountValue === undefined || amountValue === '') {
    return 0.0;
  }

  const value = parseFloat(amountValue.replaceAll(',', '.'));
  if (isNaN(value)) {
    return 0.0;
  }
  return parseFloat(value.toFixed(fractionDigits));
};

export const NumberFormat = (props: NumberFormatProps) => {
  const {
    inputRef,
    allowNegative = false,
    isNumericString = false,
    fixedDecimalScale = true,
    allowLeadingZeros = false,
    decimalScale = 2,
    decimalSeparator = ',',
    thousandSeparator = ' ',
    onChange,
    value: inputValue,
    name,
    ...rest
  } = props;

  const onValueChange = useCallback(
    (values: ReactNumberFormatValues) => {
      onChange({
        target: {
          name: name,
          value: values.floatValue,
        },
      });
    },
    [onChange, name]
  );

  const value = getValueWithPrecision(inputValue, decimalScale);

  const numberFormatProps: ReactNumberFormatProps = {
    ...rest,
    name,
    value,
    getInputRef: inputRef,
    onValueChange,
    allowNegative,
    allowLeadingZeros,
    isNumericString,
    fixedDecimalScale,
    decimalScale,
    decimalSeparator,
    thousandSeparator,
  };

  return <ReactNumberFormat {...numberFormatProps} />;
};
