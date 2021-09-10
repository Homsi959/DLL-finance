import { useContext, useCallback } from 'react';
import { Field } from 'react-final-form';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useModelQuery } from '../useModelQuery';
import { useAutocompleteFieldProps } from '../useAutocompleteFieldProps';
import { AutocompleteFieldProps, ChangeCallback } from '../types';
import { ItemValue, NomenclatureContext } from '../NomenclatureContext';
import { useRequiredOnSave } from '../requiredOnSave';
import { useTranslation } from 'react-i18next';

export type ModelAutocompleteProps = AutocompleteFieldProps<true> & {
  brand?: ItemValue;
  category?: ItemValue;
};

const ModelAutocomplete = (props: ModelAutocompleteProps) => {
  const { brand, category, ...other } = props;
  const { onChange, inputValue, resetInputValue, ...rest } = useAutocompleteFieldProps(other);
  const { setItem } = useContext(NomenclatureContext);
  const { options, items } = useModelQuery(brand, category, inputValue);

  const handleOnChange: ChangeCallback = useCallback(
    (event, value, reason, details) => {
      const item = items.find((t) => t.model === value);
      setItem('model', item, value === null ? undefined : value);
      onChange(event, value, reason, details);
    },
    [setItem, items, onChange]
  );

  return (
    <Autocomplete<ItemValue, false, false, false>
      {...rest}
      options={options}
      onChange={handleOnChange}
      inputValue={inputValue}
    />
  );
};

export const ModelAutocompleteField = () => {
  const { requiredOnSave } = useRequiredOnSave();
  const { t } = useTranslation();
  return (
    <Field name="brand">
      {({ input }) => {
        const brand = input.value;
        return (
          <Field name="category">
            {({ input }) => {
              const category = input.value;
              return (
                <Field
                  brand={brand}
                  category={category}
                  name="model"
                  label={t('Model')}
                  component={ModelAutocomplete}
                  validate={requiredOnSave}
                />
              );
            }}
          </Field>
        );
      }}
    </Field>
  );
};
