import React from 'react';
import Box from '@material-ui/core/Box';
import { UserAvatar } from 'components/users/avatar/UserAvatar';
import { UserInfoHeader } from 'components/users/info/UserInfoHeader';
import { UserInfoDescription } from 'components/users/info/UserInfoDescription';
import { UserInfoStats } from 'components/users/info/UserInfoStats';

interface UserStats {
  totalPost: number;
}

export interface UserHeaderDesktopProps {
  username: string;
  stats: UserStats;
  fullname: string;
  description?: string | null;
  avatarSize: string;
  avatarHorizantalPadding: number;
  avatarSrc?: string | null;
  createdAt: Date;
}

UserHeaderDesktop.defaultProps = {
  description: null,
  avatarSrc: null,
};

export function UserHeaderDesktop(props: UserHeaderDesktopProps) {
  const {
    username,
    stats,
    fullname,
    description,
    avatarSize,
    avatarHorizantalPadding,
    avatarSrc,
    createdAt,
  } = props;

  return (
    <Box display="flex">
      <Box mr={2} px={avatarHorizantalPadding} my="auto">
        <UserAvatar src={avatarSrc} username={username} size={avatarSize} />
      </Box>
      <Box>
        <UserInfoHeader username={username} />
        <UserInfoStats stats={stats} />
        <UserInfoDescription fullname={fullname} description={description} />
        <Box paddingTop={1}>
          <i>
            Joined on {createdAt.getDate().toString()}/
            {createdAt.getMonth().toString()}/
            {createdAt.getFullYear().toString()}
          </i>
        </Box>
      </Box>
    </Box>
  );
}
