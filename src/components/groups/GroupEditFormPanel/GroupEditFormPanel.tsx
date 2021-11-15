import { useParams } from 'react-router-dom';
import { useGroupQuery } from './useGroupQuery';
import { GroupEditForm, GroupEditFormSkeleton } from './GroupEditForm';
import { Sidebar } from '../../Sidebar';

export const GroupEditFormPanel = () => {
  const { id: idString } = useParams<{ id: string }>();

  const id = Number.parseInt(idString);
  const { group, isLoading } = useGroupQuery(id);

  return (
    <Sidebar url="/users/groups">
      {isLoading || group === undefined ? (
        <GroupEditFormSkeleton />
      ) : (
        <GroupEditForm group={group} />
      )}
    </Sidebar>
  );
};
