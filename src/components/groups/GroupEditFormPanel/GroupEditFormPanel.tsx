import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { useGroupQuery } from './useGroupQuery';
import { GroupEditForm, GroupEditFormSkeleton } from './GroupEditForm';
import { useGoBack } from 'hooks';

export const GroupEditFormPanel = () => {
  const { id: idString } = useParams<{ id: string }>();

  const id = Number.parseInt(idString);
  const { group, isLoading } = useGroupQuery(id);

  const goBack = useGoBack();

  const handleOnClose = useCallback(() => {
    goBack('/users/groups');
  }, [goBack]);

  const handleOnOpen = useCallback(() => {}, []);

  return (
    <SwipeableDrawer anchor="right" open={true} onClose={handleOnClose} onOpen={handleOnOpen}>
      {isLoading || group === undefined ? (
        <GroupEditFormSkeleton />
      ) : (
        <GroupEditForm group={group} />
      )}
    </SwipeableDrawer>
  );
};
