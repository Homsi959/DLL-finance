import { Control } from 'react-hook-form';
import { CounterpartyFormValues } from '../types';

export type CounterpartyCreateFormValues = Pick<
  CounterpartyFormValues,
  'inn' | 'name' | 'isDealer' | 'isLessee' | 'isLessor' | 'isInsuranceCompany'
>;

export type CounterpartyAutocompleteProps = {
  control: Control<CounterpartyCreateFormValues, object>;
  inn: string;
  name: string;
  setInn: (value: string) => void;
  setName: (value: string) => void;
  options: CounterpartyAutocompleteOption[];
  onInnChange: (...event: any[]) => void;
  onNameChange: (...event: any[]) => void;
  helperText?: string;
  invalid?: boolean;
};

export type CounterpartyAutocompleteOption = CounterpartyCreateFormValues & {
  label: string;
};

export const defaultValues: CounterpartyCreateFormValues = {
  inn: '',
  name: '',
  isLessee: false,
  isDealer: false,
  isInsuranceCompany: false,
  isLessor: false,
};
