import { useCallback, useMemo, useState } from 'react';
import { useController, UseFormSetValue } from 'react-hook-form';
import {
  CounterpartyFormControl,
  CounterpartyType,
  getOptionLabel,
  ContractFormValues,
} from './types';
import { useCounterpartyQuery } from './useCounterpartyQuery';

export const useCounterpartySearch = (
  control: CounterpartyFormControl,
  setValue: UseFormSetValue<ContractFormValues>,
  type: CounterpartyType
) => {
  const name =
    type === CounterpartyType.dealer
      ? 'dealer'
      : type === CounterpartyType.lessor
      ? 'lessor'
      : 'lessee';

  const {
    field: { onChange, value },
    fieldState: { invalid, error },
  } = useController({
    control,
    name,
  });

  const headName =
    type === CounterpartyType.dealer
      ? 'dealerHead'
      : type === CounterpartyType.lessor
      ? 'lessorHead'
      : 'lesseeHead';

  const [inputValue, setInputValue] = useState(value !== undefined ? getOptionLabel(value) : '');
  const { options } = useCounterpartyQuery({ type, inputValue });

  const handleOnChange = useCallback(
    (...event: any[]) => {
      setValue(headName, undefined);
      onChange(event);
    },
    [headName, setValue, onChange]
  );

  return useMemo(() => {
    const heads = value?.heads ?? [];

    return {
      value,
      inputValue,
      options,
      invalid,
      error,
      setInputValue,
      onChange: handleOnChange,
      heads,
    };
  }, [value, inputValue, options, invalid, error, setInputValue, handleOnChange]);
};
