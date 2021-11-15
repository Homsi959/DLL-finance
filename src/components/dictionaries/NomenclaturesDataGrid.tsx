import { useCallback, useState } from 'react';
import { Box, Grid } from '@material-ui/core';
import { Pagination } from 'components';
import { useNomenclaturesData } from './useNomenclaturesData';
import { NomenclaturesFilterForm } from './NomenclaturesFilterForm';
import { NomenclaturesTable } from './NomenclaturesTable';
import { ModalForm, useModalForm } from './ModalForm';
import { AddButton } from './AddButton';
import { NomenclatureForm } from './NomenclatureForm';
import { NomenclatureItem } from 'schema/serverTypes';

export const NomenclaturesDataGrid = () => {
  const { filter, paging, ...dataProps } = useNomenclaturesData();
  const { onOpen, onClose, open } = useModalForm();

  const [item, setItem] = useState<NomenclatureItem>();

  const handleOnOpen = useCallback(
    (item: NomenclatureItem) => {
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
      <Grid container direction="column">
        <Grid item>
          <NomenclaturesTable {...dataProps} onOpen={handleOnOpen} />
        </Grid>
        <Grid item>
          <Pagination {...paging} />
        </Grid>
      </Grid>
      <ModalForm open={open} onClose={handleOnClose}>
        <NomenclatureForm onSuccess={handleOnClose} item={item} />
      </ModalForm>
    </>
  );
};
