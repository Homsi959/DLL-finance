import { useRequired } from '../validation/required';
import { FormApi } from 'final-form';
import { useFormField } from './useFormField';

export function useRequiredField<T, K extends keyof T>(
  name: K,
  form: FormApi<T>,
  errorMessage: string | undefined = undefined
) {
  const { required } = useRequired(errorMessage);
  return useFormField(name, form, required);
}
