import { FormControlLabel, Checkbox, CheckboxProps } from '@material-ui/core';
import { FieldRenderProps } from 'react-final-form-hooks';
import { StyledComponentProps } from '@material-ui/core/styles';
import { IconCheckbox } from '../icons';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { IconCheckboxCircyle } from '../icons'

export type CheckboxFieldProps = CheckboxProps &
  FieldRenderProps<boolean> &
  StyledComponentProps & {
    label?: string,
    isСircle?: boolean,
  };

const CheckedIcon = <IconCheckbox isChecked={true} />;
const UncheckedIcon = <IconCheckbox isChecked={false} />;

export const CheckboxField = (props: CheckboxFieldProps) => {
  const { input, color = 'primary', label, size = 'medium', isСircle, meta, ...rest } = props;

  return (
    <FormControlLabel
      label={label}
      control={
        <Checkbox
          checkedIcon={isСircle ? <IconCheckboxCircyle /> : CheckedIcon}
          icon={isСircle ? <RadioButtonUncheckedIcon /> : UncheckedIcon}
          {...rest}
          {...input}
          color={color}
          size={size}
        />
      }
    />
  );
};
