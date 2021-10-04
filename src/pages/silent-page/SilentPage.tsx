import { useContext, useEffect } from 'react';
import { AuthContext } from 'services/authentication';
import { useHistory } from 'react-router-dom';

export const SilentPage = () => {
  const history = useHistory();
  const context = useContext(AuthContext);
  const user = context?.user;

  useEffect(() => {
    if (user !== null) {
      history.replace('/');
    }
  }, [user, history]);

  return null;
};
