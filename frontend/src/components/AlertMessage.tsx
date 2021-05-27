import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Box } from '@material-ui/core';

export interface AlertMessageProps {
  severity: 'success' | 'info' | 'warning' | 'error';
  title: string;
  description?: string;
}

export const AlertMessage: React.FC<AlertMessageProps> = (
  props: AlertMessageProps
) => {
  const { severity, title, description } = props;

  return (
    <Box width={1}>
      <Alert severity={severity}>
        <AlertTitle>{title}</AlertTitle>
        {description}
      </Alert>
    </Box>
  );
};

export default AlertMessage;
