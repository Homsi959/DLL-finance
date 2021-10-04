import { FormControlLabel, Checkbox, CheckboxProps } from '@material-ui/core';
import { FieldRenderProps } from 'react-final-form-hooks';
import { StyledComponentProps } from '@material-ui/core/styles';
import { IconCheckbox } from '../icons';
import { IconCheckboxCircyle } from '../icons';
import { IconCheckboxUncheckedCircyle } from '../icons';

export type CheckboxFieldProps = CheckboxProps &
  FieldRenderProps<boolean> &
  StyledComponentProps & {
    label?: string;
    isCircle?: boolean;
  };

const CheckedIcon = <IconCheckbox checked={true} />;
const UncheckedIcon = <IconCheckbox checked={false} />;

export const CheckboxField = (props: CheckboxFieldProps) => {
  const {
    input,
    color = 'primary',
    label,
    disabled = false,
    size = 'small',
    isCircle = false,
    meta,
    ...rest
  } = props;

  return (
    <FormControlLabel
      label={label}
      control={
        <Checkbox
          checkedIcon={isCircle ? <IconCheckboxCircyle /> : CheckedIcon}
          icon={isCircle ? <IconCheckboxUncheckedCircyle disabled={disabled} /> : UncheckedIcon}
          {...rest}
          {...input}
          color={color}
          size={size}
        />
      }
    />
  );
};
