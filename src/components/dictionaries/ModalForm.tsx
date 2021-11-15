import { PropsWithChildren, useCallback, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Backdrop, Box, Fade, IconButton, Modal } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addButton: {
      backgroundColor: theme.palette.lightBlue.main,
      color: theme.palette.primary.main,
      boxShadow: 'none',
      '&:hover': {
        color: theme.palette.common.white,
      },
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      width: 500,
      //height: 470,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(5, 6.25),
      position: 'relative',
      boxSizing: 'border-box',
    },
    closeButtonWrapper: {
      position: 'absolute',
      width: '100%',
      left: 0,
      top: 0,
    },
    closeButton: {
      marginRight: theme.spacing(1),
      marginTop: theme.spacing(1),
      '& img': {
        maxWidth: '10px',
      },
    },
  })
);

export const useModalForm = () => {
  const [open, setOpen] = useState<boolean>(false);

  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  return {
    onOpen,
    onClose,
    open,
  };
};

export type ModalFormProps = {
  open?: boolean;
  onClose?: (...event: any[]) => void;
};

export const ModalForm = (props: PropsWithChildren<ModalFormProps>) => {
  const classes = useStyles();
  const { open = false, onClose, children } = props;

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <Box display="flex" justifyContent="flex-end" className={classes.closeButtonWrapper}>
            <IconButton className={classes.closeButton} onClick={onClose}>
              <img src="/img/icons/close-icon.svg" alt="" />
            </IconButton>
          </Box>
          {children}
        </div>
      </Fade>
    </Modal>
  );
};
