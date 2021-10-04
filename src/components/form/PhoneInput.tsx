import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from '@material-ui/core';
import 'img/flags/freakflags.css';
import {
  useController,
  FieldPath,
  FieldValues,
  UseControllerProps,
  FieldError,
} from 'react-hook-form';
import { parsePhoneNumber } from 'libphonenumber-js';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { normalizePhone } from './PhoneInputField';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    flag: {
      marginRight: 10,
    },
  })
);

export type PhoneInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<MuiTextFieldProps, 'name' | 'helperText' | 'error' | 'defaultValue'> &
  Omit<UseControllerProps<TFieldValues, TName>, 'defaultValue'> & {
    defaultValue?: string;
  };

export function PhoneInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: PhoneInputProps<TFieldValues, TName>) {
  const classes = useStyles();

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

  let country;
  try {
    country = parsePhoneNumber(value).country;
  } catch (e) {
    country = null;
  }

  return (
    <MuiTextField
      {...rest}
      {...inputProps}
      value={normalizePhone(value)}
      variant={variant}
      fullWidth={fullWidth}
      size={size}
      inputRef={ref}
      helperText={helperText}
      error={invalid}
      inputProps={{ maxLength: 16 }}
      InputProps={{
        endAdornment: country ? (
          <div className={`${classes.flag} fflag ff-md ff-wave fflag-${country}`} />
        ) : null,
      }}
    />
  );
}
