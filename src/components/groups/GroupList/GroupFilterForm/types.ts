import { Dispatch, SetStateAction } from 'react';
import { FormRenderProps } from 'react-final-form';

export type FilterFormValues = {
  search?: string;
};

export type GroupFilterFormProps = {
  setSearch: Dispatch<SetStateAction<string | undefined>>;
};

export type GroupFilterFormRenderProps = FormRenderProps<
  FilterFormValues,
  Partial<FilterFormValues>
> &
  GroupFilterFormProps;
