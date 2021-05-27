import { makeStyles } from '@material-ui/styles';
import { createStyles, Theme } from '@material-ui/core/styles';
import { Box, Modal } from '@material-ui/core';
import React, { ReactElement, useState } from 'react';

const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    margin: 'auto',
    transform: `translate(-${top}%, -${left}%)`,
  };
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      textAlign: 'center',
      width: '70vw',
      [theme.breakpoints?.down('sm')]: {
        width: '90vw',
      },

      maxWidth: '1000px',
      backgroundColor: 'white',
      border: '2px solid #000',
      boxShadow: '5',
      padding: '2, 4, 3',
      margin: 'auto',
      overflow: 'auto',
    },
    modalTitle: {
      backgroundColor: '#9c27b0',
      color: '#fff',
      margin: '0 0 20px 0',
      padding: '10px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  })
);

interface ModalProps {
  children: ReactElement;
  openModal: boolean;
  closeModal: () => void;
  title: string;
}

export const ModalBox = (props: ModalProps) => {
  const { children, openModal, closeModal, title } = props;
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  return (
    <Modal open={openModal} onClose={() => closeModal()}>
      <Box
        style={modalStyle}
        className={classes.paper}
        margin="auto"
        width="100%"
      >
        <h2 className={classes.modalTitle}>{title}</h2>

        {children}
      </Box>
    </Modal>
  );
};
