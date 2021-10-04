import { PagedList } from '../pagination';
import { GroupViewModel } from '../groups/types';

export interface UserListResult extends PagedList<UserListViewModel> {}

export interface UserListViewModel {
  id: string;
  userName: string;
  name: string;
  role?: string;
  email: string;
  groups?: GroupViewModel[];
}

export interface UserViewModel {
  id: string;
  userName: string;
  name?: string;
  lastName?: string;
  middleName?: string;
  firstName?: string;
  phoneNumber?: string;
  role?: string;
  groups?: GroupViewModel[];
  ownedGroups?: GroupViewModel[];
}
