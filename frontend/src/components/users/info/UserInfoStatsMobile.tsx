import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

export interface UserInfoStatsMobileProps {
  totalPost: number;
}

const useStyles = makeStyles(() => ({
  mobileStats: {
    height: '3em',
    alignItems: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
}));

export function UserInfoStatsMobile(props: UserInfoStatsMobileProps) {
  const classes = useStyles();

  const { totalPost } = props;

  return (
    <Box
      display="flex"
      justifyContent="space-around"
      className={classes.mobileStats}
    >
      <Box id="userInfoStatsPosts">
        <div className={classes.textCenter}>
          <b>{totalPost}</b>
        </div>
        <div>post{totalPost > 0 && <span>s</span>}</div>
      </Box>
    </Box>
  );
}
