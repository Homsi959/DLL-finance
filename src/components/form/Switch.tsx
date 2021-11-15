import {
  FormControlLabel,
  Switch as MuiSwitch,
  SwitchProps as MuiSwitchProps,
  FormControl,
  Box,
} from '@material-ui/core';
import { createStyles, withStyles, Theme, WithStyles } from '@material-ui/core/styles';
import { palette } from 'theme';
import { useTranslation } from 'react-i18next';
import { useController, FieldPath, FieldValues, UseControllerProps } from 'react-hook-form';
import { GenericWithStyles } from './GenericWithStyles';

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
        transform: 'translateX(26px)',
      },
    },
  });

export type SwitchProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<UseControllerProps<TFieldValues, TName>, 'defaultValue'> &
  MuiSwitchProps &
  WithStyles<typeof styles, true> & {
    label?: string;
    labelOn?: string;
    labelOff?: string;
    titleWrap?: boolean;
    defaultValue?: boolean;
  };

function StyledSwitch<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: SwitchProps<TFieldValues, TName>) {
  const { t } = useTranslation();
  const {
    defaultValue,
    name,
    control,
    shouldUnregister,
    rules,
    classes,
    label,
    labelOn = t('Yes'),
    labelOff = t('No'),
    color = 'primary',
    titleWrap = true,
    ...rest
  } = props;

  const {
    field: { ref, value = defaultValue, ...inputProps },
  } = useController<TFieldValues, TName>({
    control,
    name,
    shouldUnregister,
    rules,
  });

  const noWrapClass = titleWrap ? '' : classes?.nowrap;
  const checked = value === true;

  return (
    <FormControl className={classes?.root} size="small">
      {label && <Box className={`${classes?.label} ${noWrapClass}`}>{label}</Box>}
      <Box>
        <FormControlLabel
          control={
            <MuiSwitch
              checked={checked}
              {...inputProps}
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
              <span className={classes?.val}>{checked ? labelOn : labelOff}</span>
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
}

export const Switch = withStyles(styles, { withTheme: true })(StyledSwitch) as <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: GenericWithStyles<SwitchProps<TFieldValues, TName>>
) => React.ReactElement;
