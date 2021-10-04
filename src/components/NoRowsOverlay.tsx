import { GridOverlay } from '@material-ui/data-grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  return (
    <GridOverlay className={classes.root}>
      <div className={classes.label}>{t('SearchNotFound')}</div>
    </GridOverlay>
  );
};
