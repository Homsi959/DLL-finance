import { useCallback, useState } from 'react';
import { Box, Grid } from '@material-ui/core';
import { NomenclaturesFilterForm } from './NomenclaturesFilterForm';
import { LeasingProductsTable } from './LeasingProductsTable';
import { Pagination } from 'components';
import { useLeasingProductsData } from './useLeasingProductsData';
import { ModalForm, useModalForm } from './ModalForm';
import { AddButton } from './AddButton';
import { LeasingProductForm } from './LeasingProductForm';
import { LeasingProductItem } from 'schema/serverTypes';

export const LeasingProductsDataGrid = () => {
  const { filter, paging, ...dataProps } = useLeasingProductsData();
  const { onOpen, onClose, open } = useModalForm();

  const [item, setItem] = useState<LeasingProductItem>();

  const handleOnOpen = useCallback(
    (item: LeasingProductItem) => {
      setItem(item);
      onOpen();
    },
    [onOpen]
  );

  const handleOnClose = useCallback(() => {
    setItem(undefined);
    onClose();
  }, [onClose]);

  return (
    <>
      <Box display="flex" justifyContent="space-between" mb={2.5} alignItems="flex-end">
        <Box>
          <NomenclaturesFilterForm {...filter} />
        </Box>
        <Box>
          <AddButton onClick={onOpen} />
        </Box>
      </Box>
      <Grid container item direction="column">
        <Grid item>
          <LeasingProductsTable {...dataProps} onOpen={handleOnOpen} />
        </Grid>
        <Grid item>
          <Pagination {...paging} />
        </Grid>
      </Grid>
      <ModalForm open={open} onClose={handleOnClose}>
        <LeasingProductForm onSuccess={handleOnClose} item={item} />
      </ModalForm>
    </>
  );
};
