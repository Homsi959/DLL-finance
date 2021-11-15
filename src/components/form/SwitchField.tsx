import { FormControlLabel, Switch, SwitchProps, FormControl, Box } from '@material-ui/core';
import { FieldRenderProps } from 'react-final-form-hooks';
import { createStyles, withStyles, StyledComponentProps, Theme } from '@material-ui/core/styles';
import { palette } from 'theme';
import { useTranslation } from 'react-i18next';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      paddingTop: 4,
      paddingBottom: 0,
      '& .MuiSwitch-track': {
        backgroundColor: palette.secondary.dark,
        opacity: 1,
      },
      '& .MuiIconButton-root:hover': {
        backgroundColor: 'rgba(0, 153, 255, 0.1)',
      },
      '& .MuiFormControlLabel-root': {
        marginRight: 0,
      },
    },
    label: {
      display: 'flex',
      alignItems: 'center',
      marginRight: '10px',
    },
    nowrap: {
      whiteSpace: 'nowrap',
    },
    content: {
      paddingTop: theme.spacing(1),
    },
    valueWrapper: {
      position: 'relative',
    },
    val: {
      position: 'absolute',
      left: 0,
    },
    hidden: {
      //hidden span hack for dinamic width
      display: 'block',
      height: '14px',
      overflow: 'hidden',
      left: 0,
      opacity: 0,
    },
    switchRoot: {
      height: 30,
      padding: '8px 12px',
    },
    switchBase: {
      padding: 5,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        transform: 'translateX(22px)',
      },
    },
  });

export type SwitchFieldProps = SwitchProps &
  StyledComponentProps &
  FieldRenderProps<boolean> & {
    label?: string;
    labelOn?: string;
    labelOff?: string;
    titleWrap?: boolean;
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
    titleWrap = true,
    ...rest
  } = props;
  const { checked, value, ...inputRest } = input;
  const noWrapClass = titleWrap ? '' : classes?.nowrap;

  return (
    <FormControl className={classes?.root} size="small">
      {label && <Box className={`${classes?.label} ${noWrapClass}`}>{label}</Box>}
      <Box>
        <FormControlLabel
          control={
            <Switch
              checked={checked}
              {...inputRest}
              color={color}
              {...rest}
              classes={{
                root: classes?.switchRoot,
                switchBase: classes?.switchBase,
              }}
            />
          }
          label={
            <div className={classes?.valueWrapper}>
              <span className={classes?.val}>{input?.checked ? labelOn : labelOff}</span>
              <span className={classes?.hidden}>
                {labelOn}
                <br />
                {labelOff}
              </span>
            </div>
          }
        />
      </Box>
    </FormControl>
  );
});
