import { Dispatch, SetStateAction } from 'react';
import { FormRenderProps } from 'react-final-form';
import { ApplicationRole } from 'schema/serverTypes';

export type FilterFormValues = {
  role?: ApplicationRole;
  search?: string;
};

export type UserFilterFormProps = {
  setRole: Dispatch<SetStateAction<ApplicationRole | undefined>>;
  setSearch: Dispatch<SetStateAction<string | undefined>>;
};

export type UserFilterFormRenderProps = FormRenderProps<
  FilterFormValues,
  Partial<FilterFormValues>
> &
  UserFilterFormProps;
