import { PageAuthenticatedLayout } from 'components';
import { NomenclaturesPage as NomenclaturesPageContent } from './NomenclaturesPage';

export const NomenclaturesPage = () => {
  return <PageAuthenticatedLayout pageContent={<NomenclaturesPageContent />} />;
};
