import { PagedList } from 'components';
import { CounterpartyListViewModel, CounterpartyViewModel } from 'schema';

export type CounterpartyListResult = PagedList<CounterpartyListViewModel>;

export type CounterpartyFormValues = CounterpartyViewModel;
