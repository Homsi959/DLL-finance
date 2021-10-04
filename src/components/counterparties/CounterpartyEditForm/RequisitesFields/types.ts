import { UseFormReturn } from 'react-hook-form';
import { CounterpartyViewModel } from 'schema';

export type CounterpartyFormProps = Pick<
  UseFormReturn<CounterpartyViewModel>,
  'control' | 'setValue'
>;
