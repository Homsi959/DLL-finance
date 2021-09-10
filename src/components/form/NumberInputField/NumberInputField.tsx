import { forwardRef } from 'react';
import {
  FormControl,
  FormHelperText,
  OutlinedTextFieldProps,
  OutlinedInput,
  Grid,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { NumberInput, NumberInputProps } from 'components/NumberInput';
import { FieldRenderProps } from 'react-final-form-hooks';
import { ActionButton } from './ActionButton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '8px',
      '& .MuiOutlinedInput-inputMarginDense': {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
      },
      '& input': {
        fontSize: '12px',
        fontWeight: 400,
        width: '38px',
        textAlign: 'center',
        paddingLeft: '7px',
        paddingRight: '7px',
      },
    },
  })
);

export type NumberInputFieldProps = FieldRenderProps<number | undefined> &
  Pick<NumberInputProps, 'allowNegative' | 'decimalScale' | 'allowLeadingZeros'> &
  Omit<
    OutlinedTextFieldProps,
    'label' | 'InputLabelProps' | 'variant' | 'SelectProps' | 'select'
  > & {
    maxValue?: number;
    minValue?: number;
    shrink?: boolean;
  };

export const NumberInputField = forwardRef<HTMLDivElement, NumberInputFieldProps>(
  (props: NumberInputFieldProps, ref) => {
    const classes = useStyles();

    const {
      id,
      input,
      meta,
      size = 'small',
      inputProps,
      autoComplete,
      autoFocus,
      multiline,
      defaultValue,
      rows,
      type,
      placeholder,
      inputRef,
      required,
      shrink,
      color,
      disabled,
      fullWidth = true,
      rowsMax,
      allowNegative = false,
      decimalScale = 2,
      allowLeadingZeros = false,
    } = props;

    const error = !meta.valid && meta.touched;
    const helperText = !meta.valid && meta.touched ? meta.error : null;
    const helperTextId = helperText && id ? `${id}-helper-text` : undefined;

    const { value, onChange } = input;

    return (
      <FormControl
        ref={ref}
        className={classes.root}
        disabled={disabled}
        error={error}
        fullWidth={fullWidth}
        required={required}
        color={color}
        variant="outlined"
        size={size}
      >
        <Grid container alignItems="center">
          <Grid item>
            <ActionButton action="decrease" onChange={onChange} value={value} disabled={disabled} />
          </Grid>
          <Grid item>
            <OutlinedInput
              notched={shrink}
              aria-describedby={helperTextId}
              autoComplete={autoComplete}
              autoFocus={autoFocus}
              defaultValue={defaultValue}
              fullWidth={fullWidth}
              multiline={multiline}
              rows={rows}
              rowsMax={rowsMax}
              type={type}
              id={id}
              inputRef={inputRef}
              placeholder={placeholder}
              inputProps={{
                ...inputProps,
                allowNegative,
                decimalScale,
                allowLeadingZeros,
              }}
              inputComponent={NumberInput}
              {...input}
            />
          </Grid>
          <Grid item>
            <ActionButton action="increase" onChange={onChange} value={value} disabled={disabled} />
          </Grid>
        </Grid>
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    );
  }
);
