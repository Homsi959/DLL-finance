import {
  Box,
  createStyles,
  Drawer,
  DrawerProps,
  IconButton,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { FC, useCallback, useEffect, useState } from 'react';
import { useGoBack } from '../../hooks';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: 400,
    },
    closeButtonWrapper: {
      position: 'absolute',
      width: '100%',
    },
    closeButton: {
      marginRight: theme.spacing(2),
      marginTop: theme.spacing(2),
      '& img': {
        maxWidth: '10px',
      },
    },
  })
);

export const Sidebar: FC<{ url?: string } & DrawerProps> = ({ children, url, ...props }) => {
  const classes = useStyles();
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);
  const goBack = useGoBack();

  useEffect(() => {
    setDrawerOpen(true);
  }, [setDrawerOpen]);

  const handleOnClose = useCallback(() => {
    setDrawerOpen(false);
    setTimeout(() => goBack(url), 500);
  }, [goBack, setDrawerOpen, url]);

  return (
    <Drawer
      anchor="right"
      open={isDrawerOpen}
      classes={{
        paper: classes.paper,
      }}
      onClose={handleOnClose}
      transitionDuration={500}
      {...props}
    >
      <Box display="flex" justifyContent="flex-end" className={classes.closeButtonWrapper}>
        <IconButton className={classes.closeButton} onClick={handleOnClose}>
          <img src="/img/icons/close-icon.svg" alt="" />
        </IconButton>
      </Box>
      {children}
    </Drawer>
  );
};
