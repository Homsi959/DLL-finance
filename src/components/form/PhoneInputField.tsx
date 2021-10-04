import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from '@material-ui/core';
import { Field, FieldProps } from 'react-final-form';
import { AsYouType, parsePhoneNumber } from 'libphonenumber-js';
import 'img/flags/freakflags.css';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    flag: {
      marginRight: 10,
    },
  })
);

export const normalizePhone = (value: string) => {
  if (!value) return value;
  value = value.indexOf('+') >= 0 ? value : '+' + value;
  return new AsYouType().input(value);
};

export type PhoneProps = MuiTextFieldProps & FieldProps<string, any>;

export function PhoneInputField(props: PhoneProps) {
  const classes = useStyles();
  const { variant = 'outlined', size = 'small', fullWidth = true, ...rest } = props;

  return (
    <Field {...rest} parse={normalizePhone}>
      {({ input }) => {
        let country;
        try {
          country = parsePhoneNumber(input.value).country;
        } catch (e) {
          country = null;
        }

        return (
          <MuiTextField
            {...input}
            {...rest}
            variant={variant}
            size={size}
            fullWidth={fullWidth}
            inputProps={{ maxLength: 16 }}
            InputProps={{
              endAdornment: country ? (
                <div className={`${classes.flag} fflag ff-md ff-wave fflag-${country}`} />
              ) : null,
            }}
          />
        );
      }}
    </Field>
  );
}
