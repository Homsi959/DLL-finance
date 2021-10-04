import { useContext, useCallback } from 'react';
import { Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useCategoryQuery } from '../useCategoryQuery';
import { useAutocompleteFieldProps } from '../useAutocompleteFieldProps';
import { AutocompleteFieldProps, ChangeCallback } from '../types';
import { ItemValue, NomenclatureContext } from '../NomenclatureContext';
import { useRequiredOnSave } from '../requiredOnSave';
import { useTranslation } from 'react-i18next';

export type CategoryAutocompleteProps = AutocompleteFieldProps & {
  brand?: ItemValue;
};

const CategoryAutocomplete = (props: CategoryAutocompleteProps) => {
  const { brand, ...other } = props;
  const { change, setItem, item } = useContext(NomenclatureContext);
  const { resetInputValue, onChange, inputValue, ...rest } = useAutocompleteFieldProps(other);
  const { options, items } = useCategoryQuery(brand, inputValue);

  const handleOnChange: ChangeCallback = useCallback(
    (event, value, reason, details) => {
      const item = items.find((t) => t.category === value);
      setItem('category', item, value === null ? undefined : value);
      onChange(event, value, reason, details);
    },
    [setItem, items, onChange]
  );

  return (
    <>
      <Autocomplete<string | undefined, false, false, false>
        {...rest}
        options={options}
        onChange={handleOnChange}
        inputValue={inputValue}
      />
      <OnChange name="brand">
        {(value: ItemValue) => {
          if (item?.key === 'brand' || value === '') {
            change('category', undefined);
            resetInputValue();
          }
        }}
      </OnChange>
    </>
  );
};

export const CategoryAutocompleteField = () => {
  const { requiredOnSave } = useRequiredOnSave();
  const { t } = useTranslation();
  return (
    <Field name="brand">
      {({ input }) => {
        return (
          <Field
            name="category"
            label={t('VehicleType')}
            component={CategoryAutocomplete}
            brand={input.value}
            validate={requiredOnSave}
          />
        );
      }}
    </Field>
  );
};
