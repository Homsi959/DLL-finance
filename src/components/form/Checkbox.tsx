import {
  FormControlLabel,
  Checkbox as MuiCheckbox,
  CheckboxProps as MuiCheckboxProps,
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { useController, FieldPath, FieldValues, UseControllerProps } from 'react-hook-form';
import { StyledComponentProps } from '@material-ui/core/styles';
import { IconCheckbox } from '../icons';
import { IconCheckboxCircyle } from '../icons';
import { IconCheckboxUncheckedCircyle } from '../icons';
import { useCallback } from 'react';

type StyleProps = {
  invalid?: boolean;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    label: ({ invalid = false }: StyleProps) => {
      if (invalid) {
        return {
          color: theme.palette.error.main,
        };
      }
      return {};
    },
  })
);

export type CheckboxProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<MuiCheckboxProps, 'name' | 'helperText' | 'error' | 'ref' | 'onChange'> &
  StyledComponentProps & {
    label?: string;
    isCircle?: boolean;
    onChange?: (checked: boolean) => boolean;
  } & UseControllerProps<TFieldValues, TName>;

const CheckedIcon = <IconCheckbox checked={true} />;
const UncheckedIcon = <IconCheckbox checked={false} />;

export function Checkbox<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: CheckboxProps<TFieldValues, TName>) {
  const {
    name,
    color = 'primary',
    label,
    disabled = false,
    size = 'small',
    isCircle = false,
    control,
    shouldUnregister,
    rules,
    onChange: onChangeOriginal,
    ...rest
  } = props;

  const {
    field: { ref, value: checked, onChange, ...inputProps },
    fieldState: { invalid },
  } = useController<TFieldValues, TName>({
    control,
    name,
    shouldUnregister,
    rules,
  });

  const classes = useStyles({ invalid });

  const handleOnChange = useCallback(
    (e: any, checked: boolean) => {
      const shouldChange = onChangeOriginal ? onChangeOriginal(checked) : true;
      if (shouldChange) {
        onChange(e, checked);
      }
    },
    [onChangeOriginal, onChange]
  );

  return (
    <FormControlLabel
      label={label}
      classes={{
        label: classes.label,
      }}
      control={
        <MuiCheckbox
          checked={checked}
          checkedIcon={isCircle ? <IconCheckboxCircyle /> : CheckedIcon}
          icon={isCircle ? <IconCheckboxUncheckedCircyle disabled={disabled} /> : UncheckedIcon}
          {...rest}
          {...inputProps}
          onChange={handleOnChange}
          color={color}
          size={size}
          inputRef={ref}
        />
      }
    />
  );
}
