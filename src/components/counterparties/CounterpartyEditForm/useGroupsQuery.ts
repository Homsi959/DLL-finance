import { GroupViewModel } from 'schema';
import { useCounterpartiesBackendQuery } from 'services';

export const useGroupsQuery = () => {
  return useCounterpartiesBackendQuery<GroupViewModel>('groups', 'currentUserGroups');
};
