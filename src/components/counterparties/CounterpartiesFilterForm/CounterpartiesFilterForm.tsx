import { FormApi } from 'final-form';
import { AutoFocusedForm } from 'components/form/AutoFocusedForm';
import { CounterpartiesFilterFormInner } from './CounterpartiesFilterFormInner';
import { FilterFormValues, CounterpartyFilterFormProps } from './types';

const initialValues: Partial<FilterFormValues> = {};

const onSubmit = (
  _values: FilterFormValues,
  _form: FormApi<FilterFormValues, Partial<FilterFormValues>>
) => {
  return Promise.resolve();
};

export const CounterpartiesFilterForm = (props: CounterpartyFilterFormProps) => {
  return (
    <AutoFocusedForm onSubmit={onSubmit} initialValues={initialValues}>
      {(formProps) => {
        return <CounterpartiesFilterFormInner {...props} {...formProps} />;
      }}
    </AutoFocusedForm>
  );
};
