import { Link, useLocation } from 'react-router-dom';
import { UserListViewModel } from './types';
import { ApplicationRoles } from 'services';
import { useTranslation } from 'react-i18next';
import { Avatar, IconSprite } from 'components';
import { palette } from '../../theme';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Typography,
  Theme,
} from '@material-ui/core';
import { Link as MuiLink } from '@material-ui/core';

export interface UserTableProps {
  users: UserListViewModel[];
  loading: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      width: '60px',
    },
    avatar: {
      width: '60px',
      '& .MuiAvatar-root': {
        marginTop: theme.spacing(-1.3),
      },
    },
  })
);

export const UserTable = (props: UserTableProps) => {
  const classes = useStyles();
  const { users } = props;
  const { t } = useTranslation();
  const { search } = useLocation();

  const ItemTable = (props: UserListViewModel) => {
    const { name, id, email, role, groups } = props;
    const groupUrl = `/users/view/${id}${search}`;

    return (
      <TableRow>
        <TableCell className={classes.avatar} size="medium">
          <Avatar size="medium" />
        </TableCell>
        <TableCell size="medium">
          <Link to={`/users/view/${id}${search}`}>{name}</Link>
        </TableCell>
        <TableCell size="medium">
          <Typography>{ApplicationRoles.getRoleName(role)}</Typography>
        </TableCell>
        <TableCell>
          <ul>
            {groups?.map((group) => (
              <li key={group.id}>{group.name}</li>
            ))}
          </ul>
        </TableCell>
        <TableCell>
          <MuiLink href={`mailto:${email}`}>{email}</MuiLink>
        </TableCell>
        <TableCell className={classes.button}>
          <Link to={groupUrl}>
            <IconSprite
              width="14px"
              color={palette.textGrey2.main}
              hoverColor={palette.primary.main}
              icon="edit"
            />
          </Link>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell size="medium"></TableCell>
          <TableCell size="medium">{t('FullName')}</TableCell>
          <TableCell size="medium">{t('UserType')}</TableCell>
          <TableCell size="medium">{t('Group_plural')}</TableCell>
          <TableCell size="medium">{t('Email')}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user) => (
          <ItemTable key={user.id} {...user} />
        ))}
      </TableBody>
    </Table>
  );
};
