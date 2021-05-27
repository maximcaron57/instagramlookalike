import React, { FunctionComponent } from 'react';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  defaultSize: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
  smallSize: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

export interface UserAvatarProps {
  src?: string | null;
  size?: string | null;
  username: string;
}

export const UserAvatar: FunctionComponent<UserAvatarProps> = (
  props: UserAvatarProps
) => {
  const classes = useStyles();
  const { src, username, size } = props;

  return src ? (
    <div>
      <Avatar className={size || classes.defaultSize} src={src} />
    </div>
  ) : (
    <div>
      <Avatar className={size || classes.defaultSize}>
        {username?.charAt(0)}
      </Avatar>
    </div>
  );
};

UserAvatar.defaultProps = {
  src: null,
  size: null,
};
