import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { PropsWithChildren } from 'react';
import { Button } from 'components';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.lightBlue.main,
      color: theme.palette.primary.main,
      boxShadow: 'none',
      '&:hover': {
        color: 'white',
        backgroundColor: theme.palette.greyBlue1.main,
        boxShadow: 'none',
      },
      '&:focus': {
        backgroundColor: theme.palette.greyBlue1.main,
        boxShadow: '0px 0px 10px rgba(0, 133, 255, 0.4)',
        color: 'white',
      },
      '&:pressed': {
        backgroundColor: theme.palette.blueGrey.main,
        boxShadow: 'none',
      },
    },
  })
);

export type AddButtonProps = {
  onClick: (...event: any[]) => void;
};

export const AddButton = (props: PropsWithChildren<AddButtonProps>) => {
  const classes = useStyles();
  const { onClick, children } = props;
  const { t } = useTranslation();

  return (
    <Button className={classes.root} variant="contained" onClick={onClick}>
      {children !== undefined ? children : t('Add')}
    </Button>
  );
};
