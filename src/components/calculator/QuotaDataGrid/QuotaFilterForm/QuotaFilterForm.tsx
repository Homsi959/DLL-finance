import { FormApi } from 'final-form';
import { AutoFocusedForm } from 'components/form/AutoFocusedForm';
import { QuotaFilterFormInner } from './QuotaFilterFormInner';
import { FilterFormValues, QuotaFilterFormProps } from './types';

const initialValues: Partial<FilterFormValues> = {};

const onSubmit = (
  _values: FilterFormValues,
  _form: FormApi<FilterFormValues, Partial<FilterFormValues>>
) => {
  return Promise.resolve();
};

export const QuotaFilterForm = (props: QuotaFilterFormProps) => {
  return (
    <AutoFocusedForm onSubmit={onSubmit} initialValues={initialValues}>
      {(formProps) => {
        return <QuotaFilterFormInner {...props} {...formProps} />;
      }}
    </AutoFocusedForm>
  );
};
