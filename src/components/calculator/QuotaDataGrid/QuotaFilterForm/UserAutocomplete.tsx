import { useEffect, useMemo, useCallback, useRef, useState } from 'react';
import { FieldRenderProps } from 'react-final-form';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteInputChangeReason,
  Value,
} from '@material-ui/lab/useAutocomplete';
import { useQuotaOwnersQuery } from './useQuotaOwnersQuery';
import { UserViewModel } from 'schema/serverTypes';
import { useAutocompleteTextField } from 'components/calculator/CalculationForm/useAutocompleteTextField';
import { TextFieldProps } from 'components/form/TextField';
import { useTranslation } from 'react-i18next';
import KeyboardArrowDownRoundedIcon from '@material-ui/icons/KeyboardArrowDownRounded';

export type UserAutocompleteProps = FieldRenderProps<string | undefined, HTMLElement> &
  Omit<TextFieldProps, 'error' | 'helperText'> & {
    label: string;
    disabled?: boolean;
    setFirstOptionAsDefault?: boolean;
  };

type ChangeCallback = (
  event: React.ChangeEvent<{}>,
  value: Value<UserViewModel, false, false, false>,
  reason: AutocompleteChangeReason,
  details?: AutocompleteChangeDetails<UserViewModel>
) => void;

export const UserAutocomplete = (props: UserAutocompleteProps) => {
  const {
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
  const { options, refetch } = useQuotaOwnersQuery(shouldFetchOptions.current ? inputValue : '');

  useEffect(() => {
    refetch();
  }, [refetch]);

  const hasNoValue = value === '' || value === undefined;
  const hasDefaultOptionSet = useRef(false);
  const id = options.length > 0 ? options[0].id : undefined;

  useEffect(() => {
    if (!setFirstOptionAsDefault && hasNoValue) {
      hasDefaultOptionSet.current = false;
    }
  }, [setFirstOptionAsDefault, hasNoValue]);

  useEffect(() => {
    if (setFirstOptionAsDefault && id !== undefined && hasNoValue && !hasDefaultOptionSet.current) {
      hasDefaultOptionSet.current = true;
      onChange(id);
    }
  }, [setFirstOptionAsDefault, hasNoValue, id, onChange]);

  const handleOnChange: ChangeCallback = useCallback(
    (_event, value, reason, _details) => {
      if (reason === 'clear') {
        hasDefaultOptionSet.current = true;
      }
      const item = options.find((t) => t.id === value?.id);
      onChange(item?.id);
    },
    [options, onChange]
  );

  const selectedOption = useMemo(() => {
    if (value === undefined || value === '') {
      return null;
    }
    return options.find((t) => t.id === value) || null;
  }, [value, options]);

  const { t } = useTranslation();

  return (
    <Autocomplete<UserViewModel, false, false, false>
      value={selectedOption}
      options={options}
      onChange={handleOnChange}
      onInputChange={handleOnInputChange}
      popupIcon={<KeyboardArrowDownRoundedIcon color="primary" fontSize="default" />}
      getOptionSelected={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.name}
      noOptionsText={t('no results')}
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
