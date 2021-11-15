import { UseFormReturn } from 'react-hook-form';
import { ContractViewModel, CounterpartyOption } from 'schema/serverTypes';

export type CounterpartyAutocompleteOption = CounterpartyOption;

export type ContractFormValues = Omit<
  ContractViewModel,
  | 'prepaymentPercents'
  | 'prepaymentAmount'
  | 'paymentPercents'
  | 'paymentAmount'
  | 'dealer'
  | 'lessor'
  | 'lessee'
> & {
  prepaymentPercents: string;
  prepaymentAmount: string;
  paymentPercents: string;
  paymentAmount: string;
  dealer?: CounterpartyAutocompleteOption;
  lessor?: CounterpartyAutocompleteOption;
  lessee?: CounterpartyAutocompleteOption;
};

export enum CounterpartyType {
  dealer = 'dealer',
  lessor = 'lessor',
  lessee = 'lessee',
}

export type CounterpartyFormControl = Pick<UseFormReturn<ContractFormValues>, 'control'>['control'];

export type CounterpartyAutocompeteProps = {
  type: CounterpartyType;
  inputValue: string;
  value?: CounterpartyAutocompleteOption;
  setInputValue: (value: string) => void;
  options: CounterpartyAutocompleteOption[];
  onChange: (...event: any[]) => void;
  helperText?: string;
  invalid?: boolean;
};

export function getOptionLabel<TOption extends CounterpartyAutocompleteOption>(option: TOption) {
  return `${option.inn} (${option.name})`;
}

export function getOptionSelected<TOption extends CounterpartyAutocompleteOption>(
  option: TOption,
  value: TOption
) {
  return option.inn === value.inn;
}
