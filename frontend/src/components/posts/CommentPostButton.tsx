import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { Post } from 'types/posts';
import { ROUTE_PATHS } from 'router/Config';
import { Link } from 'react-router-dom';
import { theme } from 'layouts/Theme';

export interface CommentPostProps {
  post: Post;
  successAction: (newPost: Post) => void;
  fullWidth?: boolean;
  disabled?: boolean;
}

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
    width: '100%',
  },
  disabledLink: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
    width: '100%',
    pointerEvents: 'none',
  },
}));

export const CommentPost: React.FC<CommentPostProps> = (
  props: CommentPostProps
) => {
  const classes = useStyles();

  return (
    <Link
      to={`${ROUTE_PATHS.post(props.post?.id)}#comment-section`}
      className={props.disabled ? classes.disabledLink : classes.link}
    >
      <Button fullWidth={props.fullWidth} disabled={props.disabled}>
        Comment
      </Button>
    </Link>
  );
};

CommentPost.defaultProps = {
  fullWidth: false,
  disabled: false,
};

export default CommentPost;
