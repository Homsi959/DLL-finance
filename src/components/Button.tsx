import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@material-ui/core';
import { Link as MuiLink } from 'react-router-dom';
import palette, { white } from 'theme/palette';
import clsx from 'clsx';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      fontWeight: 600,
      fontSize: '12px',
      lineHeight: 1.1,
      textTransform: 'inherit',
      padding: '9px 30px',
      minWidth: 'max-content',
    },
    contained: {
      borderRadius: '5px',
      border: 'none',
      opacity: 0.8,
      boxShadow: `0 5px 10px 0  ${palette.info.light}`,
      color: white,
      backgroundColor: palette.dllBlue.main,
      '&:hover': {
        backgroundColor: palette.blue2.main,
        color: white,
        boxShadow: 'none',
      },
      '&:active:hover': {
        backgroundColor: palette.blue1.main,
        color: white,
      },
      '&.Mui-disabled': {
        backgroundColor: palette.secondary.dark,
        color: white,
      },
    },
    contained2: {
      boxShadow: 'none',
      color: palette.dllBlue.main,
      backgroundColor: palette.lightBlue.main,
      '&:hover': {
        backgroundColor: palette.greyBlue1.main,
        color: white,
      },
      '&:active:hover': {
        backgroundColor: palette.blueGrey.main,
        color: palette.dllBlue.main,
      },
      '&.Mui-disabled': {
        backgroundColor: palette.secondary.dark,
        color: white,
      },
    },
    outlined: {
      boxShadow: 'none',
      padding: '7px 30px',
      color: palette.dllBlue.main,
      border: `2px solid ${palette.dllBlue.main}`,
      '&:hover': {
        backgroundColor: palette.lightBlue.main,
        border: `2px solid ${palette.dllBlue.main}`,
        boxShadow: 'none',
      },
      '&:active:hover': {
        color: palette.blue1.main,
        backgroundColor: 'transparent',
        border: `2px solid ${palette.blue1.main}`,
        boxShadow: 'none',
      },
    },
    outlined2: {
      color: palette.dllBlue.main,
      backgroundColor: 'transparent',
      boxShadow: `3px 3px 5px 0px ${palette.grey5.main}`,
      border: `1px solid ${palette.blueGrey.main}`,
      '&:hover': {
        backgroundColor: palette.lightBlue.main,
        border: `1px solid ${palette.dllBlue.main}`,
        boxShadow: 'none',
      },
      '&:active:hover': {
        color: palette.blue1.main,
        backgroundColor: 'transparent',
        border: `1px solid ${palette.blue1.main}`,
        boxShadow: 'none',
      },
    },
    text: {
      color: palette.textGrey2.main,
      padding: 0,
      fontWeight: 400,
      textDecoration: 'underline',
      '&:hover': {
        color: palette.blue3.main,
        textDecoration: 'underline',
      },
      '&:focus': {
        color: palette.blue3.main,
        textDecoration: 'none',
      },
    },
    iconButton: {
      padding: '7px',
      boxShadow: 'none',
      backgroundColor: 'transparent',
      border: `1px solid ${palette.blueGrey.main}`,
      '&:hover': {
        backgroundColor: palette.lightBlue.main,
        '& svg': {
          fill: palette.dllBlue.main,
        },
      },
      '&:active:hover': {
        backgroundColor: palette.dllBlue.main,
        border: `1px solid ${palette.dllBlue.main}`,
        boxShadow: 'none',
        '& svg': {
          fill: white,
        },
      },
    },
    disabled: {
      boxShadow: 'none',
      borderColor: palette.grey3.main,
      textDecoration: 'none',
      '& svg': {
        fill: palette.grey3.main,
      },
    },
    label: {
      minWidth: 'max-content',
    },
    startIcon: {
      margin: 0,
    },
    endIcon: {
      margin: 0,
    },
  })
);

type UseStylesReturn = Omit<
  ReturnType<typeof useStyles>,
  'root' | 'startIcon' | 'endIcon' | 'label' | 'disabled'
>;

type ButtonNoIconVariant = keyof Omit<UseStylesReturn, 'iconButton'>;

type ButtonIconProps = Pick<MuiButtonProps, 'endIcon' | 'startIcon'> & {
  variant: 'iconButton';
};

type ButtonNoIconProps = {
  variant: ButtonNoIconVariant;
  startIcon?: never;
  endIcon?: never;
};

type ButtonVariantProps = ButtonIconProps | ButtonNoIconProps;

type ButtonProps = Omit<MuiButtonProps, 'variant' | 'component'> &
  ButtonVariantProps & {
    to?: string;
  };

export const Button = (props: ButtonProps) => {
  const { children, to, variant = 'text', className, ...rest } = props;
  const classes = useStyles();

  return (
    <MuiButton
      to={to}
      component={to ? (MuiLink as any) : undefined}
      className={clsx(classes?.[variant], className)}
      classes={{
        root: classes.root,
        startIcon: classes.startIcon,
        endIcon: classes.endIcon,
        label: classes.label,
        disabled: classes.disabled,
      }}
      {...rest}
    >
      {children}
    </MuiButton>
  );
};
