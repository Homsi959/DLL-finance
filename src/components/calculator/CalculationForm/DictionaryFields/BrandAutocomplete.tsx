import { useContext, useCallback } from 'react';
import { Field } from 'react-final-form';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useBrandQuery } from '../useBrandQuery';
import { useAutocompleteFieldProps } from '../useAutocompleteFieldProps';
import { AutocompleteFieldProps, ChangeCallback } from '../types';
import { NomenclatureContext } from '../NomenclatureContext';
import { useRequiredOnSave } from '../requiredOnSave';
import { useTranslation } from 'react-i18next';

type BrandAutocompleteProps = AutocompleteFieldProps;

const BrandAutocomplete = (props: BrandAutocompleteProps) => {
  const { onChange, resetInputValue, ...rest } = useAutocompleteFieldProps(props);
  const { options, items } = useBrandQuery();
  const { setItem } = useContext(NomenclatureContext);

  const handleOnChange: ChangeCallback = useCallback(
    (event, value, reason, details) => {
      const item = items.find((t) => t.brand === value);
      setItem('brand', item, value === null ? undefined : value);
      onChange(event, value, reason, details);
    },
    [setItem, items, onChange]
  );

  return (
    <Autocomplete<string | undefined, false, false, false>
      {...rest}
      options={options}
      onChange={handleOnChange}
    />
  );
};

export const BrandAutocompleteField = () => {
  const { requiredOnSave } = useRequiredOnSave();
  const { t } = useTranslation();
  return (
    <Field
      name="brand"
      label={t('Brand')}
      component={BrandAutocomplete}
      validate={requiredOnSave}
    />
  );
};
