import { createStyles, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { Reaction, UserComment } from 'types/posts';
import PostIcon from './PostIcon';

export interface PostItemCounterProps {
  items?: string[] | Reaction[] | UserComment[];
  type: 'usertags' | 'hashtags' | 'reactions' | 'comments';
}

const useStyles = makeStyles(() =>
  createStyles({
    icon: {
      color: 'rgba(0, 0, 0, 0.54)',
    },
    countText: {
      color: '#9c27b0',
    },
  })
);

export const PostItemCounter: React.FC<PostItemCounterProps> = (
  props: PostItemCounterProps
) => {
  const classes = useStyles();

  return (
    <>
      <PostIcon type={props.type} />
      <Typography variant="body2" className={classes.countText}>
        {props.items?.length || '0'}
      </Typography>
    </>
  );
};

export default PostItemCounter;
