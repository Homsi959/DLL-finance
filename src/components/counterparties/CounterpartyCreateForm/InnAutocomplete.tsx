import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Autocomplete } from 'components';
import {
  CounterpartyAutocompleteProps,
  CounterpartyAutocompleteOption,
  defaultValues,
} from './types';

const getOptionLabel = (option: CounterpartyAutocompleteOption) => `${option.inn} (${option.name})`;

const getOptionSelected = (
  option: CounterpartyAutocompleteOption,
  value: CounterpartyAutocompleteOption
) => option.inn === value.inn;

export const InnAutocomplete = (props: CounterpartyAutocompleteProps) => {
  const {
    inn: value,
    setInn: setValue,
    options,
    helperText,
    invalid,
    onInnChange,
    onNameChange,
    setName,
  } = props;

  const { t } = useTranslation();

  const handleOnInputChange = useCallback(
    (_ev: React.ChangeEvent<{}>, v: string) => {
      const selected = options.find((t) => t.label === v);
      setValue(selected ? selected?.inn : v);
    },
    [setValue, options]
  );

  const handleOnChange = useCallback(
    (_e: React.ChangeEvent<{}>, option: CounterpartyAutocompleteOption | null) => {
      if (option === null) {
        onInnChange(defaultValues);
      } else {
        onInnChange(option.inn);
        onNameChange(option.name);
        setName(option.name);
      }
    },
    [onInnChange, onNameChange, setName]
  );

  return (
    <Autocomplete<CounterpartyAutocompleteOption>
      label={`${t('Inn')}`}
      options={options}
      inputValue={value}
      onInputChange={handleOnInputChange}
      getOptionLabel={getOptionLabel}
      getOptionSelected={getOptionSelected}
      onChange={handleOnChange}
      error={invalid}
      helperText={helperText}
    />
  );
};
