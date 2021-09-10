import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AutocompleteFieldProps, AutocompleteFieldDefaultProps } from './types';
import { useAutocompleteTextField } from './useAutocompleteTextField';

export const useAutocompleteFieldProps = <FreeSolo extends boolean | undefined>(
  props: AutocompleteFieldProps<FreeSolo>
) => {
  const {
    input,
    meta,
    label,
    variant = 'outlined',
    placeholder,
    size = 'small',
    autoHighlight = true,
  } = props;
  const { value, onChange } = input;

  const [inputValue, setInputValue] = useState<string>(value ?? input.value ?? '');

  const handleOnInputChange = useCallback(
    (_: React.ChangeEvent<{}>, newInputValue: string) => {
      setInputValue(newInputValue);
    },
    [setInputValue]
  );

  const resetInputValue = useCallback(() => {
    setInputValue('');
  }, [setInputValue]);

  const handleOnChange = useCallback(
    (_: React.ChangeEvent<{}>, newValue: string | null | undefined) => {
      onChange(newValue === null ? undefined : newValue);
    },
    [onChange]
  );

  const { renderInput } = useAutocompleteTextField({
    error: !meta.valid && meta.touched,
    helperText: !meta.valid && meta.touched ? meta.error : null,
    label,
    variant,
    size,
    placeholder,
  });

  const { t } = useTranslation();

  const selectProps: AutocompleteFieldDefaultProps<FreeSolo> = {
    value: value === '' ? null : value,
    onChange: handleOnChange,
    inputValue,
    onInputChange: handleOnInputChange,
    getOptionSelected: (option, value) => option === value,
    noOptionsText: t('ResultsNotFound'),
    openText: t('Open'),
    closeText: t('Close'),
    clearText: t('Clear'),
    renderInput,
    autoHighlight,
    resetInputValue,
  };

  return selectProps;
};
