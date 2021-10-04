import { createContext } from 'react';
import { NomenclatureItem } from 'schema';
import { CalculationFormValues } from '../types';

export type ItemValue = string | undefined;
export type ItemKey = keyof Pick<CalculationFormValues, 'brand' | 'category' | 'model'>;

export type ItemState = {
  key: ItemKey;
  item: NomenclatureItem;
};

export type NomenclatureContextProps = {
  item?: ItemState;
  setItem: (property: ItemKey, item?: NomenclatureItem, value?: ItemValue) => void;
  change: (name: ItemKey, value?: ItemValue) => void;
  batch: (fn: () => void) => void;
};

const setItem = (_property: ItemKey, _item?: NomenclatureItem, _value?: ItemValue) => {};

const defaulContextProps: NomenclatureContextProps = {
  setItem,
  change: (_name: ItemKey, _value?: ItemValue) => {},
  batch: (_fn: () => void) => {},
};

export const NomenclatureContext = createContext<NomenclatureContextProps>(defaulContextProps);
