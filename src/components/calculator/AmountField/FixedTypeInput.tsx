import { useCallback, useMemo } from 'react';
import { Field } from 'react-final-form';
import { TextField } from 'components';
import { NumberFormatCustom } from './NumberFormatCustom';
import { AmountType } from 'schema/serverTypes';
import { useAmountValidation } from '../utils/validateAmount';
import { AmountFieldProps, AmountTypeContext } from './types';

export type FixedTypeInputProps = Omit<AmountFieldProps, 'amountMode'> & {
  amountMode: AmountType;
};

export const FixedTypeInput = (props: FixedTypeInputProps) => {
  const {
    name,
    label,
    disabled = false,
    required = false,
    allowZero = false,
    amountMode,
    fractionDigits,
  } = props;

  const { validateAmount } = useAmountValidation();

  const validate = useCallback(
    (value: any) => {
      return validateAmount(required, allowZero, amountMode, value);
    },
    [required, allowZero, amountMode, validateAmount]
  );

  const context = useMemo(() => {
    return {
      amountType: amountMode,
      fractionDigits,
    };
  }, [amountMode, fractionDigits]);

  return (
    <AmountTypeContext.Provider value={context}>
      <Field
        name={name}
        label={label}
        disabled={disabled}
        component={TextField}
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
        validate={validate}
      />
    </AmountTypeContext.Provider>
  );
};
