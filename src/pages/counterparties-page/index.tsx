import { PageAuthenticatedLayout } from 'components';
import { CounterpartiesPage as CounterpartiesPageContent } from './CounterpartiesPage';

export const CounterpartiesPage = () => {
  return <PageAuthenticatedLayout pageContent={<CounterpartiesPageContent />} />;
};
