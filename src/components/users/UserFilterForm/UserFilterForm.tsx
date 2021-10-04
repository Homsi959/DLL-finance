import { FormApi } from 'final-form';
import { AutoFocusedForm } from 'components/form/AutoFocusedForm';
import { UserFilterFormInner } from './UserFilterFormInner';
import { FilterFormValues, UserFilterFormProps } from './types';

const initialValues: Partial<FilterFormValues> = {};

const onSubmit = (
  _values: FilterFormValues,
  _form: FormApi<FilterFormValues, Partial<FilterFormValues>>
) => {
  return Promise.resolve();
};

export const UserFilterForm = (props: UserFilterFormProps) => {
  return (
    <AutoFocusedForm onSubmit={onSubmit} initialValues={initialValues}>
      {(formProps) => {
        return <UserFilterFormInner {...props} {...formProps} />;
      }}
    </AutoFocusedForm>
  );
};
