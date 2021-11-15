import { GroupUserViewModel } from 'schema/serverTypes';

export type GroupEditFormValues = {
  name: string;
  users: GroupUserViewModel[];
  owner: string;
  lessorInn: string;
};
