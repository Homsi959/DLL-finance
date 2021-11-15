import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  SelectProps,
  FormControlProps,
} from '@material-ui/core';
import { FieldRenderProps } from 'react-final-form-hooks';
import { withStyles, StyledComponentProps, Theme, createStyles } from '@material-ui/core/styles';
import KeyboardArrowDownRoundedIcon from '@material-ui/icons/KeyboardArrowDownRounded';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      borderRadius: 0,
      boxShadow: '0px 5px 10px 0px ' + theme.palette.grey5.main,
      border: '1px solid ' + theme.palette.grey3.main,
      maxHeight: 185,
    },
    list: {
      paddingTop: 0,
      paddingBottom: 0,
      '& li': {
        color: theme.palette.secondary.main,
      },
      '& .MuiListItem-button:hover': {
        backgroundColor: theme.palette.secondary.light,
      },
      '& .MuiListItem-button.Mui-selected': {
        backgroundColor: theme.palette.secondary.light,
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
        borderBottom: '1px solid ' + theme.palette.lightBlue.main,
        borderRight: '1px solid ' + theme.palette.lightBlue.main,
        '&:hover': {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.common.white,
        },
      },
    },
  });

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
        IconComponent={(props) => {
          return <KeyboardArrowDownRoundedIcon {...props} color="primary" />;
        }}
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
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
});
