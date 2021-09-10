import { Link, useLocation } from 'react-router-dom';
import { UserTableRowSkeleton } from './UserTableRowSkeleton';
import { UserListViewModel } from './types';
import { ApplicationRoles } from 'services';
import { useTranslation } from 'react-i18next';

export interface UserTableProps {
  users: UserListViewModel[];
  loading: boolean;
}

export const UserTable = (props: UserTableProps) => {
  const { users, loading } = props;

  const { search } = useLocation();

  const rows = loading
    ? null
    : users.map((user) => {
        const userUrl = `/users/view/${user.id}${search}`;
        return (
          <tr key={user.id} className="result-list-item">
            <td>
              <Link to={userUrl}>{user.name}</Link>
            </td>
            <td>{ApplicationRoles.getRoleName(user.role)}</td>
            <td>
              <ul>
                {user.groups?.map((group) => {
                  return <li key={group.id}>{group.name}</li>;
                })}
              </ul>
            </td>
            <td>{user.userName}</td>
            <td>{user.email}</td>
          </tr>
        );
      });

  const { t } = useTranslation();

  return (
    <table className="calc-results">
      <thead>
        <tr>
          <th>{t('LastFirstMiddleName')}</th>
          <th>{t('UserType')}</th>
          <th>{t('Group')}</th>
          <th>{t('Login')}</th>
          <th>{t('Email')}</th>
        </tr>
      </thead>
      <tbody>
        {loading && <UserTableRowSkeleton />}
        {!loading && users.length === 0 && (
          <tr className="not-found">
            <td colSpan={8}>{t('SearchNotFound')}</td>
          </tr>
        )}
        {rows}
      </tbody>
    </table>
  );
};
