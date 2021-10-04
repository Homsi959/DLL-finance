import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { useUserAuth } from 'services';

export const LoginButton = () => {
  const history = useHistory();
  const { signIn } = useUserAuth();

  const handleLogin = useCallback(async () => {
    await signIn({
      returnUrl: history.location.pathname,
    });
  }, [signIn, history]);

  const { t } = useTranslation();

  return (
    <button type="button" className="button button-primary" onClick={handleLogin}>
      {t('Login')}
    </button>
  );
};
