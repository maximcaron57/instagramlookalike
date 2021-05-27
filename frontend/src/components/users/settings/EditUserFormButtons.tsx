import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';

interface EditUserFormButtonsProps {
  disableSend: boolean;
  delete: () => void;
}

const useStyles = makeStyles(() => ({
  rightButton: {
    color: 'red',
    borderColor: 'red',
    '&:hover': {
      borderColor: 'red',
    },
  },
}));

export function EditUserFormButtons(props: EditUserFormButtonsProps) {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  return (
    <Box display={isMobile ? 'grid' : 'flex'}>
      <Box mb={isMobile ? 2 : 0}>
        <Button
          fullWidth={isMobile}
          disabled={props.disableSend}
          variant="contained"
          color="primary"
          type="submit"
        >
          Send
        </Button>
      </Box>
      <Box ml={isMobile ? 0 : 3.5}>
        <Button
          fullWidth={isMobile}
          variant="outlined"
          color="primary"
          onClick={props.delete}
          className={classes.rightButton}
        >
          Delete your account
        </Button>
      </Box>
    </Box>
  );
}
