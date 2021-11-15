import { useParams } from 'react-router-dom';
import { useUserQuery } from './useUserQuery';
import { UserEditForm, UserEditFormSkeleton } from './UserEditForm';
import { Sidebar } from 'components/Sidebar';

export const UserEditFormPanel = ({ id }: { id: string }) => {
  const { id: userId } = useParams<{ id: string }>();

  const { user, isLoading } = useUserQuery(id || userId);

  return (
    <Sidebar url="/users">
      {isLoading || user === undefined ? <UserEditFormSkeleton /> : <UserEditForm user={user} />}
    </Sidebar>
  );
};
