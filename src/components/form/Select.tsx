import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
  FormControlProps,
} from '@material-ui/core';
import { createStyles, withStyles, Theme, WithStyles } from '@material-ui/core/styles';
import KeyboardArrowDownRoundedIcon from '@material-ui/icons/KeyboardArrowDownRounded';
import {
  useController,
  FieldPath,
  FieldValues,
  UseControllerProps,
  FieldError,
} from 'react-hook-form';
import { GenericWithStyles } from './GenericWithStyles';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      minWidth: '0',
      color: theme.palette.secondary.main,
      '& .MuiSelect-outlined.MuiSelect-outlined': {
        paddingRight: 0,
      },
      '& .MuiSelect-icon': {
        color: theme.palette.primary.main,
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
        borderBottom: '1px solid #E9F1FE',
        borderRight: '1px solid #E9F1FE',
        '&:hover': {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.common.white,
        },
      },
    },
  });

export type SelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<MuiSelectProps, 'name' | 'onChange' | 'value' | 'defaultValue'> &
  Omit<UseControllerProps<TFieldValues, TName>, 'defaultValue'> &
  WithStyles<typeof styles, true> &
  Pick<FormControlProps, 'size'> & {
    lowercase?: boolean;
    defaultValue?: string;
  };

function StyledSelect<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: SelectProps<TFieldValues, TName>) {
  const {
    name,
    children,
    classes,
    label,
    variant = 'outlined',
    size = 'small',
    lowercase = false,
    control,
    shouldUnregister,
    rules,
    defaultValue = '',
    ...rest
  } = props;

  const labelId = `label-${name}`;
  const selectId = `select-${name}`;

  const {
    field: { ref, value = defaultValue, ...inputProps },
    fieldState: { invalid, error },
  } = useController<TFieldValues, TName>({
    control,
    name,
    shouldUnregister,
    rules,
  });

  const helperText = error !== undefined ? (error as FieldError).message : undefined;

  return (
    <FormControl variant={variant} className={classes?.root} error={invalid} size={size}>
      {label !== undefined ? <InputLabel id={labelId}>{label}</InputLabel> : null}
      <MuiSelect
        {...rest}
        {...inputProps}
        labelId={labelId}
        id={selectId}
        value={value}
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
      </MuiSelect>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
}

export const Select = withStyles(styles, { withTheme: true })(StyledSelect) as <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: GenericWithStyles<SelectProps<TFieldValues, TName>>
) => React.ReactElement;
