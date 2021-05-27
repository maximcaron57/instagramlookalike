import React from 'react';
import { Card, makeStyles } from '@material-ui/core';
import CommentList from 'components/posts/CommentList';
import CommentForm from 'components/posts/CommentForm';
import { Post } from 'types/posts';

interface CommentSectionProps {
  post: Post | undefined;
  successAction: () => void;
}

const useStyles = makeStyles(() => ({
  card: {
    padding: '10px',
  },
}));

export const CommentSection: React.FC<CommentSectionProps> = (
  props: CommentSectionProps
) => {
  const classes = useStyles();

  return (
    <Card className={classes.card} id="comment-section">
      <CommentForm post={props.post} successAction={props.successAction} />
      <CommentList post={props.post} />
    </Card>
  );
};

export default CommentSection;
