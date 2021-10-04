import { PageAuthenticatedLayout } from 'components';
import { CalculatorPage as CalculatorPageContent } from './CalculatorPage';

export const CalculatorPage = () => {
  return <PageAuthenticatedLayout pageContent={<CalculatorPageContent />} />;
};
