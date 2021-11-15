import { GroupCreateForm } from './GroupCreateForm';
import { Sidebar } from 'components/Sidebar';

export const GroupCreateFormPanel = () => {
  return (
    <Sidebar url="/users/groups">
      <GroupCreateForm />
    </Sidebar>
  );
};
