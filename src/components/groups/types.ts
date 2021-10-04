import { PagedList } from '../pagination';

export interface GroupListResult extends PagedList<GroupOwnersViewModel> {}

export interface GroupViewModel {
  id: number;
  name: string;
}

export interface GroupUserViewModel {
  id: string;
  userName: string;
  name: string;
}

export interface GroupOwnersViewModel extends GroupViewModel {
  owners: GroupUserViewModel;
}

export interface GroupUsersViewModel extends GroupOwnersViewModel {
  users: GroupUserViewModel[];
}

export type GroupUser = GroupUserViewModel;

export interface GroupEditFormValues {
  name: string;
  users: GroupUser[];
  owners: GroupUser;
}
