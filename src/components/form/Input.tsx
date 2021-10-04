import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from '@material-ui/core';
import {
  useController,
  FieldPath,
  FieldValues,
  UseControllerProps,
  FieldError,
} from 'react-hook-form';

export type InputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<MuiTextFieldProps, 'name' | 'helperText' | 'error' | 'defaultValue'> &
  Omit<UseControllerProps<TFieldValues, TName>, 'defaultValue'> & {
    defaultValue?: string;
  };

export function Input<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: InputProps<TFieldValues, TName>) {
  const {
    name,
    variant = 'outlined',
    size = 'small',
    fullWidth = true,
    control,
    shouldUnregister,
    rules,
    ...rest
  } = props;

  const {
    field: { ref, value = '', ...inputProps },
    fieldState: { invalid, error },
  } = useController<TFieldValues, TName>({
    control,
    name,
    shouldUnregister,
    rules,
  });

  const helperText = error !== undefined ? (error as FieldError).message : undefined;

  return (
    <MuiTextField
      {...rest}
      {...inputProps}
      value={value}
      variant={variant}
      fullWidth={fullWidth}
      size={size}
      inputRef={ref}
      helperText={helperText}
      error={invalid}
    />
  );
}
