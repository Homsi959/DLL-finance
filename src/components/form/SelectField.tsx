import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  SelectProps,
  FormControlProps,
} from '@material-ui/core';
import { FieldRenderProps } from 'react-final-form-hooks';
import { withStyles, StyledComponentProps } from '@material-ui/core/styles';
import { IconArrowLight } from 'components/icons';
import palette, { white } from 'theme/palette';

const styles = {
  root: {
    width: '100%',
    minWidth: '0',
    color: palette.secondary.main,
    '& .MuiSelect-outlined.MuiSelect-outlined': {
      paddingRight: 0,
    },
    '& svg': {
      position: 'absolute',
      right: '0',
      pointerEvents: 'none',
    },
  },
  paper: {
    borderRadius: 0,
    boxShadow: '0px 5px 10px 0px #383C611A',
    border: '1px solid #D1D7E4',
    maxHeight: 185,
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0,
    '& li': {
      color: palette.secondary.main,
    },
    '& .MuiListItem-button:hover': {
      backgroundColor: palette.secondary.light,
    },
    '& .MuiListItem-button.Mui-selected': {
      backgroundColor: palette.secondary.light,
    },
  },
  lowercaseUl: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
    padding: 0,
    gap: '0px 0px',
    '& .MuiListItem-root': {
      minHeight: 0,
      justifyContent: 'center',
      padding: '5px',
      borderBottom: '1px solid #E9F1FE',
      borderRight: '1px solid #E9F1FE',
      '&:hover': {
        backgroundColor: palette.primary.main,
        color: white,
      },
    },
  },
};

export type SelectFieldProps = Omit<SelectProps, 'name' | 'onChange' | 'value'> &
  FieldRenderProps &
  StyledComponentProps &
  Pick<FormControlProps, 'size'> & {
    lowercase: boolean;
  };

export const SelectField = withStyles(styles)((props: SelectFieldProps) => {
  const {
    input,
    meta,
    children,
    classes,
    label,
    variant = 'outlined',
    size = 'small',
    lowercase = false,
    ...rest
  } = props;
  const error = !meta.valid && meta.touched;
  const helperText = !meta.valid && meta.touched ? meta.error : null;
  const labelId = `label-${input.name}`;
  const selectId = `select-${input.name}`;

  return (
    <FormControl variant={variant} className={classes?.root} error={error} size={size}>
      {label !== undefined ? <InputLabel id={labelId}>{label}</InputLabel> : null}
      <Select
        {...rest}
        name={input.name}
        labelId={labelId}
        id={selectId}
        value={input.value}
        onChange={input.onChange}
        onBlur={input.onBlur}
        onFocus={input.onFocus}
        label={label}
        className={classes?.root}
        IconComponent={() => <IconArrowLight colors={{ fill: palette.primary.main }} />}
        MenuProps={{
          classes: {
            paper: classes?.paper,
            list: lowercase ? classes?.lowercaseUl : classes?.list,
          },
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
          getContentAnchorEl: null,
        }}
      >
        {children}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
});