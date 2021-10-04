import { PageAuthenticatedLayout } from 'components';
import { HomePage as HomePageContent } from './HomePage';

export const HomePage = () => {
  return <PageAuthenticatedLayout pageContent={<HomePageContent />} />;
};
