import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Avatar as MuiAvatar } from '@material-ui/core';
import defaultAvatar from '../../img/noname.svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    medium: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
    large: {
      width: theme.spacing(12.5),
      height: theme.spacing(12.5),
    },
  })
);

type sizes = 'small' | 'medium' | 'large';

interface AvatarProps {
  size?: sizes;
  imageSrc?: string | undefined;
}

export const Avatar = ({ imageSrc = defaultAvatar, size = 'small' }: AvatarProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MuiAvatar src={imageSrc} className={classes[size]} />
    </div>
  );
};
