import { FormApi } from 'final-form';
import { CalculationFormValues } from '../../types';

export type FormFieldsProps = {
  form: FormApi<CalculationFormValues, Partial<CalculationFormValues>>;
};
