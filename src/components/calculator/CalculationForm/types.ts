import { FieldState } from 'final-form';
import { FieldRenderProps } from 'react-final-form-hooks';
import { TextFieldProps as MuiTextFieldProps } from '@material-ui/core/TextField';
import { AutocompleteProps as MuiAutocompleteProps } from '@material-ui/lab/Autocomplete';
import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteInputChangeReason,
  Value,
} from '@material-ui/lab/useAutocomplete';
import { ItemValue } from './NomenclatureContext';

export type TextFieldProps = Pick<
  MuiTextFieldProps,
  'variant' | 'label' | 'placeholder' | 'size' | 'error' | 'helperText' | 'fullWidth'
>;

export type AutocompleteProps<FreeSolo extends boolean | undefined> = Pick<
  MuiAutocompleteProps<string | undefined, false, false, FreeSolo>,
  | 'value'
  | 'onChange'
  | 'inputValue'
  | 'onInputChange'
  | 'getOptionSelected'
  | 'noOptionsText'
  | 'openText'
  | 'closeText'
  | 'clearText'
  | 'renderInput'
  | 'autoHighlight'
  | 'popupIcon'
>;

export type AutocompleteFieldDefaultProps<FreeSolo extends boolean | undefined> = Omit<
  AutocompleteProps<FreeSolo>,
  'onChange'
> & {
  onChange: (
    event: React.ChangeEvent<{}>,
    value: Value<string | undefined, false, false, false>,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<string | undefined>
  ) => void;
  resetInputValue: () => void;
};

export type FieldValidator<FieldValue> = (
  value: FieldValue,
  allValues: object,
  meta?: FieldState<FieldValue>
) => any | Promise<any>;

export type AutocompleteFieldProps<FreeSolo extends boolean | undefined = false> = FieldRenderProps<
  string | undefined,
  HTMLElement
> &
  AutocompleteProps<FreeSolo> &
  Omit<TextFieldProps, 'error' | 'helperText'> & {
    validate?: FieldValidator<string | undefined>;
  };

export type ChangeCallback = (
  event: React.ChangeEvent<{}>,
  value: Value<ItemValue, false, false, false>,
  reason: AutocompleteChangeReason,
  details?: AutocompleteChangeDetails<string | undefined>
) => void;

export type InputChangeCallback = (
  event: React.ChangeEvent<{}>,
  value: string,
  reason: AutocompleteInputChangeReason
) => void;
