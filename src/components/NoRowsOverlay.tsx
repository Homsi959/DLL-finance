import { GridOverlay } from '@material-ui/data-grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexDirection: 'column',
    },
    label: {
      marginTop: theme.spacing(1),
    },
  })
);

export const NoRowsOverlay = () => {
  const classes = useStyles();

  return (
    <GridOverlay className={classes.root}>
      <div className={classes.label}>По вашему запросу ничего не найдено</div>
    </GridOverlay>
  );
};
