import { useCallback, useState } from 'react';
import { Grid } from '@material-ui/core';
import { NomenclaturesFilterForm } from './NomenclaturesFilterForm';
import { SalesPointsTable } from './SalesPointsTable';
import { Pagination } from 'components';
import { useSalesPointsData } from './useSalesPointsData';
import { ModalForm, useModalForm } from './ModalForm';
import { AddButton } from './AddButton';
import { SalesPointForm } from './SalesPointForm';
import { SalesPoint } from 'schema/serverTypes';

export const SalesPointsDataGrid = () => {
  const { filter, paging, ...dataProps } = useSalesPointsData();
  const { onOpen, onClose, open } = useModalForm();

  const [item, setItem] = useState<SalesPoint>();

  const handleOnOpen = useCallback(
    (item: SalesPoint) => {
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
      <Grid container spacing={1} direction="column">
        <Grid container item justify="space-between" alignItems="center">
          <Grid item>
            <NomenclaturesFilterForm {...filter} />
          </Grid>
          <Grid item>
            <AddButton onClick={onOpen} />
          </Grid>
        </Grid>
        <Grid container item direction="column">
          <Grid item>
            <SalesPointsTable {...dataProps} onOpen={handleOnOpen} />
          </Grid>
          <Grid item>
            <Pagination {...paging} />
          </Grid>
        </Grid>
      </Grid>
      <ModalForm open={open} onClose={handleOnClose}>
        <SalesPointForm onSuccess={handleOnClose} item={item} />
      </ModalForm>
    </>
  );
};
