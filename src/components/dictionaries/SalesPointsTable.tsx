import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Table, TableCell, TableHead, TableRow, TableBody } from '@material-ui/core';
import { SalesPoint } from 'schema/serverTypes';
import { EditButton } from './EditButton';
import { useTableStyles } from './useTableStyles';

export type SalesPointsTableProps = {
  rows: SalesPoint[];
  loading: boolean;
  onOpen: (item: SalesPoint) => void;
};

type TableItemProps = {
  item: SalesPoint;
  onOpen: (item: SalesPoint) => void;
};

const TableItem = (props: TableItemProps) => {
  const { item, onOpen } = props;

  const handleOpen = useCallback(() => {
    onOpen(item);
  }, [item, onOpen]);

  return (
    <TableRow>
      <TableCell size="medium">{item.name}</TableCell>
      <TableCell size="medium">
        <EditButton onClick={handleOpen} />
      </TableCell>
    </TableRow>
  );
};

export const SalesPointsTable = (props: SalesPointsTableProps) => {
  const classes = useTableStyles();
  const { rows, onOpen } = props;
  const { t } = useTranslation();

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell size="medium">{t('Name')}</TableCell>
          <TableCell className={classes.change} size="medium"></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((item: SalesPoint, index: number) => (
          <TableItem key={index} item={item} onOpen={onOpen} />
        ))}
      </TableBody>
    </Table>
  );
};
