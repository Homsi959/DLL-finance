import sprite from '../../img/svg-sprite.svg';
import { makeStyles } from '@material-ui/core/styles';

type IconSpriteProps = {
  icon: string;
  width?: string;
  height?: string;
  color?: string;
  hoverColor?: string;
};

const useStyles = makeStyles({
  root: {
    width: (props: IconSpriteProps) => props.width,
    height: (props: IconSpriteProps) => props.height || props.width,
    fill: (props: IconSpriteProps) => props.color,
    '&:hover': {
      fill: (props: IconSpriteProps) => props.hoverColor,
    },
  },
});

export const IconSprite = (props: IconSpriteProps) => {
  const classes = useStyles(props);
  const { icon } = props;

  return (
    <svg className={classes.root}>
      <use xlinkHref={sprite + '#' + icon} />
    </svg>
  );
};
