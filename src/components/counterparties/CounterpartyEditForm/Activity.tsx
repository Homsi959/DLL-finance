import { Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    subtitle: {
      fontSize: '9px',
      color: theme.palette.textGrey2.main,
      marginTop: 12,
      marginBottom: 4,
    },
  })
);

export const Activity = (props: any) => {
  const classes = useStyles();
  const { title, code, text } = props;
  return (
    <div>
      <Typography className={classes.subtitle}>{title}</Typography>
      <Typography>
        {code} - {text}
      </Typography>
    </div>
  );
};
