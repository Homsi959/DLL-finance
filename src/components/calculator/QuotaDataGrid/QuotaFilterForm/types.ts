import { Dispatch, SetStateAction } from 'react';
import { FormRenderProps } from 'react-final-form';

export type FilterFormValues = {
  dealer?: string;
  lessee?: string;
  search?: string;
  ownerId?: string;
};

export type QuotaFilterFormProps = {
  tabIndex?: number;
  setLessee: Dispatch<SetStateAction<string | undefined>>;
  setDealer: Dispatch<SetStateAction<string | undefined>>;
  setSearch: Dispatch<SetStateAction<string | undefined>>;
  setOwnerId: Dispatch<SetStateAction<string | undefined>>;
};

export type FilterFormRenderProps = FormRenderProps<FilterFormValues, Partial<FilterFormValues>> &
  QuotaFilterFormProps;
