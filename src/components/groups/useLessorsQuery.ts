import { Lessor } from 'schema/serverTypes';
import { useCounterpartiesBackendQuery } from 'services/api';

export const useLessorsQuery = () => {
  return useCounterpartiesBackendQuery<Lessor[]>('lessors', 'counterparties/lessors');
};
