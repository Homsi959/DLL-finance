import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { white } from 'theme/palette';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: '#E9F1FE',
      color: theme.palette.primary.main,
      boxShadow: 'none',
      '&:hover': {
        color: white,
      },
    },
  })
);

type ButtonCustomVariantProps = {
  children: string;
  component?: any;
  //TODO component НЕ ДОЛЖЕН ИМЕТЬ ТИП any
  to?: string;
};

export const ButtonCustomVariant = (props: ButtonCustomVariantProps) => {
  const { children, component, to: toRoute } = props;
  const classes = useStyles();

  return (
    <Button
      className={classes.root}
      color="primary"
      variant="contained"
      component={component}
      to={toRoute}
    >
      {children}
    </Button>
  );
};
