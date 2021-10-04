import {
  FormControlLabel,
  Switch,
  SwitchProps,
  Grid,
  Typography,
  FormControl,
} from '@material-ui/core';
import { FieldRenderProps } from 'react-final-form-hooks';
import { createStyles, withStyles, StyledComponentProps, Theme } from '@material-ui/core/styles';
import { palette } from 'theme';
import { useTranslation } from 'react-i18next';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      '& .MuiSwitch-track': {
        backgroundColor: palette.secondary.dark,
        opacity: 1,
      },
      '& .MuiIconButton-root:hover': {
        backgroundColor: 'rgba(0, 153, 255, 0.1)',
      },
    },
    content: {
      paddingTop: theme.spacing(1),
    },
  });

export type SwitchFieldProps = SwitchProps &
  StyledComponentProps &
  FieldRenderProps<boolean> & {
    label?: string;
    labelOn?: string;
    labelOff?: string;
  };

export const SwitchField = withStyles(styles)((props: SwitchFieldProps) => {
  const { t } = useTranslation();
  const {
    input,
    meta,
    classes,
    label,
    labelOn = t('Yes'),
    labelOff = t('No'),
    color = 'primary',
    ...rest
  } = props;
  const { checked, value, ...inputRest } = input;

  return (
    <FormControl className={classes?.root} size="small">
      <Typography component="div" className={classes?.content}>
        <Grid container alignItems="center" spacing={1}>
          <Grid item className={classes?.label}>
            {label}
          </Grid>
          <Grid item>
            <FormControlLabel
              control={<Switch checked={checked} {...inputRest} color={color} {...rest} />}
              label={input.checked ? labelOn : labelOff}
            />
          </Grid>
        </Grid>
      </Typography>
    </FormControl>
  );
});
