import { useCallback, useRef, useState } from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteInputChangeReason,
  Value,
} from '@material-ui/lab/useAutocomplete';
import { useCounterpartyQuery } from './useCounterpartyQuery';
import { FieldValidator, TextFieldProps } from '../../types';
import { CounterpartyOption, CounterpartyType } from 'schema';
import { useAutocompleteTextField } from '../../useAutocompleteTextField';
import { useMemo } from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

type CounterpartyAutocompleteProps = FieldRenderProps<string | undefined, HTMLElement> &
  Omit<TextFieldProps, 'error' | 'helperText'> & {
    counterpartyType: CounterpartyType;
    label: string;
    disabled?: boolean;
    setFirstOptionAsDefault?: boolean;
  };

type ChangeCallback = (
  event: React.ChangeEvent<{}>,
  value: Value<CounterpartyOption, false, false, false>,
  reason: AutocompleteChangeReason,
  details?: AutocompleteChangeDetails<CounterpartyOption>
) => void;

const CounterpartyAutocomplete = (props: CounterpartyAutocompleteProps) => {
  const {
    counterpartyType,
    label,
    input,
    meta,
    variant = 'outlined',
    size = 'small',
    placeholder,
    disabled,
    setFirstOptionAsDefault = false,
  } = props;
  const { value, onChange } = input;
  const [inputValue, setInputValue] = useState<string>('');
  const shouldFetchOptions = useRef<boolean>(true);

  const handleOnInputChange = useCallback(
    (_: React.ChangeEvent<{}>, newInputValue: string, reason: AutocompleteInputChangeReason) => {
      shouldFetchOptions.current = reason !== 'reset';
      setInputValue(newInputValue);
    },
    [setInputValue]
  );

  const { renderInput } = useAutocompleteTextField({
    error: !meta.valid && meta.touched,
    helperText: !meta.valid && meta.touched ? meta.error : null,
    label,
    variant,
    size,
    placeholder,
  });
  const { options, refetch } = useCounterpartyQuery(
    counterpartyType,
    shouldFetchOptions.current ? inputValue : ''
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  const hasNoValue = value === '' || value === undefined;
  const hasDefaultOptionSet = useRef(false);
  const inn = options.length > 0 ? options[0].inn : undefined;

  useEffect(() => {
    if (!setFirstOptionAsDefault && hasNoValue) {
      hasDefaultOptionSet.current = false;
    }
  }, [setFirstOptionAsDefault, hasNoValue]);

  useEffect(() => {
    if (
      setFirstOptionAsDefault &&
      inn !== undefined &&
      hasNoValue &&
      !hasDefaultOptionSet.current
    ) {
      hasDefaultOptionSet.current = true;
      onChange(inn);
    }
  }, [setFirstOptionAsDefault, hasNoValue, inn, onChange]);

  const handleOnChange: ChangeCallback = useCallback(
    (_event, value, reason, _details) => {
      if (reason === 'clear') {
        hasDefaultOptionSet.current = true;
      }
      const item = options.find((t) => t.inn === value?.inn);
      onChange(item?.inn);
    },
    [options, onChange]
  );

  const selectedOption = useMemo(() => {
    if (value === undefined || value === '') {
      return null;
    }
    return options.find((t) => t.inn === value) || null;
  }, [value, options]);

  const { t } = useTranslation();

  return (
    <Autocomplete<CounterpartyOption, false, false, false>
      value={selectedOption}
      options={options}
      onChange={handleOnChange}
      onInputChange={handleOnInputChange}
      getOptionSelected={(option, value) => option.inn === value.inn}
      getOptionLabel={(option) => option.name}
      noOptionsText={t('ResultsNotFound')}
      inputValue={inputValue}
      renderInput={renderInput}
      openText={t('Open')}
      closeText={t('Close')}
      clearText={t('Clear')}
      autoHighlight={true}
      disabled={disabled}
    />
  );
};

type CounterpartyAutocompleteFieldProps = Omit<TextFieldProps, 'error' | 'helperText'> & {
  counterpartyType: CounterpartyType;
  validate?: FieldValidator<string | undefined>;
  disabled?: boolean;
  setFirstOptionAsDefault?: boolean;
};

export const CounterpartyAutocompleteField = (props: CounterpartyAutocompleteFieldProps) => {
  const { counterpartyType, disabled = false, ...rest } = props;

  return (
    <Field
      {...rest}
      counterpartyType={counterpartyType}
      name={counterpartyType}
      component={CounterpartyAutocomplete}
      disabled={disabled}
    />
  );
};
