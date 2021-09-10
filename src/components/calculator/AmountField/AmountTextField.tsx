import { useCallback, useMemo } from 'react';
import { Field } from 'react-final-form';
import { FieldRenderProps } from 'react-final-form-hooks';
import { TextField } from 'components';
import { AmountType } from 'schema';
import { AmountFieldProps, AmountTypeContext } from './types';
import { NumberFormatCustom } from './NumberFormatCustom';
import { AmountTypeButton } from './AmountTypeButton';

export type AmountTextFieldProps = FieldRenderProps<string | undefined> &
  AmountFieldProps & {
    typeFieldName: string;
    amountType: AmountType;
  };

export const AmountTextField = (props: AmountTextFieldProps) => {
  const {
    typeFieldName,
    disabled = false,
    amountType,
    fractionDigits,
    useSaleCurrency,
    ...rest
  } = props;
  const { onChange, name } = rest.input;

  const resetAmountValue = useCallback(() => {
    onChange('');
  }, [onChange]);

  const context = useMemo(() => {
    return {
      amountType,
      fractionDigits,
    };
  }, [amountType, fractionDigits]);

  return (
    <AmountTypeContext.Provider value={context}>
      <TextField
        {...rest}
        disabled={disabled}
        InputProps={{
          inputComponent: NumberFormatCustom,
          endAdornment: (
            <Field
              name={typeFieldName}
              resetAmountValue={resetAmountValue}
              inputName={name}
              useSaleCurrency={useSaleCurrency}
              component={AmountTypeButton}
              disabled={disabled}
            />
          ),
        }}
      />
    </AmountTypeContext.Provider>
  );
};
