import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { UserAvatar } from 'components/users/avatar/UserAvatar';
import { UserInfoHeader } from 'components/users/info/UserInfoHeader';
import { UserInfoDescription } from 'components/users/info/UserInfoDescription';
import { UserInfoStats } from 'components/users/info/UserInfoStats';

interface UserStats {
  totalPost: number;
}

export interface UserHeaderMobileProps {
  username: string;
  stats: UserStats;
  fullname: string;
  description?: string | null;
  avatarSrc?: string | null;
  createdAt: Date;
}

UserHeaderMobile.defaultProps = {
  description: null,
  avatarSrc: null,
};

const useStyles = makeStyles((theme) => ({
  avatarSize: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  flexColumnDirectionBox: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

export function UserHeaderMobile(props: UserHeaderMobileProps) {
  const classes = useStyles();
  const {
    username,
    stats,
    fullname,
    description,
    avatarSrc,
    createdAt,
  } = props;

  return (
    <Box>
      <Box className={classes.flexColumnDirectionBox}>
        <Box mb={2} mx="auto">
          <Box mr={2} px={2} display="flex">
            <UserAvatar
              username={username}
              size={classes.avatarSize}
              src={avatarSrc}
            />
          </Box>
        </Box>
        <Box mx="auto" className={classes.flexColumnDirectionBox}>
          <Box mx="auto">
            <UserInfoHeader username={username} />
          </Box>
          <Box mx="auto">
            <UserInfoDescription
              fullname={fullname}
              description={description}
            />
          </Box>
          <Box pt={1} mx="auto">
            <i>
              Joined on {createdAt.getDate().toString()}/
              {createdAt.getMonth().toString()}/
              {createdAt.getFullYear().toString()}
            </i>
          </Box>
        </Box>
      </Box>
      <UserInfoStats stats={stats} />
    </Box>
  );
}
