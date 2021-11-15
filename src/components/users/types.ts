import { GroupViewModel } from 'schema/serverTypes';
import { PagedList } from '../pagination';

export type UserListResult = PagedList<UserListViewModel>;

export type UserListViewModel = {
  id: string;
  userName: string;
  name: string;
  role?: string;
  email: string;
  groups?: GroupViewModel[];
};

export type UserViewModel = {
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
  leasingPrograms: string[];
  salesPoints: string[];
};
