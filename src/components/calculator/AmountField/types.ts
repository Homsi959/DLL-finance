import { createContext } from 'react';
import { AmountType } from 'schema/serverTypes';
import { OutlinedInputProps } from '@material-ui/core';

export type AmountTypeContextProps = {
  amountType: AmountType;
  fractionDigits?: number;
};

export const AmountTypeContext = createContext<AmountTypeContextProps>({
  amountType: AmountType.Percents,
});

export type AmountFieldProps = {
  name: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  amountMode?: AmountType;
  fractionDigits?: number;
  useSaleCurrency?: boolean;
  allowZero?: boolean;
  inputProps?: OutlinedInputProps['inputProps'];
};
