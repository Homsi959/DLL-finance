import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import { QuotaOwnerFormSkeleton, QuotaOwnerForm } from './QuotaOwnerForm';
import { useQuotaHistoryQuery } from './useQuotaHistoryQuery';
import { useGoBack } from 'hooks';

export const QuotaOwnerFormPanel = () => {
  const { id } = useParams<{ id: string }>();
  const goBack = useGoBack();

  const handleOnClose = useCallback(() => {
    goBack('/calculator/results');
  }, [goBack]);

  const handleOnOpen = useCallback(() => {}, []);

  const { quota, isLoading } = useQuotaHistoryQuery(id);

  return (
    <SwipeableDrawer anchor="right" open={true} onClose={handleOnClose} onOpen={handleOnOpen}>
      {isLoading || quota === undefined ? (
        <QuotaOwnerFormSkeleton />
      ) : (
        <QuotaOwnerForm quota={quota} />
      )}
    </SwipeableDrawer>
  );
};
