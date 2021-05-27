import React from 'react';
import { UserComment } from 'types/posts';
import {
  ListItemAvatar,
  ListItemText,
  ListItem,
  makeStyles,
  createStyles,
} from '@material-ui/core';
import { UserAvatar } from 'components/users/avatar/UserAvatar';
import { ROUTE_PATHS } from 'router/Config';
import { Link } from 'react-router-dom';

export interface CommentProps {
  comment: UserComment;
}

const useStyles = makeStyles(() =>
  createStyles({
    commentPrimaryText: {
      wordBreak: 'break-word',
    },
    userLink: {
      textDecoration: 'none',
      color: 'inherit',
    },
  })
);

export const Comment: React.FC<CommentProps> = (props: CommentProps) => {
  const { comment } = props;
  const classes = useStyles();

  return (
    <ListItem>
      <ListItemAvatar>
        <Link to={ROUTE_PATHS.user(comment?.user)}>
          <UserAvatar
            username={comment.user}
            src={comment.userAvatar}
            size="smallSize"
          />
        </Link>
      </ListItemAvatar>
      <ListItemText
        className={classes.commentPrimaryText}
        primary={comment.text}
        secondary={
          <Link
            to={ROUTE_PATHS.user(comment?.user)}
            className={classes.userLink}
          >
            {comment.user},&nbsp;on&nbsp;
            {new Date(comment?.createdAt).toLocaleDateString([], {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              second: 'numeric',
            })}
          </Link>
        }
      />
    </ListItem>
  );
};

export default Comment;
