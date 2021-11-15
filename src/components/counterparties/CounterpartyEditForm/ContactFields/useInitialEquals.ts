import { useEffect, useRef, useState } from 'react';
import { isEmpty, equals } from '../types';
import { Address, CounterpartyViewModel } from 'schema/serverTypes';
import { UseFormSetValue } from 'react-hook-form';
import { CounterpartyFormValues } from 'components/counterparties/types';

export type AddressName = keyof Pick<
  CounterpartyViewModel,
  'legalAddress' | 'actualAddress' | 'mailingAddress'
>;

export const useInitialEquals = (
  name: AddressName,
  left?: Address,
  right?: Address,
  setValue?: UseFormSetValue<CounterpartyFormValues>
) => {
  const initialValue = !isEmpty(left) && !isEmpty(right) ? equals(left!, right!) : false;
  const [equalsTo, setEqualsTo] = useState(initialValue);

  const isMount = useRef(false);
  useEffect(() => {
    if (isMount.current) {
      return;
    }
    if (isEmpty(left) || isEmpty(right)) {
      return;
    }

    if (equals(left!, right!) && !equalsTo) {
      isMount.current = true;
      setEqualsTo(true);
    }
  }, [left, right, equalsTo, setEqualsTo]);

  useEffect(() => {
    if (equalsTo && !isEmpty(left) && !isEmpty(right) && !equals(left!, right!) && setValue) {
      setValue(name, right);
    }
  }, [name, left, right, setValue, equalsTo]);

  return [equalsTo, setEqualsTo] as const;
};
