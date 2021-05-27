import React, { useState } from 'react';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

export interface SnackbarMessageProps {
  severity: 'success' | 'info' | 'warning' | 'error';
  description: string;
  onClose?: () => void;
}

export const SnackbarMessage: React.FC<SnackbarMessageProps> = (
  props: SnackbarMessageProps
) => {
  const [open, setOpen] = useState<boolean>(true);
  const { severity, description } = props;

  const handleOnClose = () => {
    setOpen(false);
    if (props.onClose) {
      props.onClose();
    }
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleOnClose}>
      <Alert severity={severity}>{description}</Alert>
    </Snackbar>
  );
};

export default SnackbarMessage;
