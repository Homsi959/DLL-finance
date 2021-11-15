import { useCallback } from 'react';
import { TextField, TextFieldProps as MuiTextFieldProps } from '@material-ui/core';
import MuiAutocomplete, {
  AutocompleteProps as MuiAutocompleteProps,
  AutocompleteRenderInputParams,
} from '@material-ui/lab/Autocomplete';
import { useTranslation } from 'react-i18next';

export type AutocompleteProps<
  TOption = string,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
> = Omit<MuiAutocompleteProps<TOption, Multiple, DisableClearable, FreeSolo>, 'renderInput'> &
  TextFieldProps;

type TextFieldProps = Pick<
  MuiTextFieldProps,
  'variant' | 'label' | 'placeholder' | 'size' | 'error' | 'helperText' | 'fullWidth' | 'InputProps'
>;

const useAutocompleteTextField = (props: TextFieldProps) => {
  const renderInput = useCallback(
    (params: AutocompleteRenderInputParams): React.ReactNode => {
      const { inputProps, inputComponent } = props.InputProps ?? {};
      let inProps: MuiTextFieldProps['InputProps'] = {
        ...params.InputProps,
      };
      if (inputProps) {
        inProps.inputProps = inputProps;
      }
      if (inputComponent) {
        inProps.inputComponent = inputComponent;
      }
      return <TextField {...params} {...props} InputProps={inProps} />;
    },
    [props]
  );

  return { renderInput };
};

export function Autocomplete<
  TOption = string,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
>(props: AutocompleteProps<TOption, Multiple, DisableClearable, FreeSolo>) {
  const { t } = useTranslation();
  const {
    noOptionsText = t('no results'),
    openText = t('Open'),
    closeText = t('Close'),
    clearText = t('Clear'),
    autoHighlight = true,
    popupIcon = '',
    label,
    variant = 'outlined',
    size = 'small',
    placeholder,
    disabled,
    error,
    helperText,
    InputProps,
    ...rest
  } = props;

  const { renderInput } = useAutocompleteTextField({
    error,
    helperText,
    label,
    variant,
    size,
    placeholder,
    InputProps,
  });

  const autocompleteProps = {
    ...rest,
    renderInput,
    noOptionsText,
    openText,
    closeText,
    clearText,
    autoHighlight,
    popupIcon,
  };

  return <MuiAutocomplete<TOption, Multiple, DisableClearable, FreeSolo> {...autocompleteProps} />;
}
