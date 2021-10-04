import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from '@material-ui/core';
import { FieldRenderProps } from 'react-final-form-hooks';

export type TextFieldProps<V = any, T = string> = MuiTextFieldProps & FieldRenderProps<V, T>;

export function TextField<V = any, T = string>(props: TextFieldProps<V, T>) {
  const { input, meta, variant = 'outlined', size = 'small', fullWidth = true, ...rest } = props;
  const { submitError } = meta;
  return (
    <MuiTextField
      {...rest}
      {...input}
      error={!meta.valid && meta.touched}
      helperText={!meta.valid && meta.touched ? meta.error || submitError : null}
      variant={variant}
      fullWidth={fullWidth}
      size={size}
    />
  );
}
