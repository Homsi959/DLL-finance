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

export const NameAutocomplete = (props: CounterpartyAutocompleteProps) => {
  const {
    setName: setValue,
    name: value,
    options,
    onInnChange,
    onNameChange,
    helperText,
    invalid,
    setInn,
  } = props;

  const { t } = useTranslation();

  const handleOnInputChange = useCallback(
    (_ev: React.ChangeEvent<{}>, v: string) => {
      const selected = options.find((t) => t.label === v);
      setValue(selected ? selected?.name : v);
    },
    [setValue, options]
  );

  const handleOnChange = useCallback(
    (_e: React.ChangeEvent<{}>, option: CounterpartyAutocompleteOption | null) => {
      if (option === null) {
        onNameChange(defaultValues);
      } else {
        onNameChange(option.name);
        onInnChange(option.inn);
        setInn(option.inn);
      }
    },
    [onNameChange, onInnChange, setInn]
  );

  return (
    <Autocomplete<CounterpartyAutocompleteOption>
      label={`${t('AbbreviatedName')}`}
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
