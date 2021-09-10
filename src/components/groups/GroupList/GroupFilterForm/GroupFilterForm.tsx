import { FormApi } from 'final-form';
import { AutoFocusedForm } from 'components/form/AutoFocusedForm';
import { GroupFilterFormInner } from './GroupFilterFormInner';
import { FilterFormValues, GroupFilterFormProps } from './types';

const initialValues: Partial<FilterFormValues> = {};

const onSubmit = (
  _values: FilterFormValues,
  _form: FormApi<FilterFormValues, Partial<FilterFormValues>>
) => {
  return Promise.resolve();
};

export const GroupFilterForm = (props: GroupFilterFormProps) => {
  return (
    <AutoFocusedForm onSubmit={onSubmit} initialValues={initialValues}>
      {(formProps) => {
        return <GroupFilterFormInner {...props} {...formProps} />;
      }}
    </AutoFocusedForm>
  );
};
