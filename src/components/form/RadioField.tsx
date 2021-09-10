import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import { FieldRenderProps } from 'react-final-form-hooks';
import { createStyles, withStyles, StyledComponentProps, Theme } from '@material-ui/core/styles';
import { palette } from 'theme';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      paddingLeft: theme.spacing(1),
      '& .MuiTypography-body1': {
        fontSize: '0.9em',
      },
      '& .Mui-checked': {
        '& .MuiSvgIcon-root': {
          fill: palette.primary.main
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
        fontSize: '9px'
      }
    },
    group: {},
    option: {
      '&:hover': {
        '& svg': {
          fill: theme.palette.primary.main
        }
      }
    },
    error: {},
  });

export type RadioFieldOption = {
  label: string;
  value: any;
};

export type RadioFieldProps = FieldRenderProps &
  StyledComponentProps & {
    label?: string;
    options?: RadioFieldOption[];
  };

export const RadioField = withStyles(styles)((props: RadioFieldProps) => {
  const { input, meta, classes, label, options = [] } = props;
  const error = !meta.valid && meta.touched;
  const helperText = !meta.valid && meta.touched ? meta.error : null;
  const name = input.name;

  return (
    <FormControl component="fieldset" error={error} className={classes?.root} size="small">
      <FormLabel component="legend" className={classes?.label}>
        {label}
      </FormLabel>
      <RadioGroup row aria-label={name} className={classes?.group} {...input}>
        {options.map(({ label, value }) => {
          return (
            <FormControlLabel
              key={value}
              className={classes?.option}
              value={value}
              control={<Radio color="primary" />}
              label={label}
            />
          );
        })}
      </RadioGroup>
      <FormHelperText className={classes?.error}>{helperText}</FormHelperText>
    </FormControl>
  );
});
