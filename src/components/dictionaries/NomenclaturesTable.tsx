import { useCallback } from 'react';
import { NomenclatureItem } from 'schema/serverTypes';
import { useTranslation } from 'react-i18next';
import { Table, TableCell, TableHead, TableRow, TableBody } from '@material-ui/core';
import { EditButton } from './EditButton';
import { useTableStyles } from './useTableStyles';

export type NomenclaturesTableProps = {
  rows: NomenclatureItem[];
  loading: boolean;
  onOpen: (item: NomenclatureItem) => void;
};

type TableItemProps = {
  item: NomenclatureItem;
  onOpen: (item: NomenclatureItem) => void;
};

const TableItem = (props: TableItemProps) => {
  const { item, onOpen } = props;

  const handleOpen = useCallback(() => {
    onOpen(item);
  }, [item, onOpen]);

  return (
    <TableRow>
      <TableCell size="medium">{item.vendor}</TableCell>
      <TableCell size="medium">{item.brand}</TableCell>
      <TableCell size="medium">{item.category}</TableCell>
      <TableCell size="medium">{item.model}</TableCell>
      <TableCell size="medium">
        <EditButton onClick={handleOpen} />
      </TableCell>
    </TableRow>
  );
};

export const NomenclaturesTable = (props: NomenclaturesTableProps) => {
  const classes = useTableStyles();
  const { rows, onOpen } = props;
  const { t } = useTranslation();

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell size="medium">{t('Vendor')}</TableCell>
          <TableCell size="medium">{t('Brand')}</TableCell>
          <TableCell size="medium">{t('Category')}</TableCell>
          <TableCell size="medium">{t('Model')}</TableCell>
          <TableCell className={classes.change} size="medium"></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((item: NomenclatureItem, index: number) => (
          <TableItem key={index} item={item} onOpen={onOpen} />
        ))}
      </TableBody>
    </Table>
  );
};
