import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LogoutButton } from 'components';
import { useMeQuery } from 'services/api';

export const Header = () => {
  const { data: profile } = useMeQuery();

  const { t } = useTranslation();

  if (!profile) {
    return null;
  }

  return (
    <div className="user-panel dark-theme">
      <Link className="user-panel-info" to={`/users/view/${profile.id}`}>
        <div className="user-panel-title">{t('Welcome', { profile })}</div>
        <img className="user-panel-avatar" src="/img/avatar.png" alt="avatar.png" />
      </Link>
      <LogoutButton />
    </div>
  );
};
