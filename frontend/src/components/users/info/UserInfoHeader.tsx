import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(() => ({
  headerFontSize: {
    fontSize: '200%',
  },
}));

export interface UserInfoHeaderProps {
  username: string;
}

export function UserInfoHeader(props: UserInfoHeaderProps) {
  const classes = useStyles();
  const { username } = props;

  return (
    <Box mb={2} className={classes.headerFontSize} id="UserInfoHeaderUsername">
      <span>{username}</span>
    </Box>
  );
}
