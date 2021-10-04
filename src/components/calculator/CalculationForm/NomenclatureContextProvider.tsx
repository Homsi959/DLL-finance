import { ItemKey, ItemState, NomenclatureContext } from './NomenclatureContext';
import { FormFieldsProps } from './fieldGroups/types';
import { useCallback, useMemo } from 'react';
import { NomenclatureItem } from 'schema/serverTypes';
import { useState } from 'react';
import { useEffect } from 'react';

export type NomenclatureContextProviderProps = FormFieldsProps & {
  children: React.ReactNode;
};

const NomenclatureProvider = (props: NomenclatureContextProviderProps) => {
  const { children, form } = props;

  const { change, batch } = form;
  const [state, setState] = useState<ItemState>();

  const setItem = useCallback(
    (key: ItemKey, item?: NomenclatureItem) => {
      if (item) {
        setState({ key, item });
      } else {
        setState(undefined);
      }
    },
    [setState]
  );

  useEffect(() => {
    if (state?.key === 'category') {
      change('brand', state?.item?.brand);
    } else if (state?.key === 'model') {
      change('brand', state?.item?.brand);
      change('category', state?.item?.category);
    }
  }, [state, change]);

  const value = useMemo(() => {
    return {
      item: state,
      setItem,
      batch,
      change,
    };
  }, [state, setItem, change, batch]);

  return <NomenclatureContext.Provider value={value}>{children}</NomenclatureContext.Provider>;
};

export const NomenclatureContextProvider = (props: NomenclatureContextProviderProps) => {
  const { children, form } = props;

  return <NomenclatureProvider form={form}>{children}</NomenclatureProvider>;
};
