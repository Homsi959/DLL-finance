import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import { FieldRenderProps } from 'react-final-form-hooks';
import { useCallback } from 'react';

export type ActionButtonProps = {
  action: 'increase' | 'decrease';
  onChange: FieldRenderProps<number | undefined>['input']['onChange'];
  value: number | undefined;
  disabled?: boolean;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '30px',
      width: '30px',
      userSelect: 'none',
    },
    icon: {
      height: '30px',
    },
  })
);

const getIconImageLink = (action: ActionButtonProps['action']) => {
  return action === 'increase'
    ? '/img/svg-sprite.svg#svg-icon-arrow-right'
    : '/img/svg-sprite.svg#svg-icon-arrow-left';
};

const treshold = 0.1;

export const ActionButton = (props: ActionButtonProps) => {
  const classes = useStyles();

  const { action, onChange, value, disabled = false } = props;

  const decrease = useCallback(() => {
    onChange(value && value >= treshold ? value - treshold : 0.0);
  }, [value, onChange]);

  const increase = useCallback(() => {
    onChange(value ? value + treshold : 1.0);
  }, [value, onChange]);

  const buttonPops = {
    onClick: !disabled ? (action === 'increase' ? increase : decrease) : undefined,
    disabled,
  };

  const iconImageLink = getIconImageLink(action);

  return (
    <IconButton className={classes.root} {...buttonPops}>
      <svg className={classes.icon}>
        <use xlinkHref={iconImageLink}></use>
      </svg>
    </IconButton>
  );
};
