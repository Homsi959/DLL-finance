import { Control } from 'react-hook-form';

export type SearchFilterFormValues = {
  search?: string;
};

export type NomenclaturesFilterFormProps = {
  control: Control<SearchFilterFormValues, object>;
  handleOnReset: () => void;
};
