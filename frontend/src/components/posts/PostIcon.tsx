import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core';
import {
  Chat,
  Favorite,
  LocalOffer,
  SupervisorAccount,
} from '@material-ui/icons';

export interface PostIconProps {
  type?: 'usertags' | 'hashtags' | 'reactions' | 'comments';
}

const useStyles = makeStyles(() =>
  createStyles({
    icon: {
      color: 'rgba(0, 0, 0, 0.54)',
    },
  })
);

export const PostIcon: React.FC<PostIconProps> = (props: PostIconProps) => {
  const classes = useStyles();

  const icons = {
    usertags: (
      <SupervisorAccount
        titleAccess="Usertags"
        aria-label={props.type}
        className={classes.icon}
      />
    ),
    hashtags: (
      <LocalOffer
        titleAccess="Hashtags"
        aria-label={props.type}
        className={classes.icon}
      />
    ),
    reactions: (
      <Favorite
        titleAccess="Reactions"
        aria-label={props.type}
        className={classes.icon}
      />
    ),
    comments: (
      <Chat
        titleAccess="Comments"
        aria-label={props.type}
        className={classes.icon}
      />
    ),
  };

  return icons[props.type];
};

export default PostIcon;
