import { IconColors } from './types';
import { makeStyles, Theme, createStyles } from '@material-ui/core';

type IconColorsProps = {
  colors: IconColors;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginRight: theme.spacing(2),
      minWidth: '11px',
      maxWidth: '11px',
    },
  })
);

export const IconArrowLight = (props: IconColorsProps) => {
  const { colors } = props;
  const { fill } = colors;
  const classes = useStyles();

  return (
    <svg
      className={classes.root}
      width="11"
      height="6"
      viewBox="0 0 11 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.89259 5.8407L10.8376 0.940251C11.0541 0.725223 11.0541 0.376843 10.8376 0.161271C10.6211 -0.0537571 10.2694 -0.0537571 10.0529 0.161271L5.50027 4.67302L0.947613 0.161814C0.731104 -0.053214 0.379437 -0.053214 0.162381 0.161814C-0.0541267 0.376843 -0.0541267 0.725766 0.162381 0.940794L5.10741 5.84124C5.32168 6.05301 5.67887 6.05301 5.89259 5.8407Z"
        fill={fill}
      />
    </svg>
  );
};
