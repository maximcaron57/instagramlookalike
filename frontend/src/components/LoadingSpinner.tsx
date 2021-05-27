import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    margin: 'auto',
    position: 'absolute',
    top: '0',
    left: '0',
    bottom: '0',
    right: '0',
  },
});

interface LoadingSpinnerProps {
  absolute?: boolean;
  size?: number;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = (
  props: LoadingSpinnerProps
) => {
  const classes = useStyles();
  const { absolute, size } = props;

  return (
    <CircularProgress
      className={absolute ? classes.root : undefined}
      size={size}
    />
  );
};

LoadingSpinner.defaultProps = {
  absolute: false,
  size: undefined,
};

export default LoadingSpinner;
