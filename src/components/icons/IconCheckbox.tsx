import { SvgIcon } from '@material-ui/core';
import { palette } from 'theme';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { IconColors } from './types';

export type IconCheckboxProps = IconColors & {
  checked: boolean;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginLeft: theme.spacing(0.6),
      marginTop: theme.spacing(0.6),
    },
  })
);

export const IconCheckbox = (props: IconCheckboxProps) => {
  const { stroke = palette.secondary.dark, fill = 'white', checked } = props;
  const classes = useStyles();

  return checked ? (
    <SvgIcon className={classes.root}>
      <rect x="0.5" y="0.5" width="17" height="17" fill={fill} stroke={stroke} />
      <path
        d="M15.795 4.21937C15.5216 3.92688 15.0784 3.92688 14.805 4.21937L6.41859 13.1921L3.19499 9.74316C2.92163 9.45067 2.47845 9.4507 2.20504 9.74316C1.93165 10.0356 1.93165 10.5098 2.20504 10.8023L5.92362 14.7807C6.19689 15.0732 6.64041 15.073 6.91357 14.7807L11.3543 10.0296L15.795 5.27852C16.0684 4.98606 16.0683 4.51186 15.795 4.21937Z"
        fill="#0099FF"
      />
    </SvgIcon>
  ) : (
    <SvgIcon className={classes.root}>
      <rect x="0.5" y="0.5" width="17" height="17" stroke={stroke} fill={fill} />
    </SvgIcon>
  );
};
