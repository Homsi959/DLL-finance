import { PagedList } from 'components';
import { CounterpartyListViewModel, CounterpartyViewModel, Head } from 'schema/serverTypes';
import { useCounterpartiesData } from './useCounterpartiesData';

export type CounterpartyListResult = PagedList<CounterpartyListViewModel>;

export type CounterpartyGroupViewModel = {
  id: number;
  checked: boolean;
};

export type HeadViewModel = Omit<Head, 'id'> & {
  headId: number;
};

export type CounterpartyFormValues = Omit<CounterpartyViewModel, 'groups' | 'heads'> & {
  groups: CounterpartyGroupViewModel[];
  heads: HeadViewModel[];
};

export type CounterpartiesDataReturn = ReturnType<typeof useCounterpartiesData>;
