import { useCallback } from 'react';
import { Field, AnyObject } from 'react-final-form';
import { Amount, AmountType } from 'schema';
import { useAmountValidation } from '../utils';
import { AmountFieldProps } from './types';
import { FixedTypeInput } from './FixedTypeInput';
import { AmountTextField } from './AmountTextField';

export const AmountField = (props: AmountFieldProps) => {
  const {
    name,
    label,
    disabled = false,
    required = false,
    allowZero = false,
    amountMode,
    useSaleCurrency,
  } = props;

  const { validateAmount } = useAmountValidation();

  const validate = useCallback(
    (value: any, allValues: object) => {
      const all = allValues as AnyObject;
      const amountValue: Partial<Amount> | undefined = all[name] ?? {};
      const type: AmountType = amountValue?.type ?? AmountType.Percents;
      return validateAmount(required, allowZero, type, value);
    },
    [required, allowZero, name, validateAmount]
  );

  if (amountMode !== undefined) {
    return <FixedTypeInput {...props} useSaleCurrency={useSaleCurrency} amountMode={amountMode} />;
  }

  const valueName = `${name}.value`;
  const typeName = `${name}.type`;

  return (
    <Field name={typeName}>
      {({ input }) => {
        const amountType = input.value;
        return (
          <Field
            name={valueName}
            typeFieldName={typeName}
            label={label}
            required={required}
            disabled={disabled}
            amountType={amountType}
            useSaleCurrency={useSaleCurrency}
            component={AmountTextField}
            validate={validate}
          />
        );
      }}
    </Field>
  );
};
