import MuiRadio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import { createStyles, withStyles, Theme, WithStyles } from '@material-ui/core/styles';
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
      marginTop: '-6px',
      paddingLeft: theme.spacing(1),
      '& .Mui-checked': {
        '& .MuiSvgIcon-root': {
          fill: theme.palette.primary.main,
        },
      },
      '& .MuiFormControlLabel-root': {
        marginRight: theme.spacing(1.3),
      },
      '& .MuiButtonBase-root': {
        padding: theme.spacing(1),
      },
      '& .MuiFormControl-root': {
        marginTop: theme.spacing(1),
      },
      '& .MuiFormLabel-root': {
        fontSize: '9px',
      },
    },
    label: {},
    group: {},
    option: {
      '&:hover': {
        '& svg': {
          fill: theme.palette.primary.main,
        },
      },
    },
    error: {},
  });

export type RadioOption = {
  label: string;
  value: any;
};

export type RadioProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<UseControllerProps<TFieldValues, TName>, 'defaultValue'> &
  WithStyles<typeof styles, true> & {
    label?: string;
    options?: RadioOption[];
    defaultValue?: string;
  };

function StyledRadio<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: RadioProps<TFieldValues, TName>) {
  const {
    defaultValue = '',
    name,
    classes,
    label,
    options = [],
    control,
    shouldUnregister,
    rules,
  } = props;

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
    <FormControl component="fieldset" error={invalid} className={classes?.root} size="small">
      <FormLabel component="legend" className={classes?.label}>
        {label}
      </FormLabel>
      <RadioGroup row aria-label={name} className={classes?.group} value={value} {...inputProps}>
        {options.map(({ label, value }) => {
          return (
            <FormControlLabel
              key={value}
              className={classes?.option}
              value={value}
              control={<MuiRadio color="primary" />}
              label={label}
            />
          );
        })}
      </RadioGroup>
      <FormHelperText className={classes?.error}>{helperText}</FormHelperText>
    </FormControl>
  );
}

export const Radio = withStyles(styles, { withTheme: true })(StyledRadio) as <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: GenericWithStyles<RadioProps<TFieldValues, TName>>
) => React.ReactElement;
