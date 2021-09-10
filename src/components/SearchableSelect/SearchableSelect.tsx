import { useCallback } from 'react';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import Autocomplete, { AutocompleteProps } from '@material-ui/lab/Autocomplete';
import {
  AutocompleteChangeReason,
  AutocompleteChangeDetails,
  Value,
  AutocompleteInputChangeReason,
} from '@material-ui/lab/useAutocomplete';
import { useTranslation } from 'react-i18next';

type InputProps = Pick<TextFieldProps, 'variant' | 'label' | 'placeholder'>;

type SearchableSelectBaseProps<T> = {
  getOptionLabel: (option: T) => string;
  onChange: (option: T | null) => void;
  onInputChange: (value: string) => void;
};

export type SearchableSelectProps<T> = Omit<
  AutocompleteProps<T, false, false, false>,
  'getOptionLabel' | 'renderOption' | 'renderInput' | 'multiple' | 'onChange' | 'onInputChange'
> &
  SearchableSelectBaseProps<T> &
  InputProps;

export function SearchableSelect<T>(props: SearchableSelectProps<T>) {
  const {
    options,
    disableCloseOnSelect = false,
    getOptionLabel,
    style = { width: '100%' },
    label = '',
    variant = 'outlined',
    size = 'small',
    placeholder = '',
    onInputChange,
    onChange,
    ...rest
  } = props;

  const handleOnChange = useCallback(
    (
      event: React.ChangeEvent<{}>,
      value: Value<T, false, false, false>,
      reason: AutocompleteChangeReason,
      _details?: AutocompleteChangeDetails<T>
    ) => {
      if (reason === 'blur') {
        //props.input.onBlur();
      } else if (reason === 'clear') {
        onChange(null);
      } else if (reason === 'select-option') {
        onChange(value);
      }
    },
    [onChange]
  );

  const handleOnInputChange = useCallback(
    (_event: React.ChangeEvent<{}>, value: string, reason: AutocompleteInputChangeReason) => {
      if (reason === 'clear') {
        onInputChange('');
      } else if (reason === 'input') {
        onInputChange(value);
      }
    },
    [onInputChange]
  );

  const { t } = useTranslation();

  return (
    <Autocomplete
      {...rest}
      onChange={handleOnChange}
      multiple={false}
      options={options}
      noOptionsText={t('ResultsNotFound')}
      openText={t('Open')}
      closeText={t('Close')}
      disableCloseOnSelect={disableCloseOnSelect}
      getOptionLabel={getOptionLabel}
      renderOption={(option) => getOptionLabel(option)}
      style={style}
      onInputChange={handleOnInputChange}
      size={size}
      renderInput={(params) => (
        <TextField {...params} label={label} variant={variant} placeholder={placeholder} />
      )}
    />
  );
}
