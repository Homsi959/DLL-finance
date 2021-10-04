import { useField } from 'react-final-form-hooks';
import { FormApi, FieldValidator } from 'final-form';

export function useFormField<T, K extends keyof T>(
  name: K,
  form: FormApi<T>,
  validate?: FieldValidator<any> | undefined
) {
  return useField(name as string, form, validate);
}
