import { Dispatch, SetStateAction } from 'react';
import { FormRenderProps } from 'react-final-form';
import { CounterpartyType } from 'schema/serverTypes';

export type FilterFormValues = {
  type?: CounterpartyType;
  search?: string;
};

export type CounterpartyFilterFormProps = {
  setSearch: Dispatch<SetStateAction<string | undefined>>;
  setType: Dispatch<SetStateAction<CounterpartyType | undefined>>;
};

export type CounterpartyFilterFormRenderProps = FormRenderProps<
  FilterFormValues,
  Partial<FilterFormValues>
> &
  CounterpartyFilterFormProps;
