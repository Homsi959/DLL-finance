import { Typography, makeStyles, Theme, createStyles } from '@material-ui/core';

export interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

export const TabPanel = (props: TabPanelProps) => {
  const classes = useStyles();
  const { children, value, index, ...rest } = props;

  return (
    <Typography
      className={classes.root}
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...rest}
    >
      {children}
    </Typography>
  );
};
