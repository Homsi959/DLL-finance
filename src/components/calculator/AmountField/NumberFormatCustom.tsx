import { useCallback, useContext } from 'react';
import NumberFormat, { NumberFormatValues } from 'react-number-format';
import { AmountType } from 'schema';
import { AmountTypeContext } from './types';
import { getValueWithPrecision, withPercentsLimit, withValueLimit } from './utils';

export const NumberFormatCustom = (props: any) => {
  const { inputRef, onChange, value: inputValue, ...other } = props;

  const { amountType, fractionDigits = 2 } = useContext(AmountTypeContext);
  const value = getValueWithPrecision(inputValue, fractionDigits);

  const handleOnValueChange = useCallback(
    (values: NumberFormatValues) => {
      if (amountType === AmountType.Percents) {
        const { floatValue = 0 } = values;
        const value = floatValue.toFixed(fractionDigits);
        onChange({
          target: {
            name: props.name,
            value: Number.parseFloat(value),
          },
        });
        return;
      }

      onChange({
        target: {
          name: props.name,
          value: values.floatValue,
        },
      });
    },
    [onChange, props.name, amountType, fractionDigits]
  );

  const withLimit = useCallback(
    (values: NumberFormatValues) => {
      if (amountType === AmountType.Percents) {
        return withPercentsLimit(values);
      }
      return withValueLimit(values);
    },
    [amountType]
  );

  return (
    <NumberFormat
      {...other}
      value={value}
      allowNegative={false}
      isAllowed={withLimit}
      getInputRef={inputRef}
      onValueChange={handleOnValueChange}
      isNumericString={false}
      fixedDecimalScale={true}
      decimalSeparator={','}
      thousandSeparator={' '}
    />
  );
};
