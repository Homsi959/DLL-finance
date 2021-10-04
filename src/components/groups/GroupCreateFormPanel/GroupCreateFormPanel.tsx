import { useCallback } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { GroupCreateForm } from './GroupCreateForm';
import { useGoBack } from 'hooks';

export const GroupCreateFormPanel = () => {
  const goBack = useGoBack();

  const handleOnClose = useCallback(() => {
    goBack('/users/groups');
  }, [goBack]);

  const handleOnOpen = useCallback(() => {}, []);

  return (
    <SwipeableDrawer anchor="right" open={true} onClose={handleOnClose} onOpen={handleOnOpen}>
      <GroupCreateForm />
    </SwipeableDrawer>
  );
};
