import { useCallback } from 'react';
import { useUserAuth } from 'services';

export const LogoutButton = () => {
  const { signOutRedirect } = useUserAuth();

  const handleLogout = useCallback(async () => {
    await signOutRedirect();
  }, [signOutRedirect]);

  return (
    <button
      type="button"
      className="button button-svg user-panel-logout"
      onClick={handleLogout}
      tabIndex={0}
    >
      <svg className="svg-icon logout">
        <use xlinkHref="/img/svg-sprite.svg#logout"></use>
      </svg>
    </button>
  );
};
