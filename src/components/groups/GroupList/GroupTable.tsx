import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IconSprite } from 'components';
import { Table, TableCell, TableHead, TableRow, TableBody } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { palette } from 'theme';
import { GroupOwnersViewModel } from 'schema/serverTypes';
import { useGroupsQuery } from './useGroupsQuery';

export type GroupTableProps = Pick<
  ReturnType<typeof useGroupsQuery>,
  'groups' | 'sorting' | 'loading'
>;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      minWidth: '60px',
    },
  })
);

export const GroupTable = (props: GroupTableProps) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { groups } = props;

  const ItemTable = (props: GroupOwnersViewModel) => {
    const { name, owners, id } = props;
    const groupUrl = `groups/${id}`;

    return (
      <TableRow>
        <TableCell size="medium" width="50%">
          <Link to={groupUrl}>{name}</Link>
        </TableCell>
        <TableCell size="medium" width="50%">
          {owners.length > 0 ? owners[0].name : null}
        </TableCell>
        <TableCell className={classes.button} size="medium">
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
          <TableCell size="medium">{t('Group')}</TableCell>
          <TableCell size="medium">{t('Owner')}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {groups.map((group) => {
          return <ItemTable key={group.id} {...group} />;
        })}
      </TableBody>
    </Table>
  );
};
