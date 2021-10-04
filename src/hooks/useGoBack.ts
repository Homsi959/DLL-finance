import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

export const useGoBack = () => {
  const history = useHistory();

  return useCallback(
    (url?: string) => {
      if (history.action !== 'POP') {
        history.goBack();
      } else {
        history.push(url ?? '/');
      }
    },
    [history]
  );
};
