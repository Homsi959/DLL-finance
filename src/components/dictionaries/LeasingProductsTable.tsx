import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Table, TableCell, TableHead, TableRow, TableBody } from '@material-ui/core';
import { LeasingProductItem } from 'schema/serverTypes';
import { EditButton } from './EditButton';
import { useTableStyles } from './useTableStyles';

export type LeasingProductsTableProps = {
  rows: LeasingProductItem[];
  loading: boolean;
  onOpen: (item: LeasingProductItem) => void;
};

type TableItemProps = {
  item: LeasingProductItem;
  onOpen: (item: LeasingProductItem) => void;
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

export const LeasingProductsTable = (props: LeasingProductsTableProps) => {
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
        {rows.map((item: LeasingProductItem, index: number) => (
          <TableItem key={index} item={item} onOpen={onOpen} />
        ))}
      </TableBody>
    </Table>
  );
};
