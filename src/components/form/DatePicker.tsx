import {
  DatePicker as MuiDatePicker,
  DatePickerProps as MuiDatePickerProps,
} from '@material-ui/pickers';
import { useController, FieldPath, FieldValues, UseControllerProps } from 'react-hook-form';
import { IconSprite } from 'components';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import formControlStyles from 'theme/overrides/MuiFormControl';
import formLabelStyles from 'theme/overrides/MuiFormLabel';
import inputBaseStyles from 'theme/overrides/MuiInputBase';
import palette from 'theme/palette';
import typography from 'theme/typography';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const calendarTheme = createMuiTheme({
  palette,
  typography,
  overrides: {
    MuiFormControl: formControlStyles,
    MuiFormLabel: formLabelStyles,
    MuiInputBase: inputBaseStyles,
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
    MuiPickersCalendarHeader: {
      dayLabel: {
        color: palette.primary.main,
        fontSize: '14px',
      },
      iconButton: {
        borderRadius: 0,
        backgroundColor: palette.secondary.main,
        color: 'white',
      },
      transitionContainer: {
        display: 'flex',
        alignItems: 'center',
        '& > *': {
          top: 'auto',
          color: 'white',
          fontSize: 14,
        },
      },
    },
    MuiPickersToolbar: {
      toolbar: {
        borderBottom: '1px solid grey',
        backgroundColor: palette.secondary.main,
      },
    },
    MuiPickersDay: {
      day: {
        color: palette.common.white,
        borderRadius: 0,
        '&:hover': {
          border: '1px solid white',
        },
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

export type DatePickerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<UseControllerProps<TFieldValues, TName>, 'defaultValue'> &
  Omit<MuiDatePickerProps, 'name' | 'value' | 'onChange' | 'defaultValue'>;

export function DatePicker<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: DatePickerProps<TFieldValues, TName>) {
  const { t } = useTranslation();

  const {
    okLabel = t('Ok'),
    clearLabel = t('Clear'),
    cancelLabel = t('Cancel'),
    invalidDateMessage = 'Неверный формат даты',
    variant = 'dialog',
    clearable = true,
    inputVariant = 'outlined',
    autoOk = true,
    size = 'small',
    fullWidth = true,
    format = 'DD.MM.yyyy',
    control,
    name,
    shouldUnregister,
    rules,
    ...rest
  } = props;

  const {
    field: { ref, value: dateValue, onChange, ...inputProps },
  } = useController<TFieldValues, TName>({
    control,
    name,
    shouldUnregister,
    rules,
  });

  const handleOnChange = useCallback(
    (date) => {
      if (Date.parse(date)) {
        onChange(date.toISOString());
      } else {
        onChange(null);
      }
    },
    [onChange]
  );

  const value =
    dateValue !== undefined && dateValue !== null && dateValue !== '' ? new Date(dateValue) : null;

  return (
    <ThemeProvider theme={calendarTheme}>
      <MuiDatePicker
        {...rest}
        {...inputProps}
        onChange={handleOnChange}
        value={value}
        inputRef={ref}
        fullWidth={fullWidth}
        size={size}
        invalidDateMessage={invalidDateMessage}
        variant={variant}
        clearable={clearable}
        format={format}
        inputVariant={inputVariant}
        autoOk={autoOk}
        okLabel={okLabel}
        cancelLabel={cancelLabel}
        clearLabel={clearLabel}
        InputProps={{
          endAdornment: <IconSprite width="16px" color={palette.textGrey2.main} icon="calendar" />,
        }}
      />
    </ThemeProvider>
  );
}
