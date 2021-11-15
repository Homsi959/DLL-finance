import { useCallback } from 'react';
import { FieldRenderProps } from 'react-final-form-hooks';
import { DatePicker, DatePickerProps } from '@material-ui/pickers';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import formControlStyles from 'theme/overrides/MuiFormControl';
import formLabelStyles from 'theme/overrides/MuiFormLabel';
import inputBaseStyles from 'theme/overrides/MuiInputBase';
import palette from 'theme/palette';
import typography from 'theme/typography';
import { IconSprite } from '../../../icons';

export type DateFieldProps = Omit<DatePickerProps, 'value' | 'onChange'> & FieldRenderProps;

const calendarTheme = createMuiTheme({
  palette,
  typography,
  overrides: {
    MuiFormControl: formControlStyles,
    MuiFormLabel: formLabelStyles,
    MuiInputBase: inputBaseStyles,
    MuiOutlinedInput: {
      inputMarginDense: {
        paddingTop: 12,
        paddingRight: 10,
        paddingBottom: 8,
        paddingLeft: 10,
      },
    },
    MuiTypography: {
      subtitle1: {
        color: 'white',
        fontWeight: 300,
      },
      h5: {
        color: palette.primary.main,
        fontSize: '14px',
        fontWeight: 300,
        lineHeight: '18px',
      },
    },
    MuiPaper: {
      root: {
        backgroundColor: palette.secondary.main,
      },
    },
    MuiPickersToolbar: {
      toolbar: {
        borderBottom: '1px solid grey',
        backgroundColor: palette.secondary.main,
      },
    },
    MuiPickersMonth: {
      root: {
        color: palette.common.white,
        fontSize: '14px',
        '&:hover': {
          border: '1px solid ' + palette.secondary.dark,
          color: palette.common.white,
        },
      },
      monthSelected: {
        color: palette.common.white,
        fontSize: '14px',
      },
      monthDisabled: {
        color: palette.secondary.dark,
        fontSize: '12px',
      },
    },
    MuiPickersYear: {
      root: {
        '&:hover': {
          color: palette.common.white,
        },
      },
      yearSelected: {
        color: palette.common.white,
      },
    },
  },
});

export const DateField = (props: DateFieldProps) => {
  const {
    input,
    meta,
    invalidDateMessage = 'Неверный формат даты',
    variant = 'inline',
    inputVariant = 'outlined',
    autoOk = true,
    size = 'small',
    format,
    views = ['year', 'month'],
    ...rest
  } = props;

  const handleOnChange = useCallback(
    (date) => {
      if (Date.parse(date)) {
        input.onChange(date.toISOString());
      } else {
        input.onChange(null);
      }
    },
    [input]
  );

  const value =
    input.value !== undefined && input.value !== null && input.value !== ''
      ? new Date(input.value)
      : null;

  return (
    <ThemeProvider theme={calendarTheme}>
      <DatePicker
        {...rest}
        {...input}
        size={size}
        error={!meta.valid && meta.touched}
        helperText={!meta.valid && meta.touched ? meta.error || meta.submitError : null}
        disablePast={true}
        views={views}
        variant={variant}
        inputVariant={inputVariant}
        onChange={handleOnChange}
        value={value}
        invalidDateMessage={invalidDateMessage}
        autoOk={autoOk}
        InputProps={{
          endAdornment: <IconSprite width="16px" color={palette.textGrey2.main} icon="calendar" />,
        }}
      />
    </ThemeProvider>
  );
};
