import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { useUserQuery } from './useUserQuery';
import { UserEditForm, UserEditFormSkeleton } from './UserEditForm';
import { useGoBack } from 'hooks';

export const UserEditFormPanel = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isLoading } = useUserQuery(id);

  const goBack = useGoBack();

  const handleOnClose = useCallback(() => {
    goBack('/users');
  }, [goBack]);

  const handleOnOpen = useCallback(() => {}, []);

  return (
    <SwipeableDrawer anchor="right" open={true} onClose={handleOnClose} onOpen={handleOnOpen}>
      {isLoading || user === undefined ? <UserEditFormSkeleton /> : <UserEditForm user={user} />}
    </SwipeableDrawer>
  );
};
