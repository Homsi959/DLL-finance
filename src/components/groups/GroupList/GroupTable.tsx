import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IconSprite } from 'components';
import { GroupOwnersViewModel } from '../types';
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  TableSortLabel,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { palette } from 'theme';

export interface GroupTableGridProps {
  groups: GroupOwnersViewModel[];
  loading: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      minWidth: '60px',
    },
  })
);

export const GroupTable = (props: GroupTableGridProps) => {
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
          {owners?.name}
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
          <TableCell size="medium">
            <TableSortLabel IconComponent={ArrowDropDownIcon}>{t('Group')}</TableSortLabel>
          </TableCell>
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
