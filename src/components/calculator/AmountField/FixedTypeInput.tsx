import { ReactElement, useCallback, useMemo } from 'react';
import { Field } from 'react-final-form';
import { TextField } from 'components';
import { NumberFormatCustom } from './NumberFormatCustom';
import { AmountType } from 'schema/serverTypes';
import { useAmountValidation } from '../utils';
import { AmountFieldProps, AmountTypeContext } from './types';
import { createStyles, InputAdornment, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      borderLeft: '1px solid' + theme.palette.grey3.main,
      flex: 1,
      minWidth: theme.spacing(4),
      minHeight: theme.spacing(4),
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.palette.lightBlue2.main,
      '.Mui-disabled &': {
        color: theme.palette.textGrey3.main,
      },
    },
  })
);

export type FixedTypeInputProps = Omit<AmountFieldProps, 'amountMode'> & {
  amountMode: AmountType;
  icon?: ReactElement | string;
};

export const FixedTypeInput = (props: FixedTypeInputProps) => {
  const classes = useStyles();

  const {
    name,
    label,
    disabled = false,
    required = false,
    allowZero = false,
    amountMode,
    fractionDigits,
    icon,
    inputProps,
  } = props;

  const { validateAmount } = useAmountValidation();

  const validate = useCallback(
    (value: any) => {
      return validateAmount(required, allowZero, amountMode, value);
    },
    [required, allowZero, amountMode, validateAmount]
  );

  const context = useMemo(() => {
    return {
      amountType: amountMode,
      fractionDigits,
    };
  }, [amountMode, fractionDigits]);

  return (
    <AmountTypeContext.Provider value={context}>
      <Field
        name={name}
        label={label}
        disabled={disabled}
        component={TextField}
        InputProps={{
          inputComponent: NumberFormatCustom,
          endAdornment: icon ? (
            <InputAdornment position="end" disableTypography className={classes.icon}>
              {icon}
            </InputAdornment>
          ) : null,
        }}
        validate={validate}
        inputProps={inputProps}
      />
    </AmountTypeContext.Provider>
  );
};
