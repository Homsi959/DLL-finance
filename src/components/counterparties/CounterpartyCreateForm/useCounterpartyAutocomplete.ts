import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
} from '@material-ui/lab/useAutocomplete';
import { useCallback, useState } from 'react';
import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CounterpartyFormValues } from '../types';
import { CounterpartyFormProps, defaultValues } from './types';
import { useCounterpartySearchQuery } from './useCounterpartySearchQuery';
import { CounterpartyViewModel } from 'schema/serverTypes';
import { useCounterpartiesBackendQuery } from 'services';

const getInnOptionLabel = (option: CounterpartyAutocompleteOption) => option.inn;
const getNameOptionLabel = (option: CounterpartyAutocompleteOption) => option.name;

const renderOption = (option: CounterpartyAutocompleteOption, state: object) => {
  return option.label;
};

const getOptionSelected = (
  option: CounterpartyAutocompleteOption,
  value: CounterpartyAutocompleteOption
) => option.inn === value.inn;

export type CounterpartyAutocompleteOption = Pick<CounterpartyViewModel, 'inn' | 'name'> & {
  label: string;
};

const createOption = ({ inn, name }: CounterpartyViewModel): CounterpartyAutocompleteOption => {
  return {
    inn,
    name,
    label: `${inn} (${name})`,
  };
};

type UseAutocompleteFieldProps = CounterpartyFormProps & {
  name: 'inn' | 'name';
};

const useAutocompleteField = (props: UseAutocompleteFieldProps) => {
  const { control, name } = props;
  const { t } = useTranslation();

  const {
    field,
    fieldState: { invalid, error },
  } = useController<CounterpartyFormValues, typeof name>({
    control,
    name,
    rules: {
      required: {
        value: true,
        message: t('Required'),
      },
    },
  });

  const [input, setInput] = useState('');
  const { data: innData = [] } = useCounterpartySearchQuery(input);
  const options = innData.map(createOption);

  return {
    field,
    error: invalid,
    helperText: error?.message,
    input,
    setInput,
    options,
  };
};

export const useCounterpartyAutocomplete = (props: CounterpartyFormProps) => {
  const {
    field: { value: inn },
    setInput: setInnInput,
    ...innField
  } = useAutocompleteField({ ...props, name: 'inn' });
  const {
    field: { value: name },
    setInput: setNameInput,
    ...nameField
  } = useAutocompleteField({ ...props, name: 'name' });

  let innOptions = innField.options;
  let nameOptions = nameField.options;

  if (inn && inn !== '' && innOptions.find((t) => t.inn === inn) === undefined) {
    innOptions = [{ inn, name, label: `${inn} (${name})` }, ...innOptions];
  }

  if (name && name !== '' && nameOptions.find((t) => t.inn === inn) === undefined) {
    nameOptions = [{ inn, name, label: `${inn} (${name})` }, ...nameOptions];
  }

  const onInnInputChange = useCallback(
    (_ev: React.ChangeEvent<{}>, v: string) => {
      const selected = innOptions.find((t) => t.label === v);
      setInnInput(selected ? selected?.inn : v);
    },
    [setInnInput, innOptions]
  );

  const { reset } = props;

  const onInnChange = useCallback(
    (
      _e: React.ChangeEvent<{}>,
      value: CounterpartyAutocompleteOption | null,
      reason: AutocompleteChangeReason,
      _details?: AutocompleteChangeDetails<CounterpartyAutocompleteOption | null>
    ) => {
      const values = reason === 'clear' || value === null ? defaultValues : value;
      reset(values);
      setInnInput(values.inn);
      setNameInput(values.name);
    },
    [reset, setInnInput, setNameInput]
  );

  const onNameInputChange = useCallback(
    (_ev: React.ChangeEvent<{}>, v: string) => {
      const selected = nameOptions.find((t) => t.label === v);
      setNameInput(selected ? selected?.inn : v);
    },
    [setNameInput, nameOptions]
  );

  const onNameChange = useCallback(
    (
      _e: React.ChangeEvent<{}>,
      value: CounterpartyAutocompleteOption | null,
      reason: AutocompleteChangeReason,
      _details?: AutocompleteChangeDetails<CounterpartyAutocompleteOption | null>
    ) => {
      const values = reason === 'clear' || value === null ? defaultValues : value;
      reset(values);
      setInnInput(values.inn);
      setNameInput(values.name);
    },
    [reset, setInnInput, setNameInput]
  );

  const requestUrl = `external/${inn}`;
  useCounterpartiesBackendQuery<CounterpartyViewModel>(requestUrl, requestUrl, {
    enabled: inn !== '',
    refetchInterval: false,
    refetchOnWindowFocus: false,
    onSuccess: (counterparty) => {
      reset(counterparty);
    },
  });

  return {
    inn: {
      ...innField,
      options: innOptions,
      onInputChange: onInnInputChange,
      onChange: onInnChange,
      value: innOptions.find((t) => t.inn === inn) ?? null,
      getOptionLabel: getInnOptionLabel,
      getOptionSelected,
      renderOption,
    },
    name: {
      ...nameField,
      options: nameOptions,
      onInputChange: onNameInputChange,
      onChange: onNameChange,
      value: innOptions.find((t) => t.inn === inn) ?? null,
      getOptionLabel: getNameOptionLabel,
      getOptionSelected,
      renderOption,
    },
  };
};
