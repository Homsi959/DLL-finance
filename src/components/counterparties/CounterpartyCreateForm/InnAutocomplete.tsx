import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
} from '@material-ui/lab/useAutocomplete';
import { Autocomplete } from 'components/Autocomplete';
import { useCallback, useEffect, useState } from 'react';
import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CounterpartyFormValues } from '../types';
import { CounterpartyFormProps, defaultValues } from './types';
import { useCounterpartySearchQuery } from './useCounterpartySearchQuery';
import { CounterpartyViewModel } from 'schema/serverTypes';
import { useCounterpartiesBackendQuery } from 'services';

export type InnAutocompleteProps = CounterpartyFormProps;

type CounterpartyAutocompleteOption = Pick<CounterpartyViewModel, 'inn' | 'name'>;

const getOptionLabel = (option: CounterpartyAutocompleteOption) => `${option.inn} (${option.name})`;

const getOptionSelected = (
  option: CounterpartyAutocompleteOption,
  value: CounterpartyAutocompleteOption
) => option.inn === value.inn;

export const InnAutocomplete = (props: InnAutocompleteProps) => {
  const { reset, control } = props;

  const [input, setInput] = useState('');
  const { data: innData = [] } = useCounterpartySearchQuery(input);
  const options = innData.map(({ inn, name }) => ({
    inn,
    name,
    label: `${inn} (${name})`,
  }));

  const {
    field: { value: inn },
    fieldState: { invalid, error },
  } = useController<CounterpartyFormValues, 'inn'>({
    control,
    name: 'inn',
  });

  const requestUrl = `external/${inn}`;

  const { data: counterparty, isLoading } = useCounterpartiesBackendQuery<CounterpartyViewModel>(
    requestUrl,
    requestUrl,
    {
      enabled: !invalid && inn !== '',
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (isLoading) {
      return;
    }
    reset(counterparty);
  }, [counterparty, isLoading, reset]);

  const handleOnInputChange = useCallback(
    (_ev: React.ChangeEvent<{}>, v: string) => {
      const selected = options.find((t) => t.label === v);
      setInput(selected ? selected?.inn : v);
    },
    [setInput, options]
  );

  const handleOnChange = useCallback(
    (
      _e: React.ChangeEvent<{}>,
      value: CounterpartyAutocompleteOption | null,
      reason: AutocompleteChangeReason,
      _details?: AutocompleteChangeDetails<CounterpartyAutocompleteOption | null>
    ) => {
      const values = reason === 'clear' || value === null ? defaultValues : value;
      reset(values);
    },
    [reset]
  );

  const { t } = useTranslation();

  return (
    <>
      <Autocomplete<CounterpartyAutocompleteOption>
        label={`${t('Inn')}`}
        options={options}
        inputValue={input}
        onInputChange={handleOnInputChange}
        getOptionLabel={getOptionLabel}
        getOptionSelected={getOptionSelected}
        onChange={handleOnChange}
        error={invalid}
        helperText={error?.message}
      />
    </>
  );
};
